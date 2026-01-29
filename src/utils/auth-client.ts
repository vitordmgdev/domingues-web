import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import roles, { ac } from "./permissions";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        adminClient({
            ac,
            roles,
        }),
    ],
    basePath: "/auth",
});
