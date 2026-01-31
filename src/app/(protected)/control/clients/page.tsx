"use client";

import { useQuery } from "@tanstack/react-query";
import { listClientsAction } from "../actions/client-actions";

const ClientsPage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            return await listClientsAction();
        },
    });

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ClientsPage;
