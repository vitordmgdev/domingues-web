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
                partyType: {
                    create: {
                        type: "CONSUMIDOR",
                    },
                },
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
    const count = await prisma.party.count({
        where: {
            partyType: {
                some: {
                    type: "CONSUMIDOR",
                },
            },
        },
    });

    const clients = await prisma.party.findMany({
        where: {
            partyType: {
                some: {
                    type: "CONSUMIDOR",
                },
            },
        },
        include: {
            _count: true,
        },
    });

    return { count, clients }
}
