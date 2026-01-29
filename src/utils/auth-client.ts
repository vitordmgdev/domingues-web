import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import roles, { ac } from "./permissions";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        adminClient({
            ac,
            roles,
        }),
    ],
});
