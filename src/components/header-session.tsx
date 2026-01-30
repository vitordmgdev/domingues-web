"use client";

import { AuthDialog } from "@/app/(website)/components/auth-dialog";
import { authClient } from "@/utils/auth-client";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

export const HeaderSession = () => {
    const { data: session, isPending, refetch } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex items-center gap-4 mr-4">
                <Skeleton className="h-5 w-24 rounded-full" />

                <Skeleton className="h-8 aspect-square rounded-full" />
            </div>
        );
    }

    if (session) {
        return (
            <Popover>
                <PopoverTrigger className="flex items-center justify-between gap-4 h-full w-48 border-l cursor-pointer hover:bg-accent/20 px-6">
                    <span className="text-sm font-normal font-geist truncate">
                        {session.user.name}
                    </span>

                    <Avatar>
                        {session.user.image && (
                            <AvatarImage src={session.user.image} />
                        )}

                        <AvatarFallback>
                            {session.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>

                <PopoverContent
                    className="max-w-56 p-1"
                    align="end"
                    side="top"
                    sideOffset={8}
                >
                    <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={() =>
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        refetch();
                                    },
                                },
                            })
                        }
                    >
                        <LogOut className="size-4 text-destructive" />
                        Deslogar da conta
                    </Button>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <AuthDialog>
            <Button variant="ghost" className="mr-4">
                Entrar ou cadastrar
            </Button>
        </AuthDialog>
    );
};
