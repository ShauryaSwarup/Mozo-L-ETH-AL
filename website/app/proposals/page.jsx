"use client";
import { ProposalComp } from "@/components/ProposalsPage/ProposalComp";
import React from "react";
import data from "./data.json";

function page() {
	console.log(data);
	return (
		<div>
			<p className=" text-center font-bold text-3xl">Proposals</p>
			<div className="my-4">
				{data.map((proposal) => (
					<div className="mb-4 shadow-2xl">
						<ProposalComp proposal={proposal} />
					</div>
				))}
			</div>
		</div>
	);
}

export default page;
