"use server";

import { generatePublicId } from "@/lib/nanoid";
import prisma from "@/lib/prisma";
import { PartyTypeStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { RegisterClientType } from "../../../schemas/client-schemas";

export async function createPartyClient(data: RegisterClientType) {
    try {
        const { contact, address, ...partyData } = data;

        const client = await prisma.party.create({
            data: {
                ...partyData,
                publicId: generatePublicId(),
                cpf: partyData.cpf || null,
                cnpj: partyData.cnpj || null,
                fullName: `${data.firstName} ${data.lastName}`,
                partyTypes: {
                    create: {
                        type: "CLIENTE",
                        status: PartyTypeStatus.NOVO,
                        publicId: generatePublicId(),
                    },
                },
            },
        });

        if (contact?.phone) {
            await prisma.partyPhone.create({
                data: {
                    publicId: generatePublicId(),
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
                    publicId: generatePublicId(),
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

export async function listPartyClients() {
    try {
        return await prisma.party.findMany({
            where: {
                partyTypes: {
                    some: {
                        type: "CLIENTE",
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                partyTypes: {
                    where: {
                        type: "CLIENTE",
                    },
                },
                partyPhones: {
                    where: {
                        isPrimary: true,
                    },
                },
                partyAddresses: {
                    where: {
                        isPrimary: true,
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
}

export async function getClientByPartyPublicId(partyPublicId: string) {
    try {
        const client = await prisma.party.findUnique({
            where: {
                publicId: partyPublicId,
            },
            include: {
                partyTypes: true,
                partyAddresses: true,
                partyPhones: true,
                projects: true,
            },
        });

        return client;
    } catch (error) {
        throw new Error("Erro ao buscar cliente.");
    }
}

export async function deleteClientAction(publicId: string) {
    try {
        const client = await prisma.party.deleteMany({
            where: {
                publicId,
                partyTypes: {
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
