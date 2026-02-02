import { PartyStatus } from "@prisma/client";

export const clientStatusLabelMap: Record<PartyStatus, string> = {
    ATIVO: "Ativo",
    INATIVO: "Inativo",
    INTERESSE: "Interesse",
    PERDA: "Perdido",
    NEGOCIACAO: "Em Negociação",
    CONTATO: "Contato",
    NOVO: "Novo",
};

export const clientStatusStylesMap: Record<
    PartyStatus,
    { badge: string; dot: string }
> = {
    ATIVO: {
        badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50",
        dot: "bg-emerald-500",
    },
    INATIVO: {
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
    NEGOCIACAO: {
        badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50",
        dot: "bg-amber-500",
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
