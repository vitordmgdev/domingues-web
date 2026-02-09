import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePipelineStore } from "@/store/crm-pipeline-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
    createPipelineItem,
    getPipelineStages,
    listClientsToPipeline,
} from "../action/client-pipeline-actions";
import { pipelineActionsSchema } from "../action/client-pipeline-schema";
import { PipelineItemCard } from "./pipeline-item-card";

export const PipelineColumn = ({
    data,
}: {
    data: Awaited<ReturnType<typeof getPipelineStages>>[number];
}) => {
    const queryClient = useQueryClient();

    const { isCreatingStageItem, setIsCreatingStageItem } = usePipelineStore();

    type CreateStageItemFormValues = z.infer<
        typeof pipelineActionsSchema.item.create
    >;

    const createStageItemForm = useForm<CreateStageItemFormValues>({
        resolver: zodResolver(pipelineActionsSchema.item.create),
        defaultValues: {
            pipelineStageId: data.id,
            entityId: "",
        },
        mode: "onChange",
    });

    const { mutateAsync: createItem, isPending: isCreatingItem } = useMutation({
        mutationKey: ["pipeline", "stages", "items", "create"],
        mutationFn: async (formData: CreateStageItemFormValues) => {
            return await createPipelineItem(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pipeline", "stages"],
            });
            createStageItemForm.reset();
            setIsCreatingStageItem(null);
        },
    });

    const { data: clients } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            return await listClientsToPipeline();
        },
    });

    return (
        <div className="flex flex-col gap-2 p-2 border w-72 bg-background rounded-xl h-fit">
            <header className="flex items-center justify-between">
                <h2 className="text-sm font-normal">{data.title}</h2>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem variant="destructive">
                            <Trash2 className="size-4" /> Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <div className="flex flex-col gap-2">
                {data.items.map((item) => {
                    if (!item) return null;

                    return <PipelineItemCard key={item.id} item={item} />;
                })}
            </div>

            {isCreatingStageItem === data.id ? (
                <div className="flex flex-col gap-4">
                    <Form {...createStageItemForm}>
                        <form
                            onSubmit={createStageItemForm.handleSubmit(
                                async (data) => await createItem(data),
                            )}
                            className="flex flex-col gap-2"
                        >
                            <FormField
                                control={createStageItemForm.control}
                                name="entityId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente</FormLabel>

                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {clients?.map((client) => (
                                                        <SelectItem
                                                            key={client.id}
                                                            value={client.id}
                                                        >
                                                            {client.fullName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsCreatingStageItem(null)}
                                    disabled={isCreatingItem}
                                >
                                    <X className="size-4" />
                                    Cancelar
                                </Button>

                                <Button variant="default" type="submit">
                                    <Plus className="size-4" />
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            ) : (
                <Button
                    variant="ghost"
                    onClick={() => setIsCreatingStageItem(data.id)}
                >
                    <Plus className="size-4" />
                    Adicionar cliente
                </Button>
            )}
        </div>
    );
};
