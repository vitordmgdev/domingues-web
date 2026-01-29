import roles, { ac } from "@/utils/permissions";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import prisma from "./prisma";

export const auth = betterAuth({
    baseURL: "http://localhost:3000",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
        debugLogs: true,
    }),
    plugins: [
        admin({
            ac,
            roles,
        }),
    ],
    socialProviders: {
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            accessType: "offline",
            prompt: "select_account consent",
        },
    },
});
