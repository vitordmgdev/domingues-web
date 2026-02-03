import { validateCPF } from "@/utils/validators";
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
    email: z.email("E-mail inválido").optional(),
    cpf: z
        .string()
        .optional()
        .refine((cpf) => {
            if (!cpf) return true;

            return validateCPF(cpf);
        }, "CPF inválido"),
    cnpj: z.string().optional(),
    stateRegistration: z.string().optional(),
    companyName: z.string().optional(),
    companyFantasyName: z.string().optional(),
    contact: z.object({
        phone: z.string().optional(),
        is_whatsapp: z.enum(["yes", "no"]).optional(),
    }),
    address: z.object({
        zipCode: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        street: z.string().optional(),
        complement: z.string().optional(),
        identifier: z.string().optional(),
        district: z.string().optional(),
    }),
});

export type RegisterClientType = z.infer<typeof registerClientSchema>;
