"use server";

import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { registerClientSchema, RegisterClientType } from "./client-schemas";

export async function createClientAction(data: RegisterClientType) {
    const parsedData = registerClientSchema.safeParse(data);

    if (!parsedData.success) {
        throw new Error(parsedData.error.message);
    }

    try {
        return await prisma.party.create({
            data: {
                ...parsedData.data,
                fullName: `${parsedData.data.firstName} ${parsedData.data.lastName}`,
            },
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Já existe um cliente com este CPF.");
            }
        }

        throw new Error("Erro ao criar cliente.");
    }
}

export async function listClientsAction() {
    return await prisma.party.findMany({
        include: {
            partyAddress: true,
            user: true,
            partyPhone: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    });
}
