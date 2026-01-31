import { validateCPF } from "@/utils/validators";
import { PartyStatus } from "@prisma/client";
import z from "zod";

export const registerClientSchema = z.object({
    firstName: z
        .string()
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .max(32, "Nome deve ter menos de 32 caracteres"),
    lastName: z
        .string()
        .min(3, "Sobrenome deve ter pelo menos 3 caracteres")
        .max(64, "Sobrenome deve ter menos de 64 caracteres")
        .optional(),
    email: z.email().optional(),
    cpf: z
        .string()
        .optional()
        .refine((cpf) => {
            if (!cpf) return true;

            return validateCPF(cpf);
        }, "CPF inválido"),
    status: z.enum(Object.values(PartyStatus)),
    description: z.string().optional(),
});

export type RegisterClientType = z.infer<typeof registerClientSchema>;
