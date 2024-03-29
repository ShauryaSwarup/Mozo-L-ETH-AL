"use client";

import * as React from "react";
import {
	RainbowKitProvider,
	getDefaultWallets,
	getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
	argentWallet,
	trustWallet,
	ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
	arbitrum,
	base,
	mainnet,
	optimism,
	polygon,
	polygonMumbai,
	sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
	appName: "RainbowKit demo",
	projectId: "YOUR_PROJECT_ID",
	wallets: [
		...wallets,
		{
			groupName: "Other",
			wallets: [argentWallet, trustWallet, ledgerWallet],
		},
	],
	chains: [
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
			? [sepolia, polygonMumbai]
			: []),
	],
	ssr: true,
});

const queryClient = new QueryClient();

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export function Providers({ children }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme}>
					<RainbowKitProvider>{children}</RainbowKitProvider>
				</MantineProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
