import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Marcenaria em São Francisco do Sul | MD Móveis Sob Medida",
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
        <html lang="pt-BR">
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    disableTransitionOnChange
                    enableSystem
                >
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
