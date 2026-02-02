import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { DropdownMenuClientActions } from "../components/dropdown-menu-client-actions";

type ClientsColumnsProps = Prisma.PartyGetPayload<{
    include: {
        _count: true;
    };
}>;

export const clientsColumns: ColumnDef<ClientsColumnsProps>[] = [
    {
        header: "Nome completo",
        accessorKey: "fullName",
    },
    {
        header: "E-mail",
        accessorKey: "email",
        cell: ({ row }) => {
            return (
                <div className="max-w-60 truncate">{row.original.email}</div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const styles = clientStatusStylesMap[status];

            return (
                <Badge
                    variant="outline"
                    className={cn(
                        "capitalize font-medium h-6 gap-1.5 rounded-sm px-2 py-1",
                        styles.badge,
                    )}
                >
                    <div
                        className={cn(
                            "size-1 rounded-full shrink-0",
                            styles.dot,
                        )}
                    />
                    {clientStatusLabelMap[status]}
                </Badge>
            );
        },
    },
    {
        header: "CPF",
        accessorKey: "cpf",
        cell: ({ row }) => {
            const cpf = row.original.cpf;

            return (
                <div className="max-w-60 truncate">
                    {cpf ? (
                        <span>{cpf}</span>
                    ) : (
                        <div className="h-2 w-20 mx-auto rounded-full bg-muted" />
                    )}
                </div>
            );
        },
    },
    {
        header: "CNPJ",
        cell: ({ row }) => {
            const cnpj = row.original.cnpj;
            return <span>{cnpj ?? "Não informado"}</span>;
        },
    },
    {
        header: "Usuário",
        cell: ({ row }) => {
            const userId = row.original.userId;

            return <span>{userId ?? "Não registrado"}</span>;
        },
    },
    {
        header: "Data de cadastro",
        cell: ({ row }) => {
            const date = row.original.createdAt;
            return (
                <span>
                    {date.toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenuClientActions id={row.original.id}>
                    <Button variant="ghost" size="icon-sm" autoFocus={false}>
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuClientActions>
            );
        },
    },
];
