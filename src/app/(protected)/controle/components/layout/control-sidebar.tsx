"use client";

import { AppSidebar } from "@/app/(protected)/controle/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { AddClient } from "../add-client";
import { Header } from "./header";
import { useSidebarStore } from "../../store/control-store";

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

            <SidebarInset>
                <div className="flex flex-col">
                    <Header />

                    <div className="p-4">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
