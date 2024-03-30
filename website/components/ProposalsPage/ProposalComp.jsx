"use client";
import { IconHeart, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { Card, Text, Group, Button } from "@mantine/core";
import classes from "./BadgeCard.module.css";
import { AvatarComp } from "../Avatar/AvatarComp";
import { useRouter } from "next/navigation";
import {
	useAccount,
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { useState } from "react";
import HashAndError from "../HashAndError";
import { RC } from "@/contracts/ResearcherContract";

export function ProposalComp({ proposal, noSection }) {
	const {
		proposal_id,
		title,
		description,
		researcher_name,
		researcher,
		yay,
		nay,
	} = proposal;

	const address = useAccount();
	const [choice, setChoice] = useState();

	const yayN = Number(yay) / Number(Math.pow(10, 18));
	const nayN = Number(nay) / Number(Math.pow(10, 18));

	const router = useRouter();
	const handleClick = () => {
		router.push(`/proposals/${proposal_id}`);
	};

	//read researcher by address
	const {
		data: researcherData,
		errorRead,
		isPendingRead,
	} = useReadContract({
		account: address,
		address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		abi: RC.abi,
		functionName: "getResearcherByAddress",
		args: [researcher],
	});

	//write contract getResearcherByAddress

	const { data: hash, error, isPending, writeContract } = useWriteContract();
	function submit(e) {
		e.preventDefault();
		writeContract({
			address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
			abi: RC.abi,
			functionName: "vote",
			args: [proposal.proposalId, choice],
		});
	}
	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section className={classes.section} mt="md">
				<Group justify="apart">
					<Text fz="lg" fw={500}>
						{title}
					</Text>
				</Group>
				<Text fz="sm" mt="xs">
					{description}
				</Text>
			</Card.Section>

			<Card.Section className={classes.section}>
				{/* <Text mt="md" className={classes.label} c="dimmed">
					Perfect for you, if you enjoy
				</Text> */}
				<AvatarComp
					researcher_name={researcherData && researcherData.name}
					wallet_id={researcher}
				/>
			</Card.Section>
			<Group mt="xs">
				{!noSection && (
					<Button
						radius="md"
						color="gray"
						style={{ flex: 1 }}
						onClick={handleClick}
					>
						Show details
					</Button>
				)}
				<Button radius="md" color="gray" style={{ flex: 1 }}>
					Join discussion
				</Button>
				<Button onSubmit={submit} onClick={() => setChoice(1)}>
					<IconThumbUp />
					<Text className="px-1">{yayN.toString()}</Text>
				</Button>
				<Button onSubmit={submit} onClick={() => setChoice(0)}>
					<IconThumbDown />
					<Text className="px-1">{nayN.toString()}</Text>
				</Button>
			</Group>
			<HashAndError
				hash={hash}
				isConfirming={isConfirming}
				isConfirmed={isConfirmed}
				error={error}
			/>
			{/* <Badge size="sm" variant="light">
				{wallet_id}
			</Badge> */}
		</Card>
	);
}
