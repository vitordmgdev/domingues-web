"use client";

import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function Header() {
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
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg font-bold tracking-tight">MD Móveis</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Sobre
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Projetos
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contato
            </a>
          </nav>
        </div>

        {/* Mobile Logo via flex-1 to center or left align if needed, but here sticking to simple right alignment for toggle */}
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <div className="md:hidden">
            <span className="font-bold">MD Móveis</span>
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
    </header>
  );
}
