"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cpfMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMaskito } from "@maskito/react";
import { PartyStatus } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { createClientAction } from "../actions/client-actions";
import {
    registerClientSchema,
    RegisterClientType,
} from "../actions/client-schemas";

export const AddClient = ({
    children,
    open,
    onOpenChange,
}: {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Adicionar cliente</DrawerTitle>

                        <DialogDescription>
                            Informe os dados do cliente
                        </DialogDescription>
                    </DrawerHeader>

                    <RegisterClientForm />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar cliente</DialogTitle>

                    <DialogDescription>
                        Informe os dados do cliente
                    </DialogDescription>
                </DialogHeader>

                <RegisterClientForm />
            </DialogContent>
        </Dialog>
    );
};

export const RegisterClientForm = () => {
    const form = useForm<RegisterClientType>({
        resolver: zodResolver(registerClientSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            cpf: "",
            status: "NOVO",
            description: "",
        },
    });

    const cpfInputRef = useMaskito({ options: cpfMask });

    const queryClient = useQueryClient();

    const {
        mutateAsync: mutateCreateClient,
        isPending: isPendingCreateClient,
    } = useMutation({
        mutationFn: async (data: RegisterClientType) => {
            return await createClientAction(data);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["clients"],
            });

            form.reset();

            toast.success("Cliente registrado com sucesso!", {
                description: `O cliente ${data.firstName} ${data.lastName} foi registrado com sucesso!`,
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    async function createClient(data: RegisterClientType) {
        await mutateCreateClient(data);
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-4 md:mx-0"
                onSubmit={form.handleSubmit(createClient)}
            >
                <div className="flex flex-col gap-2">
                    <FormLabel className="max-[425px]:hidden">
                        Nome completo
                    </FormLabel>

                    <div className="grid grid-cols-1 min-[425px]:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="min-[425px]:hidden">
                                        Nome
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                        />
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
                                    <FormLabel className="min-[425px]:hidden">
                                        Sobrenome
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Sobrenome"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="example@email.com"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                            className="pe-8.5"
                                        />

                                        <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="000.000.000-00"
                                        className="w-full md:w-32"
                                        autoComplete="off"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        ref={cpfInputRef}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Object.values(PartyStatus).map(
                                            (status) => (
                                                <SelectItem
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>

                            <FormControl>
                                <Textarea
                                    placeholder="Digite uma descrição"
                                    className="h-30 resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={isPendingCreateClient}>
                        {isPendingCreateClient && (
                            <Loader2 className="size-4 animate-spin" />
                        )}

                        {isPendingCreateClient
                            ? "Registrando..."
                            : "Registrar cliente"}
                    </Button>

                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                </div>
            </form>
        </Form>
    );
};
