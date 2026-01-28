"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import * as React from "react";
import { LogoMarkSvg } from "./logo";

export function Header({ className }: { className?: string }) {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 72);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={cn(
                `flex items-center justify-center h-[72px] z-50 overflow-hidden w-full absolute`,
                className,
            )}
        >
            <div className={cn("flex justify-between w-[calc(100%-4rem)] max-w-5xl")}>
                <div className={`hidden md:flex items-center gap-4`}>
                    <Link href="/" className="flex items-center">
                        <LogoMarkSvg className="h-4 w-auto" />
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-between md:justify-end">
                    <div className="md:hidden">
                        <Link
                            href="/"
                            className="mr-6 flex items-center space-x-2"
                        >
                            <LogoMarkSvg className="h-4 w-auto" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="secondary">
                            Entrar ou cadastrar
                        </Button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
