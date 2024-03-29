"use client";
import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
	IconBellRinging,
	IconFingerprint,
	IconKey,
	IconSettings,
	Icon2fa,
	IconDatabaseImport,
	IconReceipt2,
	IconSwitchHorizontal,
	IconLogout,
	IconUserCircle,
	IconMessage,
	IconLogin,
	IconUpload,
	IconFileLike,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./NavbarSimple.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
const data = [
	{ link: "/data", label: "Data & Collaboration", icon: IconUpload },
	{ link: "/proposals", label: "Proposals & Voting", icon: IconFileLike },
	// { link: "/treasury", label: "DAO Treasury", icon: IconFingerprint },
	{ link: "/incentives", label: "Reputation & Incentives", icon: IconReceipt2 },
	{
		link: "/communication",
		label: "Community & Communication",
		icon: IconMessage,
	},
	{ link: "/profile", label: "User Profile", icon: IconUserCircle },
	{ link: "/onboard", label: "Oboard as a Researcher", icon: IconLogin },
];
export function NavbarSimple() {
	const pathname = usePathname();

	const links = data.map((item) => (
		<Link
			href={item.link}
			className={classes.link}
			data-active={item.link === pathname || undefined}
			key={item.label}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Link>
	));
	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>
				{/* <Group className={classes.header} justify="space-between">
					<MantineLogo size={28} />
					<Code fw={700}>v3.1.2</Code>
				</Group> */}
				{links}
			</div>

			<div className={classes.footer}>
				<div className=" w-1">
					<ConnectButton chainStatus="icon" />
				</div>
			</div>
		</nav>
	);
}
