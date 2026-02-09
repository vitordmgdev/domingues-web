import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { clientStatusLabelMap, clientStatusStylesMap } from "@/utils/maps";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { getPipelineStages } from "../action/client-pipeline-actions";

export const PipelineItemCard = ({
    item,
}: {
    item: Awaited<
        ReturnType<typeof getPipelineStages>
    >[number]["items"][number];
}) => {
    if (!item.client) return null;

    const status = item.client.partyType[0].status;

    return (
        <div className="flex flex-col gap-2 p-2 border bg-card rounded-sm">
            <header className="flex items-center justify-between">
                <Badge
                    className={cn(
                        "rounded-sm",
                        clientStatusStylesMap[item.client.partyType[0].status]
                            .badge,
                    )}
                >
                    <div
                        className={`rounded-full size-1 
                            ${
                                clientStatusStylesMap[
                                    item.client.partyType[0].status
                                ].dot
                            }
                        `}
                    />
                    {clientStatusLabelMap[status]}
                </Badge>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem variant="destructive">
                            <Trash2 /> Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <div className="flex flex-col gap-1">
                <h1 className="text-sm font-normal">
                    {item.client.fullName}
                </h1>

                <span className="text-xs text-muted-foreground">
                    {item.client.partyType[0].type}
                </span>
            </div>
        </div>
    );
};
