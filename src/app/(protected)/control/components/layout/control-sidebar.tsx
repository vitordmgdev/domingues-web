"use client";

import { AppSidebar } from "@/app/(protected)/control/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useSidebarStore } from "../../store/control-store";
import { AddClient } from "../add-client";
import { Header } from "./header";

export const ControlSidebar = ({ children }: { children: React.ReactNode }) => {
    const [clientFormIsOpen, setClientFormIsOpen] = useState(false);
    const { sidebarIsOpen, setSidebarIsOpen } = useSidebarStore();

    return (
        <SidebarProvider
            open={sidebarIsOpen && !clientFormIsOpen}
            onOpenChange={setSidebarIsOpen}
        >
            <AppSidebar
                clientFormIsOpen={clientFormIsOpen}
                setClientFormIsOpen={setClientFormIsOpen}
            />

            <AddClient
                open={clientFormIsOpen}
                onOpenChange={setClientFormIsOpen}
            />

            <SidebarInset className="p-2 max-w-6xl mx-auto gap-4">
                <Header />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};
