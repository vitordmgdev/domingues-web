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
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap } from "@/utils/maps";
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
                <header className="flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="relative">
                            <Input
                                disabled={isLoading}
                                placeholder="Pesquisar cliente"
                                className="w-64 ps-8"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />

                            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                {Object.entries(clientStatusLabelMap).map(
                                    ([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal",
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
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateFilter?.from}
                                    selected={dateFilter}
                                    onSelect={setDateFilter}
                                    numberOfMonths={2}
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <AddClient>
                        <Button disabled={isLoading} className="rounded-sm">
                            <PlusIcon />
                            Adicionar cliente
                        </Button>
                    </AddClient>
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
