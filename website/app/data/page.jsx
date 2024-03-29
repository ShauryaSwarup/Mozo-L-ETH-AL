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

function Page() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [picture, setPicture] = useState([]);
	const [richTextContent, setRichTextContent] = useState(""); // State for RichTextEditor content

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleFileChange = (event) => {
		const [file] = event.target.files;
		setPicture([...picture, file]);
	};

	const handleRichTextChange = (content) => {
		setRichTextContent(content);
	};

	const handleSubmit = () => {
		console.log("Title:", title);
		console.log("Description:", description);
		console.log("Picture:", picture);
		console.log("Rich Text Content:", richTextContent); // Logging rich text content
	};

	return (
		<div className="">
			<div className={classes.inner}>
				<div className="m-4">
					<Title className={classes.title}>Create your proposal</Title>
					<Container size={640}>
						<Text size="lg" className={classes.description}>
							Type down or upload the file (make it more descriptive)
						</Text>
					</Container>
				</div>
				<div className="m-4">
					<Fieldset legend="Proposal information" variant="filled" radius="lg">
						<TextInput
							size="md"
							label="Title"
							withAsterisk
							description="Choose a relevant title"
							placeholder="Your Title"
							value={title}
							onChange={handleTitleChange}
						/>
						<Textarea
							resize="vertical"
							className="my-2"
							label="Description"
							size="md"
							withAsterisk
							description="Give a crisp description of your proposal"
							placeholder="Your description"
							value={description}
							onChange={handleDescriptionChange}
						/>
					</Fieldset>
				</div>
				<div className="flex justify-center items-center">
					<div class="flex items-center justify-center w-full">
						<label
							for="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-xs text-black">
									{picture.map((pic) => (
										<p key={pic.name}>{pic.name}</p>
									))}
								</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								className="hidden"
								onChange={handleFileChange}
							/>
						</label>
					</div>
				</div>
				<div className="flex justify-center items-center">
					<Divider
						size="md"
						label="Or draft a proposal"
						labelPosition="center"
						my="xl"
						className="min-w-96"
					/>
				</div>
				<div>
					<Container size={640}>
						<Text size="sm" className={classes.title1}>
							Draft your proposal
						</Text>
					</Container>
					<RichTextEditorComp onContentChange={handleRichTextChange} />{" "}
					<div className="">
						<div className="min-w-96"></div>
					</div>
					<div className="flex justify-center mt-4">
						<Button
							onClick={handleSubmit}
							variant="filled"
							color="gray"
							size="lg"
							radius="md"
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
