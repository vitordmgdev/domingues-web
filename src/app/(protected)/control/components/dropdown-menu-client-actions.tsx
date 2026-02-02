"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { deleteClientAction } from "../actions/client-actions";

export const DropdownMenuClientActions = ({
    children,
    id,
}: {
    children: React.ReactNode;
    id: string;
}) => {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteClient } = useMutation({
        mutationFn: async () => {
            return await deleteClientAction(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });

            toast.success("Cliente deletado com sucesso");
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="items-center"
                    onClick={() => redirect(`/control/clients/${id}`)}
                >
                    <Eye className="size-4" />
                    Ver detalhes
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="items-center"
                    onClick={() => deleteClient()}
                >
                    <Trash2 className="size-4 text-destructive" />
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
