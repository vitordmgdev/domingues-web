"use server";

import prisma from "@/lib/prisma";

const ClientsPage = async () => {
    const clients = await prisma.party.findMany();

    return <div>{JSON.stringify(clients)}</div>;
};

export default ClientsPage;
