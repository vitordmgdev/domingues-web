"use client";

import {
    ActivityIcon,
    Boxes,
    CalendarDaysIcon,
    Contrast,
    LayoutDashboardIcon,
    PlusIcon,
    SquareKanbanIcon,
    UsersIcon,
    ZapIcon,
} from "lucide-react";
import * as React from "react";

import { Nav } from "@/app/(protected)/controle/components/layout/nav";
import { NavSecondary } from "@/app/(protected)/controle/components/layout/nav-secondary";
import { NavUser } from "@/app/(protected)/controle/components/layout/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/utils/auth-client";
import { AddClient } from "../add-client";

const data = {
    navPlataforma: [
        {
            title: "Dashboard",
            url: "/controle",
            icon: LayoutDashboardIcon,
        }
    ],
    navCrm: [
        {
            title: "Leads",
            url: "/controle/leads",
            icon: ZapIcon,
        },
        {
            title: "Clientes",
            url: "/controle/clients",
            icon: UsersIcon,
            isActive: true,
            action: {
                title: "Adicionar cliente",
                icon: PlusIcon,
                element: (
                    <AddClient
                        children={
                            <SidebarMenuAction>
                                <PlusIcon />
                            </SidebarMenuAction>
                        }
                    />
                ),
            },
        },
        {
            title: "Pipeline",
            url: "/controle/pipeline",
            icon: SquareKanbanIcon,
        },
        {
            title: "Agenda",
            url: "/controle/schedule",
            icon: CalendarDaysIcon,
        },
        {
            title: "Atividades",
            url: "/controle/activities",
            icon: ActivityIcon,
        },
    ],
    navSecondary: [
        {
            title: "Alterar Tema",
            url: "#",
            icon: Contrast,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: session, isPending } = authClient.useSession();

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarContent>
                <Nav label="Plataforma" items={data.navPlataforma} />

                <Nav label="CRM" items={data.navCrm} />

                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                {isPending && <Skeleton className="h-12 w-full" />}

                {session && <NavUser user={session.user} />}
            </SidebarFooter>
        </Sidebar>
    );
}
