import { LogoMarkSvg } from "@/components/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useSidebarStore } from "../../store/control-store";

export const Header = () => {
    const { sidebarIsOpen, setSidebarIsOpen } = useSidebarStore();

    return (
        <header className="w-fit p-2 border rounded-lg flex items-center gap-4">
            <SidebarTrigger
                className="bg-transparent"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            />

            <Link href="/">
                <LogoMarkSvg className="h-3" />
            </Link>
        </header>
    );
};
