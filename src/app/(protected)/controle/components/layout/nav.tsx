"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function Nav({
    label,
    items,
}: {
    label: string;
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
        action?: {
            title: string;
            icon: LucideIcon;
            function?: () => void;
            element?: React.ReactNode;
        };
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const path = usePathname();

    return (
        <SidebarGroup className="py-0">
            <SidebarGroupLabel className="text-xs font-normal">
                {label}
            </SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={item.url === path}
                            >
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            {item.action?.function && (
                                <SidebarMenuAction
                                    onClick={item.action.function}
                                >
                                    <item.action.icon />
                                    <span className="sr-only">
                                        {item.action.title}
                                    </span>
                                </SidebarMenuAction>
                            )}

                            {item.action?.element}
                            
                            {item.items?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">
                                                Toggle
                                            </span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <a href={subItem.url}>
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
