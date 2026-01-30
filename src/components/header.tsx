"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderSession } from "./header-session";
import { LogoMarkSvg } from "./logo";

export function Header({ className }: { className?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 72);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={cn(
                `flex items-end justify-center z-100 overflow-hidden w-full h-16 absolute`,
                className,
            )}
        >
            <div
                className={cn(
                    "flex justify-between items-center pl-4 w-[calc(100%-4rem)] max-w-7xl bg-background h-full rounded-b-sm border-x border-b overflow-hidden",
                )}
            >
                <div className={`hidden md:flex items-center gap-4`}>
                    <Link href="/" className="flex items-center">
                        <LogoMarkSvg className="h-3 w-auto" />
                    </Link>
                </div>

                <HeaderSession />
            </div>
        </motion.header>
    );
}
