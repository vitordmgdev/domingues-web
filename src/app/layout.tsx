import type { Metadata } from "next";
import { Domine, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const domine = Domine({
    variable: "--font-domine",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: {
        template: "%s | MD Móveis",
        default: "MD Móveis",
    },
    description:
        "Marcenaria com + de 17 anos de experiência atendendo com planejamento, design & história.",
    keywords: [
        "marcenaria em são francisco do sul",
        "marcenaria praia do ervino",
        "móveis sob medida em são francisco do sul",
        "marcenaria sob medida",
        "loja de móveis em são francisco do sul",
        "móveis planejados",
        "marcenaria santa catarina",
    ],
    openGraph: {
        title: "MD Móveis - Marcenaria e Loja de móveis",
        description:
            "Marcenaria com + de 17 anos de experiência atendendo com planejamento, design & história.",
        type: "website",
        locale: "pt-BR",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${domine.variable} antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
