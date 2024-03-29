"use client";
import React from "react";
import { Container, Grid, SimpleGrid, Skeleton, rem } from "@mantine/core";
import { ProposalComp } from "@/components/ProposalsPage/ProposalComp";
import data from "../data.json";

const PRIMARY_COL_HEIGHT = rem(300);

function page(params) {
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
	const proposal_id = params.params.proposal_id;
	const proposal = data.find((p) => p.proposal_id == proposal_id);
	console.log(proposal);
	return (
		<Container my="md">
			<SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
				<ProposalComp
					height={PRIMARY_COL_HEIGHT}
					radius="md"
					animate={false}
					proposal={proposal}
                    noSection={true}
				/>
				<Grid gutter="md">
					<Grid.Col>
						<Skeleton
							height={SECONDARY_COL_HEIGHT}
							radius="md"
							animate={false}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton
							height={SECONDARY_COL_HEIGHT}
							radius="md"
							animate={false}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton
							height={SECONDARY_COL_HEIGHT}
							radius="md"
							animate={false}
						/>
					</Grid.Col>
				</Grid>
			</SimpleGrid>
		</Container>
	);
}

export default page;
