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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cepMask, cnpjMaskInput, cpfMaskInput, phoneMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMaskito } from "@maskito/react";
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

            <DialogContent className="sm:max-w-[600px]">
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
        mode: "onBlur",
        resolver: zodResolver(registerClientSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            cpf: "",
            cnpj: "",
            contact: {
                phone: "",
                is_whatsapp: "yes",
            },
            address: {
                zipCode: "",
                state: "",
                city: "",
                street: "",
                complement: "",
                identifier: "",
                district: "",
            },
        },
    });

    const cpfInputRef = useMaskito({
        options: cpfMaskInput,
    });

    const cnpjInputRef = useMaskito({
        options: cnpjMaskInput,
    });

    const phoneInputRef = useMaskito({
        options: phoneMask,
    });

    const cepInputRef = useMaskito({
        options: cepMask,
    });

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
        <ScrollArea className="h-[400px] relative p-1">
            <Form {...form}>
                <form
                    className="flex flex-col gap-4 mx-4 md:mx-0 relative"
                    onSubmit={form.handleSubmit(createClient)}
                >
                    <div className="flex flex-col gap-2">
                        <FormLabel className="max-[425px]:hidden">
                            Nome completo
                        </FormLabel>

                        <div className="grid grid-cols-1 min-[425px]:grid-cols-2 items-start gap-4">
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
                                                autoComplete="off"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(
                                                        e.target.value,
                                                    );
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
                                                autoComplete="off"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-4">
                        <FormField
                            control={form.control}
                            name="contact.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="(00) 0000-0000"
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                            ref={phoneInputRef}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                                autoComplete="off"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(
                                                        e.target.value,
                                                    );
                                                }}
                                                className="ps-8.5"
                                            />

                                            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="contact.is_whatsapp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>É WhatsApp?</FormLabel>

                                <RadioGroup
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="yes" />
                                        <Label>Sim</Label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="no" />
                                        <Label>Não</Label>
                                    </div>
                                </RadioGroup>
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="000.000.000-00"
                                            className="w-full"
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

                        <FormField
                            control={form.control}
                            name="cnpj"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CNPJ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="00.000.000/0000-00"
                                            className="w-full"
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                            ref={cnpjInputRef}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Razão Social</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Razão Social"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="companyFantasyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Fantasia</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome Fantasia"
                                            autoComplete="off"
                                            {...field}
                                        />
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
                                    <FormLabel>
                                        IE - Inscrição Estadual
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Inscrição Estadual"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] items-start gap-4">
                        <FormField
                            control={form.control}
                            name="address.zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="00000-000"
                                            className="w-full sm:max-w-30"
                                            autoComplete="off"
                                            {...field}
                                            ref={cepInputRef}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Estado"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Cidade"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] items-start gap-4">
                        <FormField
                            control={form.control}
                            name="address.district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Bairro"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rua</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Rua"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>N°</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Identificador"
                                            className="w-full sm:max-w-30"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="address.complement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complemento</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Complemento"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4 mt-4 sticky bottom-0 bg-background pt-4 border-t z-10">
                        <Button
                            type="submit"
                            disabled={
                                isPendingCreateClient || !form.formState.isValid
                            }
                        >
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

            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
};
