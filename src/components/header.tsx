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
                `flex items-center justify-center h-20 z-50 overflow-hidden w-full absolute`,
                className,
            )}
        >
            <div
                className={cn(
                    "flex justify-between w-[calc(100%-4rem)] max-w-5xl bg-popover backdrop-blur-md h-14 rounded-sm border overflow-hidden",
                )}
            >
                <div className={`hidden md:flex items-center gap-4 ml-4`}>
                    <Link href="/" className="flex items-center">
                        <LogoMarkSvg className="h-3 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <div className="md:hidden">
                        <Link
                            href="/"
                            className="mr-6 flex items-center space-x-2"
                        >
                            <LogoMarkSvg className="h-4 w-auto" />
                        </Link>
                    </div>

                    <HeaderSession />
                </div>
            </div>
        </motion.header>
    );
}
