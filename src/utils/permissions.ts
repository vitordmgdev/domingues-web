import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements,
    customer: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

const owner = ac.newRole({
    customer: ["create", "read", "update", "delete"],
    ...adminAc.statements,
});

const admin = ac.newRole({
    customer: ["create", "read", "update"],
    ...adminAc.statements,
});

const user = ac.newRole({
    customer: ["read"],
    ...adminAc.statements,
});

const roles = {
    owner,
    admin,
    user,
};

export default roles;