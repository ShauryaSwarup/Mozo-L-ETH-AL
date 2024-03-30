"use client";
import React, { useState } from "react";
import {
    Container,
    Divider,
    Fieldset,
    FileInput,
    Text,
    TextInput,
    Textarea,
    Title,
    rem,
    Button,
} from "@mantine/core";
import { IconFileCv } from "@tabler/icons-react";
import RichTextEditorComp from "@/components/DataPage/RichTextEditor";
import classes from "./styles.module.css";
import {
    useAccount,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import HashAndError from "@/components/HashAndError";
import { parseUnits } from "viem";
import { RC } from "@/contracts/ResearcherContract";
import { uploadFile } from "@/functions/uploadFile";
import { polybase } from "@/data/polybase/polybase";
import useEthersSigner from "@/hooks/useEthersSigner";
import { channelgroupimg } from "@/public/community";
import polybaseSigner from "@/functions/polybaseSigner";
import { initUser } from "@/functions/initUser";

function Page() {
    const account = useAccount();
    if (account.connector)
        console.log(account.connector), polybaseSigner(account);
    const signer = useEthersSigner({ chainId: account.chainId });

    const [user, setUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [grant, setGrant] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [richTextContent, setRichTextContent] = useState(""); // State for RichTextEditor content

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleGrantChange = (event) => {
        setGrant(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        const _files = event.target.files;
        setFiles(_files);
    };

    const handleRichTextChange = (content) => {
        setRichTextContent(content);
    };

    const { data: hash, error, isPending, writeContract } = useWriteContract();

    const createGroup = async (user, groupName, groupDescription) => {
        if (!user || !user.chat) {
            const usr = await initUser(signer);
            if (usr) {
                if (!usr.readMode) {
                    setUser(usr);
                }
            }
        }

        const newGroup = await user.chat.group.create(groupName, {
            description: groupDescription,
            image: channelgroupimg,
            members: [],
            admins: [],
            private: false,
            rules: {
                entry: { conditions: [] },
                chat: { conditions: [] },
            },
        });
        console.log(newGroup);
        return newGroup;
    };

    async function submit(e) {
        e.preventDefault();
        try {
            setUploading(true);
            writeContract({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                abi: RC.abi,
                functionName: "addProposal",
                args: [
                    title,
                    description,
                    parseUnits(grant, 18),
                    account.address,
                ],
            });
            try {
                let cids = [];
                for (let i = 0; i < files.length; i++) {
                    try {
                        setUploading(true);
                        const newCid = await uploadFile(files[i]);
                        cids.push(newCid);
                        console.log(cids);
                    } catch (error) {
                        setUploading(false);
                        console.error(error);
                    }
                }
                console.log(cids);
                let chatId;
                try {
                    const group = await createGroup(user, title, description);
                    chatId = group.chatId;
                } catch (error) {
                    setUploading(false);
                    console.log("Error in creating Push Group", error);
                }
                try {
                    const proposalReference = polybase.collection("Proposal");
                    const timestamp = Date.now();
                    const dateString = new Date(timestamp).toString();
                    const recordData = await proposalReference.create([
                        dateString,
                        account.address,
                        title,
                        description,
                        chatId,
                        cids,
                    ]);
                    console.log(recordData);
                } catch (error) {
                    setUploading(false);
                    console.log("Error in creating Poly Record", error);
                }
                setUploading(false);
            } catch (error) {
                setUploading(false);
                console.error(error);
            }
        } catch (error) {
            setUploading(false);
            console.error(error);
        }
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    return (
        <div className=''>
            <div className={classes.inner}>
                {useAccount().isConnected && (
                    <form onSubmit={submit}>
                        <div className='m-4'>
                            {!user && (
                                <div className='flex items-center'>
                                    <button
                                        className='bg-pink-600 text-white px-4 py-2 rounded-md m-auto'
                                        size='lg'
                                        type='button'
                                        onClick={async () => {
                                            const user = await initUser(signer);
                                            if (user) {
                                                if (!user.readMode) {
                                                    setUser(user);
                                                }
                                            }
                                        }}
                                    >
                                        Initiate Push{" "}
                                    </button>
                                </div>
                            )}
                            <Title className={classes.title}>
                                Create your proposal
                            </Title>
                            <Container size={640}>
                                <Text size='lg' className={classes.description}>
                                    Type down or upload the file (make it more
                                    descriptive)
                                </Text>
                            </Container>
                        </div>
                        <div className='m-4'>
                            <Fieldset
                                legend='Proposal information'
                                variant='filled'
                                radius='lg'
                            >
                                <TextInput
                                    size='md'
                                    label='Title'
                                    withAsterisk
                                    description='Choose a relevant title'
                                    placeholder='Your Title'
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                                <Textarea
                                    resize='vertical'
                                    className='my-2'
                                    label='Description'
                                    size='md'
                                    withAsterisk
                                    description='Give a crisp description of your proposal'
                                    placeholder='Your description'
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                                <TextInput
                                    size='md'
                                    label='Grant'
                                    withAsterisk
                                    description='Choose the required grant'
                                    placeholder='Your requested grant (in ETH)'
                                    value={grant}
                                    onChange={handleGrantChange}
                                />
                            </Fieldset>
                        </div>
                        <div className='flex justify-center items-center'>
                            <div class='flex items-center justify-center w-full'>
                                <label
                                    for='dropzone-file'
                                    className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                                >
                                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                        <svg
                                            className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 20 16'
                                        >
                                            <path
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                            />
                                        </svg>
                                        <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                            <span className='font-semibold'>
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className='text-xs text-black'>
                                            {files.length > 0 && (
                                                <p className='text-white font-semibold text-xl'>
                                                    Selected {files.length} PDFs
                                                </p>
                                            )}
                                        </p>
                                    </div>
                                    <input
                                        id='dropzone-file'
                                        type='file'
                                        className='hidden'
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Divider
                                size='md'
                                label='Or draft a proposal'
                                labelPosition='center'
                                my='xl'
                                className='min-w-96'
                            />
                        </div>
                        <div>
                            <Container size={640}>
                                <Text size='sm' className={classes.title1}>
                                    Draft your proposal
                                </Text>
                            </Container>
                            <RichTextEditorComp
                                onContentChange={handleRichTextChange}
                            />{" "}
                            <div className=''>
                                <div className='min-w-96'></div>
                            </div>
                            <div className='flex justify-center mt-4 flex-col'>
                                <Button
                                    type='submit'
                                    variant='filled'
                                    color='gray'
                                    size='lg'
                                    disabled={uploading}
                                    radius='md'
                                >
                                    {uploading ? "Uploading..." : "Submit"}
                                </Button>
                                <HashAndError
                                    hash={hash}
                                    isConfirming={isConfirming}
                                    isConfirmed={isConfirmed}
                                    error={error}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Page;
