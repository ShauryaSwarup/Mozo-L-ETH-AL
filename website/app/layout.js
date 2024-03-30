import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import AppShellComp from "@/components/AppShellComp";
import { PolybaseParent } from "./polybaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={inter.className}>
                <PolybaseParent style={{ flex: 1 }}>
                    <Providers>
                        <AppShellComp children={children} />
                    </Providers>
                </PolybaseParent>
            </body>
        </html>
    );
}
