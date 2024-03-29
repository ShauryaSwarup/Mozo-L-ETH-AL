"use client";
import { ProposalComp } from "@/components/ProposalsPage/ProposalComp";
import React from "react";
import data from "./data.json";

function page() {
	console.log(data);
	return (
		<div>
			{data.map((proposal) => (
				<div className="mb-4 shadow-2xl">
					<ProposalComp proposal={proposal} />
				</div>
			))}
		</div>
	);
}

export default page;
