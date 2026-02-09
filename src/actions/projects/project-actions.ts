"use server";

import { generatePublicId } from "@/lib/nanoid";
import prisma from "@/lib/prisma";
import { ProjectSchemas } from "@/schemas/project-schemas";
import z from "zod";

export async function createProject(
    data: z.infer<typeof ProjectSchemas.create>,
) {
    const { partyPublicId, ...rest } = ProjectSchemas.create.parse(data);

    try {
        const project = await prisma.project.create({
            data: {
                publicId: generatePublicId(),
                party: {
                    connect: {
                        publicId: partyPublicId,
                    },
                },
                ...rest,
            },
        });

        return project;
    } catch (error) {
        throw error;
    }
}

export async function listProjectsByPartyPublicId(partyPublicId: string) {
    try {
        const projects = await prisma.project.findMany({
            where: {
                party: {
                    publicId: partyPublicId,
                },
            },
        });

        return projects;
    } catch (error) {
        throw error;
    }
}

export async function deleteProject(projectPrivateId: string) {
    try {
        const project = await prisma.project.delete({
            where: {
                privateId: projectPrivateId,
            },
        });

        return project;
    } catch (error) {
        throw error;
    }
}
