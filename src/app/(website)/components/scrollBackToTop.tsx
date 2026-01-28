import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ScrollBackToTop = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 72);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Button
            className={`fixed bottom-6 right-6 z-99 rounded-full opacity-0 transition-all ${isScrolled && "opacity-100"}`}
            size="icon-lg"
        >
            <Link href="#home">
                <ArrowUp className="size-4" />
            </Link>
        </Button>
    );
};
