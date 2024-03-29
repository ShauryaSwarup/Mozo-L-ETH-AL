"use client";
import { Card, Avatar, Text, Group, Button } from "@mantine/core";
import classes from "./UserCardImage.module.css";
import { ProposalComp } from "@/components/ProposalsPage/ProposalComp";
const stats = [
	{ value: "3", label: "Projects" },
	{ value: "5", label: "Contributions" },
	{ value: "1.6ETH", label: "Incentives" },
];
const profiles = [
    {
        profileId: 1,
        walletId: "0x8Dc76B4a7bF0b9264aB10e614c787BeF",
        name: "Alice Smith",
        affiliation: "Tech Solutions Inc.",
        email: "alice.smith@example.com",
        university: "Stanford University",
        profession: "Software Engineer",
    },
    {
        profileId: 2,
        walletId: "0x1F55351C93bEcA72Ef73595114c3b3f0",
        name: "John Doe",
        affiliation: "Research Institute",
        email: "john.doe@example.com",
        university: "Massachusetts Institute of Technology (MIT)",
        profession: "Data Scientist",
    },
    {
        profileId: 3,
        walletId: "0x67292F8A2Bb3aE4245f906E2c065745D",
        name: "Emily Johnson",
        affiliation: "Healthcare Foundation",
        email: "emily.johnson@example.com",
        university: "Harvard University",
        profession: "Medical Doctor",
    },
    {
        profileId: 4,
        walletId: "0x9a2dC340DFE2e42060780e0dA58Bc482",
        name: "Michael Brown",
        affiliation: "Finance Corporation",
        email: "michael.brown@example.com",
        university: "University of California, Berkeley",
        profession: "Financial Analyst",
    },
];

import data from "./data.json";

function UserCardImage() {
	const items = stats.map((stat) => (
		<div key={stat.label}>
			<Text ta="center" fz="lg" fw={500}>
				{stat.value}
			</Text>
			<Text ta="center" fz="sm" c="dimmed" lh={1}>
				{stat.label}
			</Text>
		</div>
	));
	return (
		<>
			<Card
				withBorder
				padding="xl"
				shadow="xl"
				radius="md"
				className={classes.card}
			>
				<Card.Section
					h={140}
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
					}}
				/>
				<Avatar
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
					size={80}
					radius={80}
					mx="auto"
					mt={-30}
					className={classes.avatar}
				/>
				<Text ta="center" fz="lg" fw={500} mt="sm">
					Bill Headbanger
				</Text>
				<Text ta="center" fz="sm">
					Wallet address
				</Text>
				<Text ta="center" fz="sm" c="dimmed">
					Researcher, University of smth
				</Text>
				<Group mt="md" justify="center" gap={30}>
					{items}
				</Group>
			</Card>
			<p className=" text-center font-semibold text-3xl m-4">Their projects</p>
			<div className="m-4">
				{data.map((proposal) => (
					<div className="mb-4 shadow-2xl">
						<ProposalComp proposal={proposal} />
					</div>
				))}
			</div>
		</>
	);
}
export default UserCardImage;
