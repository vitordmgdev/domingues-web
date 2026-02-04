"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap } from "@/utils/maps";
import { PartyTypeStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
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

    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>();

    const columnFilters: ColumnFiltersState = [];

    if (statusFilter && statusFilter !== "all") {
        columnFilters.push({
            id: "status",
            value: statusFilter,
        });
    }

    if (dateFilter?.from) {
        columnFilters.push({
            id: "createdAt",
            value: dateFilter,
        });
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <header className="flex items-center justify-between gap-4 p-4 border rounded-md">
                    <div className="flex gap-2">
                        <div className="relative">
                            <Input
                                disabled={isLoading}
                                placeholder="Pesquisar cliente..."
                                className="w-64 ps-8 border-none bg-transparent dark:bg-transparent"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />

                            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-32 border-none bg-transparent dark:bg-transparent p-2">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>

                                {Object.keys(PartyTypeStatus).map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {
                                            clientStatusLabelMap[
                                                status as PartyTypeStatus
                                            ]
                                        }
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[220px] justify-start text-left font-normal border-none bg-transparent dark:bg-transparent",
                                        !dateFilter && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateFilter?.from ? (
                                        dateFilter.to ? (
                                            <>
                                                {format(
                                                    dateFilter.from,
                                                    "dd/MM/yyyy",
                                                )}{" "}
                                                -{" "}
                                                {format(
                                                    dateFilter.to,
                                                    "dd/MM/yyyy",
                                                )}
                                            </>
                                        ) : (
                                            format(
                                                dateFilter.from,
                                                "dd/MM/yyyy",
                                            )
                                        )
                                    ) : (
                                        <span>Filtrar por data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="range"
                                    defaultMonth={dateFilter?.from}
                                    selected={dateFilter}
                                    onSelect={setDateFilter}
                                    numberOfMonths={2}
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>

                        <AddClient>
                            <Button
                                variant="outline"
                                disabled={isLoading}
                                className="rounded-sm"
                            >
                                <PlusIcon />
                                Adicionar cliente
                            </Button>
                        </AddClient>
                    </div>
                </header>

                {error ? (
                    <div className="flex items-center justify-center">
                        <p className="text-destructive">
                            Erro ao carregar clientes
                        </p>
                    </div>
                ) : (
                    <DataTable
                        columns={clientsColumns}
                        data={data?.clients || []}
                        isLoading={isLoading}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        columnFilters={columnFilters}
                    />
                )}
            </div>
        </>
    );
};

export default ClientsPage;
