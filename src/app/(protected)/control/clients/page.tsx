"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, SearchIcon } from "lucide-react";
import { listClientsAction } from "../actions/client-actions";
import { AddClient } from "../components/add-client";
import { clientsColumns } from "./clients-columns";

const ClientsPage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            return await listClientsAction();
        },
    });

    return (
        <>
            <h1 className="text-lg font-sans">
                Clientes cadastrados {data?.count}{" "}
            </h1>

            <div className="w-full flex flex-col gap-4">
                <header className="flex items-center justify-between gap-4">
                    <div className="relative">
                        <Input
                            disabled={isLoading}
                            placeholder="Pesquisar cliente"
                            className="w-64"
                        />

                        <SearchIcon className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>

                    <AddClient>
                        <Button disabled={isLoading}>
                            <PlusIcon />
                            Adicionar cliente
                        </Button>
                    </AddClient>
                </header>

                <DataTable
                    columns={clientsColumns}
                    data={data?.clients || []}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
};

export default ClientsPage;
