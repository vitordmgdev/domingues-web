"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ControlSidebar } from "./components/layout/control-sidebar";
import { Toaster } from "@/components/ui/sonner";

const ControlLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/");
    }

    return (
        <ControlSidebar>
            <Toaster />
            {children}
        </ControlSidebar>
    );
};

export default ControlLayout;
