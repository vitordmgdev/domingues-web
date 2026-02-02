import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
            return <span>{row.original.email}</span>;
        },
    },
    {
        header: "Endereços",
        accessorKey: "_count",
        cell: ({ row }) => {
            return (
                <Badge variant="secondary" className="w-full font-normal h-6">
                    {row.original._count.partyAddress} Endereços
                </Badge>
            );
        },
    },
    {
        header: "Telefones",
        accessorKey: "_count",
        cell: ({ row }) => {
            return (
                <Badge variant="secondary" className="w-full font-normal h-6">
                    {row.original._count.partyPhone} Telefones
                </Badge>
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
        accessorKey: "createdAt",
        header: "Data de cadastro",
        cell: ({ row }) => {
            const date = row.original.createdAt;
            return (
                <span>
                    {date.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            );
        },
    },
];
