"use client";

import { useQuery } from "@tanstack/react-query";
import { listClientsAction } from "../actions/client-actions";
import { Skeleton } from "@/components/ui/skeleton";

const ClientsPage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            return await listClientsAction();
        },
    });

    if (isLoading) {
        return <Skeleton className="h-20" />
    }

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ClientsPage;
