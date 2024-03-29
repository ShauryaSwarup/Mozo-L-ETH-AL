"use client";
import { Card, Avatar, Text, Group, Button } from "@mantine/core";
import classes from "../UserCardImage.module.css";
import { ProposalComp } from "@/components/ProposalsPage/ProposalComp";
const stats = [
	{ value: "3", label: "Projects" },
	{ value: "5", label: "Contributions" },
	{ value: "1.6ETH", label: "Incentives" },
];

import data from "../data.json";
import profiles from "../profiles";

function UserCardImage(params) {
	const walletId = params.params.walletId;
	const findProfileByWalletId = (id) => {
		return profiles.find((profile) => profile.walletId === id);
	};
	const profile = findProfileByWalletId(walletId);

	console.log(walletId, profile);

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
					{profile && profile.name}
				</Text>
				<Text ta="center" fz="sm">
					{profile && profile.walletId}
				</Text>
				<Text ta="center" fz="sm" c="dimmed">
					{profile && profile.profession}, {profile && profile.university}
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
