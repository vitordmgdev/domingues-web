"use server";

import prisma from "@/lib/prisma";
import { serializableCNPJ, serializableCPF } from "@/utils/masks";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { RegisterClientType } from "./client-schemas";

export async function createClientAction(data: RegisterClientType) {
    try {
        const { contact, address, ...partyData } = data;

        const client = await prisma.party.create({
            data: {
                ...partyData,
                cpf: partyData.cpf || null,
                cnpj: partyData.cnpj || null,
                fullName: `${data.firstName} ${data.lastName}`,
                status: "NOVO",
                partyType: {
                    create: {
                        type: "CLIENTE",
                    },
                },
            },
        });

        if (contact?.phone) {
            await prisma.partyPhone.create({
                data: {
                    phone: contact.phone,
                    isPrimary: true,
                    isWhatsapp: contact.is_whatsapp === "yes",
                    party: {
                        connect: {
                            id: client.id,
                        },
                    },
                },
            });
        }

        const hasAddress = Object.values(address).some(
            (val) => val && val.trim() !== "",
        );

        if (hasAddress) {
            await prisma.partyAddress.create({
                data: {
                    ...address,
                    name: "Principal",
                    isPrimary: true,
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
                const target = error.meta?.target as string[];

                if (target?.includes("cpf")) {
                    throw new Error("Já existe um cliente com este CPF.");
                } else if (target?.includes("cnpj")) {
                    throw new Error("Já existe um cliente com este CNPJ.");
                }

                throw new Error(
                    "Dados duplicados (CPF, CNPJ ou outro campo único).",
                );
            }

            throw new Error(error.message);
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
                    type: "CLIENTE",
                },
            },
        },
    });

    const clients = await prisma.party.findMany({
        where: {
            partyType: {
                some: {
                    type: "CLIENTE",
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
        cpf: client.cpf ? serializableCPF(client.cpf) : null,
        cnpj: client.cnpj ? serializableCNPJ(client.cnpj) : null,
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
                _count: true,
            },
        });

        return client;
    } catch (error) {
        throw new Error("Erro ao buscar cliente.");
    }
}

export async function deleteClientAction(id: string) {
    try {
        const client = await prisma.party.deleteMany({
            where: {
                id,
                partyType: {
                    some: {
                        type: "CLIENTE",
                    },
                },
            },
        });

        return client;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Já existe um cliente com este CPF ou CNPJ.");
            }

            throw new Error(error.message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Erro ao deletar cliente.");
    }
}
