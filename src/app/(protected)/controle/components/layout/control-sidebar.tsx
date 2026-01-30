"use client";

import { AppSidebar } from "@/app/(protected)/controle/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./header";

export const ControlSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar collapsible="icon" />
            
            <SidebarInset>
                <div className="flex flex-col">
                    <Header />

                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
