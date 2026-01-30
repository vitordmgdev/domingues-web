import { LogoMarkSvg } from "@/components/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="sidebar mt-2 p-3 bg-sidebar w-fit border rounded-lg flex items-center gap-4">
            <SidebarTrigger />

            <Link href="/">
                <LogoMarkSvg className="h-3" />
            </Link>
        </header>
    );
};
