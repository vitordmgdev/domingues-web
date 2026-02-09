import { PartyTypeStatus, PriorityStatus } from "@prisma/client";
import {
    LucideIcon,
    SignalHighIcon,
    SignalIcon,
    SignalLowIcon,
    SignalMediumIcon,
} from "lucide-react";

export const clientStatusLabelMap: Record<PartyTypeStatus, string> = {
    SUSPENSO: "Suspenso",
    INTERESSE: "Interesse",
    PERDA: "Perdido",
    CONTATO: "Contato",
    NOVO: "Novo",
};

export const clientStatusStylesMap: Record<
    PartyTypeStatus,
    { badge: string; dot: string }
> = {
    SUSPENSO: {
        badge: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-800/50",
        dot: "bg-zinc-500",
    },
    INTERESSE: {
        badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/50",
        dot: "bg-indigo-500",
    },
    PERDA: {
        badge: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-800/50",
        dot: "bg-red-500",
    },
    CONTATO: {
        badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50",
        dot: "bg-blue-500",
    },
    NOVO: {
        badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-sky-800/50",
        dot: "bg-sky-500",
    },
};

interface MapProps {
    label: string;
    icon: LucideIcon;
    style: {
        bg: string;
        text: string;
        border: string;
    };
}

export const projectPriorityMap: Record<PriorityStatus, MapProps> = {
    ALTA: {
        label: "Alta",
        icon: SignalIcon,
        style: {
            bg: "bg-red-500/20",
            text: "text-red-600 dark:text-red-400",
            border: "border-red-200/60 dark:border-red-800/60",
        },
    },
    MEDIA: {
        label: "Média",
        icon: SignalMediumIcon,
        style: {
            bg: "bg-yellow-500/20",
            text: "text-yellow-600 dark:text-yellow-400",
            border: "border-yellow-200/60 dark:border-yellow-800/60",
        },
    },
    BAIXA: {
        label: "Baixa",
        icon: SignalLowIcon,
        style: {
            bg: "bg-green-500/20",
            text: "text-green-600 dark:text-green-400",
            border: "border-green-200/60 dark:border-green-800/60",
        },
    },
};
