"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";
import { LogoMarkSvg } from "./logo";

export function Header({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 1,
      }}
      animate={{
        y: isScrolled ? 8 : 0,
      }}
      className={cn(
        `flex items-center justify-center h-[72px] backdrop-blur-xl z-50 overflow-hidden w-full`,
        isScrolled
          ? "fixed top-0 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] bg-background/80 border rounded-md max-w-7xl"
          : "relative mx-auto w-full",
        className
      )}
    >

      {/* w-[calc(100%-1rem)] */}
      <div className={cn("flex justify-between max-w-7xl", isScrolled ? "w-full" : "w-[calc(100%-1rem)]")}>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LogoMarkSvg className="h-4 w-auto" />
          </Link>
        </div>

        {/* Mobile Logo via flex-1 to center or left align if needed, but here sticking to simple right alignment for toggle */}
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <div className="md:hidden">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <LogoMarkSvg className="h-4 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
