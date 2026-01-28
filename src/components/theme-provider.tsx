"use client";

import { Moon, Sun } from "lucide-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { Button } from "./ui/button";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const ThemeTrigger = () => {
    const [theme, setTheme] = React.useState("light");

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
        >
            <Sun 
                className="h-5 w-5 rotate-0 scwale-100 transition-all dark:-rotate-90 dark:scale-0" 
            />
            <Moon 
                className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
            />
            
            <span className="sr-only">Alternar tema</span>
        </Button>
    );
};
