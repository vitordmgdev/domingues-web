import { PriorityStatus } from "@prisma/client";
import z from "zod";

export const ProjectSchemas = {
    create: z.object({
        partyPublicId: z.string(),
        title: z.string().min(1, "Este campo é obrigatório."),
        description: z
            .string()
            .max(255, "Este campo pode ter no máximo 255 caracteres.")
            .optional(),
        deadlineDate: z.date(),
        priority: z.enum(Object.values(PriorityStatus)),
    }),
};
