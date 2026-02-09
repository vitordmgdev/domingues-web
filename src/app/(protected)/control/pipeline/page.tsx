"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
    createPipelineStage,
    getPipelineStages,
} from "./action/client-pipeline-actions";
import { PipelineColumn } from "./components/pipeline-column";

const PipelinePage = () => {
    const queryClient = useQueryClient();

    const { data: stages, isLoading } = useQuery({
        queryKey: ["pipeline", "stages"],
        queryFn: async () => {
            return await getPipelineStages();
        },
    });

    const { mutateAsync: createStage, isPending: isCreatingStage } =
        useMutation({
            mutationKey: ["pipeline", "stages", "create"],
            mutationFn: async () => {
                const formData = {
                    title: "Novo Estágio",
                    description: "Descrição do novo estágio",
                    position: stages?.length ?? 0,
                };

                const data = await createPipelineStage(formData);

                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["pipeline", "stages"],
                });
            },
        });

    return (
        <section>
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-normal">Pipeline</h1>

                <Button onClick={() => createStage()}>
                    {isCreatingStage && (
                        <Loader2 className="size-4 animate-spin" />
                    )}
                    Criar coluna{" "}
                </Button>
            </header>

            <div className="flex gap-4 mt-4">
                {stages?.map((stage) => (
                    <PipelineColumn key={stage.id} data={stage} />
                ))}
            </div>
        </section>
    );
};

export default PipelinePage;
