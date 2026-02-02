"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronFirstIcon, ChevronLastIcon } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import { Skeleton } from "./ui/skeleton";

export function DataTable<TData, TValue>({
    isLoading,
    columns,
    data,
    filterValue,
    setFilterValue,
}: {
    isLoading: boolean;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterValue: string;
    setFilterValue: (value: string) => void;
}) {
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableGlobalFilter: true,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filterValue,
        },
        onGlobalFilterChange: setFilterValue,
    });

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="last:text-end whitespace-nowrap border-r last:border-r-0"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {isLoading ? (
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index} className="h-12">
                                    {Array.from({
                                        length: table.getAllColumns().length,
                                    }).map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <Skeleton className="h-4 rounded-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="truncate h-12 last:text-end whitespace-nowrap border-r last:border-r-0"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="h-24 text-center"
                                    >
                                        Sem resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => table.setPageIndex(0)}
                            aria-label="Go to first page"
                            className={
                                !table.getCanPreviousPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        >
                            <ChevronFirstIcon size={16} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => table.previousPage()}
                            className={
                                !table.getCanPreviousPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>

                    {Array.from({ length: table.getPageCount() }).map(
                        (_, i) => {
                            const isCurrent =
                                table.getState().pagination.pageIndex === i;
                            const isUnnecessary =
                                table.getPageCount() > 7 &&
                                Math.abs(
                                    table.getState().pagination.pageIndex - i,
                                ) > 1 &&
                                i > 0 &&
                                i < table.getPageCount() - 1;

                            if (isUnnecessary) {
                                if (i === 1 || i === table.getPageCount() - 2) {
                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }
                                return null;
                            }

                            return (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => table.setPageIndex(i)}
                                        isActive={isCurrent}
                                        className="cursor-pointer"
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        },
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => table.nextPage()}
                            className={
                                !table.getCanNextPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            aria-label="Go to last page"
                            className={
                                !table.getCanNextPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        >
                            <ChevronLastIcon size={16} />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
