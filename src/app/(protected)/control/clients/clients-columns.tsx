import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { DropdownMenuClientActions } from "../components/dropdown-menu-client-actions";

type ClientsColumnsProps = Prisma.PartyGetPayload<{
    include: {
        _count: true;
    };
}>;

export const clientsColumns: ColumnDef<ClientsColumnsProps>[] = [
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <div className="flex justify-between items-center">
                    Nome completo
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 hover:bg-transparent"
                    >
                        <ArrowUpDown className="size-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        header: ({ column }) => {
            return (
                <div className="flex justify-between items-center">
                    E-mail
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 hover:bg-transparent"
                    >
                        <ArrowUpDown className="size-4" />
                    </Button>
                </div>
            );
        },
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
            return <span>{cpf ?? "Não informado"}</span>;
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
        header: ({ column }) => {
            return (
                <div className="flex justify-between items-center">
                    Data de cadastro
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 hover:bg-transparent"
                    >
                        <ArrowUpDown className="size-4" />
                    </Button>
                </div>
            );
        },
        accessorKey: "createdAt",
        filterFn: (row, id, value) => {
            const rowDate = new Date(row.getValue(id));
            const { from, to } = value as { from?: Date; to?: Date };

            if (!from) return true;

            if (to) {
                return isWithinInterval(rowDate, {
                    start: startOfDay(from),
                    end: endOfDay(to),
                });
            }

            return isWithinInterval(rowDate, {
                start: startOfDay(from),
                end: endOfDay(from),
            });
        },
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
