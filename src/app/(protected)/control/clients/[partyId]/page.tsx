"use client";

import { useParams } from "next/navigation";

const ClientDetailsPage = () => {
    const { partyId } = useParams();

    return (
        <div>
            <h1 className="text-xl font-sans">Detalhes do cliente</h1>
            <p className="text-muted-foreground">{partyId}</p>
        </div>
    );
};

export default ClientDetailsPage;
