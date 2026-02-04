"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getClientAction } from "../../actions/client-actions";
import {
    updateClientSchema,
    UpdateClientType,
} from "../../actions/client-schemas";

const ClientDetailsPage = () => {
    const { partyId } = useParams() as { partyId: string };

    const { data, isLoading, error } = useQuery({
        queryKey: ["clients", partyId],
        queryFn: async () => {
            return await getClientAction(partyId);
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<UpdateClientType>({
        resolver: zodResolver(updateClientSchema),
        disabled: !isEditing,
    });

    const router = useRouter();

    return (
        <div className="flex flex-col border rounded-lg bg-background overflow-hidden">
            <header className={`flex items-center justify-between gap-4 p-4`}>
                {isLoading && (
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-12 rounded-sm" />
                    </div>
                )}

                {data && (
                    <div className="flex items-center gap-4">
                        <Badge
                            variant="outline"
                            className={cn(
                                "capitalize font-medium h-6 gap-1.5 rounded-sm px-2 py-1",
                                clientStatusStylesMap[data.status].badge,
                            )}
                        >
                            <div
                                className={cn(
                                    "size-1 rounded-full shrink-0",
                                    clientStatusStylesMap[data.status].dot,
                                )}
                            />
                            {clientStatusLabelMap[data.status]}
                        </Badge>

                        <h1 className="text-lg font-sans">{data.fullName}</h1>
                    </div>
                )}

                <Button
                    type="button"
                    variant="ghost"
                    className="rounded-sm"
                    onClick={() => router.replace("/control/clients")}
                >
                    <ChevronLeftIcon className="size-4" />
                    Voltar
                </Button>
            </header>
        </div>
    );
};

export default ClientDetailsPage;
