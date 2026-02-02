"use server";

import prisma from "@/lib/prisma";
import { maskCPF } from "@/utils/masks";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { RegisterClientType } from "./client-schemas";

export async function createClientAction(data: RegisterClientType) {
    try {
        const { phone, ...partyData } = data;

        const client = await prisma.party.create({
            data: {
                ...partyData,
                fullName: `${data.firstName} ${data.lastName}`,
                partyType: {
                    create: {
                        type: "CONSUMIDOR",
                    },
                },
            },
        });

        if (data.phone) {
            await prisma.partyPhone.create({
                data: {
                    phone: data.phone,
                    isPrimary: true,
                    isWhatsapp: true,
                    party: {
                        connect: {
                            id: client.id,
                        },
                    },
                },
            });
        }

        return client;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Já existe um cliente com este CPF.");
            }
        }

        if (error instanceof Error) {
            throw new Error(error.message);
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
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: true,
        },
    });

    const clientsWithMaskedCpf = clients.map((client) => ({
        ...client,
        cpf: maskCPF(client.cpf!),
    }));

    return { count, clients: clientsWithMaskedCpf };
}

export async function getClientAction(id: string) {
    try {
        const client = await prisma.party.findUnique({
            where: {
                id,
            },
            include: {
                partyAddress: true,
                partyPhone: true,
                partyType: true,
                user: true,
            },
        });

        return client;
    } catch (error) {
        throw new Error("Erro ao buscar cliente.");
    }
}

export async function deleteClientAction(id: string) {
    try {
        const client = await prisma.party.delete({
            where: {
                id,
            },
        });

        return client;
    } catch (error) {
        throw new Error("Erro ao deletar cliente.");
    }
}
