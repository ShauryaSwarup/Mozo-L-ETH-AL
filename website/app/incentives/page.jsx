"use client";

import LeaderboardComp from "@/components/IncentivesPage/LeaderboardComp";
import { PersonalStatsComp } from "@/components/IncentivesPage/PersonalStatsComp";
import { Text } from "@mantine/core";
import React from "react";

function page() {
	return (
		<div>
			<p className=" text-center font-bold text-3xl">Your stats</p>
			<div className="m-4">
				<PersonalStatsComp />
			</div>
			<p className=" text-center font-bold text-3xl">Leaderboard</p>
			<div className="bg-white rounded-lg m-4">
				<LeaderboardComp />
			</div>
		</div>
	);
}

export default page;
