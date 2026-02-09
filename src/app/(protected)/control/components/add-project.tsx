"use client";

import { createProject } from "@/actions/projects/project-actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ProjectSchemas } from "@/schemas/project-schemas";
import { projectPriorityMap } from "@/utils/maps";
import { zodResolver } from "@hookform/resolvers/zod";
import { PriorityStatus } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddProject = ({
    children,
    partyPublicId,
}: {
    children: React.ReactNode;
    partyPublicId: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof ProjectSchemas.create>>({
        mode: "onChange",
        resolver: zodResolver(ProjectSchemas.create),
        defaultValues: {
            partyPublicId,
            title: "",
            priority: "MEDIA",
            description: "",
            deadlineDate: new Date(),
        },
    });

    const { mutateAsync: createProjectMutation, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof ProjectSchemas.create>) => {
            return await createProject(data);
        },
        onSuccess: () => {
            form.reset();
            setIsOpen(false);
            toast.success("Projeto criado com sucesso!");

            queryClient.invalidateQueries({
                queryKey: ["clients", partyPublicId],
            });
        },
    });

    async function onSubmit(data: z.infer<typeof ProjectSchemas.create>) {
        await createProjectMutation(data);
    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    form.reset();
                }
            }}
        >
            {children && <SheetTrigger asChild>{children}</SheetTrigger>}

            <SheetContent
                side="right"
                hasOverlay={false}
                showCloseButton={false}
                className="h-[calc(100%-1rem)] mr-2 my-auto border rounded-xl bg-sidebar"
            >
                <SheetHeader>
                    <SheetTitle>Criar projeto</SheetTitle>

                    <SheetDescription>
                        Preencha os campos abaixo para criar um novo projeto.
                    </SheetDescription>
                </SheetHeader>

                <div className="px-4">
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-4 h-full"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <FormLabel>Título</FormLabel>
                                            <span
                                                className={cn(
                                                    "text-xs",
                                                    form.watch("title").length >
                                                        50
                                                        ? "text-destructive"
                                                        : "text-muted-foreground",
                                                )}
                                            >
                                                {form.watch("title").length}/50
                                            </span>
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Escritório de advocacia"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-[1fr_auto] gap-4">
                                <FormField
                                    control={form.control}
                                    name="deadlineDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Prazo de entrega
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "dd/MM/yyyy",
                                                                    {
                                                                        locale: ptBR,
                                                                    },
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Selecione
                                                                    uma data
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>

                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(date) =>
                                                            date <
                                                            new Date(
                                                                new Date().setHours(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                ),
                                                            )
                                                        }
                                                        locale={ptBR}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prioridade</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-30">
                                                        <SelectValue placeholder="Selecione a prioridade" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {Object.values(
                                                            PriorityStatus,
                                                        ).map((priority) => {
                                                            const {
                                                                icon: Icon,
                                                                label,
                                                                style,
                                                            } = projectPriorityMap[
                                                                priority
                                                            ];

                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        priority
                                                                    }
                                                                    value={
                                                                        priority
                                                                    }
                                                                >
                                                                    <Icon
                                                                        className={cn(
                                                                            "size-4",
                                                                            style.text,
                                                                        )}
                                                                    />
                                                                    {label}
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>
                                                Descrição (opcional)
                                            </FormLabel>

                                            <span className="text-muted-foreground text-xs">
                                                {
                                                    form.watch("description")
                                                        ?.length
                                                }
                                                /255
                                            </span>
                                        </div>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none h-20"
                                                placeholder="Descrição do projeto"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <SheetClose asChild>
                                    <Button type="button" variant="ghost">
                                        <XIcon />
                                        Cancelar
                                    </Button>
                                </SheetClose>

                                <Button
                                    type="submit"
                                    disabled={
                                        !form.formState.isValid || isPending
                                    }
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2Icon className="animate-spin" />
                                            Criando...
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon />
                                            Criar Projeto
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
};
