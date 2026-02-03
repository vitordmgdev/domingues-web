"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Boxes, ChevronLeftIcon, EditIcon, SaveIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getClientAction } from "../../actions/client-actions";
import {
    updateClientSchema,
    UpdateClientType,
} from "../../actions/client-schemas";

const ClientDetailsPage = () => {
    const { partyId } = useParams() as { partyId: string };

    const { data, isLoading, error } = useQuery({
        queryKey: ["clients", partyId],
        queryFn: async () => {
            return await getClientAction(partyId);
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<UpdateClientType>({
        resolver: zodResolver(updateClientSchema),
        disabled: !isEditing,
    });

    const router = useRouter();

    return (
        <div className="flex flex-col border rounded-lg bg-background overflow-hidden">
            <header
                className={`flex items-center justify-between gap-4 p-4 border-b`}
            >
                {isLoading && (
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-12 rounded-sm" />
                    </div>
                )}

                {data && (
                    <div className="flex items-center gap-4">
                        <Badge
                            variant="outline"
                            className={cn(
                                "capitalize font-medium h-6 gap-1.5 rounded-sm px-2 py-1",
                                clientStatusStylesMap[data.status].badge,
                            )}
                        >
                            <div
                                className={cn(
                                    "size-1 rounded-full shrink-0",
                                    clientStatusStylesMap[data.status].dot,
                                )}
                            />
                            {clientStatusLabelMap[data.status]}
                        </Badge>
                    </div>
                )}

                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.replace("/control/clients")}
                >
                    <ChevronLeftIcon className="size-4" />
                    Voltar
                </Button>
            </header>

            <div className="grid grid-cols-[500px_1fr]">
                <div className="p-4 flex flex-col gap-4">
                    <header className="flex items-center justify-between">  
                        <h3 className="text-lg font-sans">Informações</h3>
                    </header>

                    <Form {...form}>
                        <form className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.firstName
                                                        }
                                                        placeholder="Nome"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sobrenome</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.lastName ?? ""
                                                        }
                                                        placeholder="Sobrenome"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            {isLoading ? (
                                                <Skeleton className="h-9 w-full rounded-sm" />
                                            ) : (
                                                <Input
                                                    defaultValue={
                                                        data?.email ?? ""
                                                    }
                                                    placeholder="email@exemplo.com"
                                                    {...field}
                                                />
                                            )}
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CPF</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.cpf ?? ""
                                                        }
                                                        placeholder="000.000.000-00"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cnpj"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CNPJ</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.cnpj ?? ""
                                                        }
                                                        placeholder="00.000.000/0000-00"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Razão Social</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.companyName ??
                                                            ""
                                                        }
                                                        placeholder="EMPRESA LTDA"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fantasyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome Fantasia</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.fantasyName ??
                                                            ""
                                                        }
                                                        placeholder="Nome da empresa"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="stateRegistration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>IE</FormLabel>
                                            <FormControl>
                                                {isLoading ? (
                                                    <Skeleton className="h-9 w-full rounded-sm" />
                                                ) : (
                                                    <Input
                                                        defaultValue={
                                                            data?.stateRegistration ??
                                                            ""
                                                        }
                                                        placeholder="Inscrição estadual"
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                                {isEditing ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="rounded-sm"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                form.reset();
                                                setIsEditing(false);
                                            }}
                                        >
                                            Cancelar
                                        </Button>

                                        <Button
                                            className="rounded-sm"
                                            type="submit"
                                        >
                                            <SaveIcon className="size-4" />
                                            Salvar
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="rounded-sm"
                                        onClick={() => setIsEditing(true)}
                                        disabled={isEditing}
                                    >
                                        <EditIcon className="mr-2 h-4 w-4" />
                                        Editar
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>

                <Tabs defaultValue="schedule" className="border-l">
                    <div className="border-b p-4">
                        <TabsList className="bg-transparent">
                            <TabsTrigger
                                className="rounded-sm border-none"
                                value="schedule"
                            >
                                <Boxes className="size-4" />
                                Projetos
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="schedule">
                        Make sure your account is set up correctly.
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here. After saving, you&apos;ll be
                        logged out.
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ClientDetailsPage;
