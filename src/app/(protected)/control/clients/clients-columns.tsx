import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

type ClientsColumnsProps = Prisma.PartyGetPayload<{
    include: {
        partyAddress: true;
        user: true;
        partyPhone: true;
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
        accessorKey: "partyAddress",
        cell: ({ row }) => {
            return (
                <Badge variant="outline" className="w-fit font-normal">
                    {row.original.partyAddress.length === 0
                        ? "Sem endereços"
                        : row.original.partyAddress.length === 1
                          ? "1 endereço"
                          : `${row.original.partyAddress.length} endereços`}
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
                        "capitalize font-medium h-6 gap-2 rounded-md px-2.5 py-1",
                        styles.badge,
                    )}
                >
                    <div
                        className={cn(
                            "size-1.5 rounded-full shrink-0",
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
