"use client";

import { Nav } from "@/app/(protected)/control/components/layout/nav";
import { NavSecondary } from "@/app/(protected)/control/components/layout/nav-secondary";
import { NavUser } from "@/app/(protected)/control/components/layout/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/utils/auth-client";
import {
    ActivityIcon,
    Bot,
    CalendarDaysIcon,
    Contrast,
    LayoutDashboardIcon,
    PlusIcon,
    SquareKanbanIcon,
    UsersIcon,
    UsersRound,
    ZapIcon,
} from "lucide-react";

export function AppSidebar({
    clientFormIsOpen,
    setClientFormIsOpen,
    ...props
}: {
    clientFormIsOpen: boolean;
    setClientFormIsOpen: (open: boolean) => void;
    props?: React.ComponentProps<typeof Sidebar>;
}) {
    const data = {
        navPlataforma: [
            {
                title: "Dashboard",
                url: "/control",
                icon: LayoutDashboardIcon,
            },
            {
                title: "Times",
                url: "/control/teams",
                icon: UsersRound,
            },
            {
                title: "Chat IA",
                url: "/control/ia",
                icon: Bot,
            }
        ],
        navCrm: [
            {
                title: "Leads",
                url: "/control/leads",
                icon: ZapIcon,
            },
            {
                title: "Clientes",
                url: "/control/clients",
                icon: UsersIcon,
                action: {
                    title: "Adicionar cliente",
                    icon: PlusIcon,
                    function: () => setClientFormIsOpen(true),
                },
            },
            {
                title: "Pipeline",
                url: "/control/pipeline",
                icon: SquareKanbanIcon,
            },
            {
                title: "Agenda",
                url: "/control/schedule",
                icon: CalendarDaysIcon,
            },
            {
                title: "Atividades",
                url: "/control/activities",
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

    const { data: session, isPending } = authClient.useSession();

    return (
        <Sidebar variant="floating" collapsible="icon" {...props}>
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
