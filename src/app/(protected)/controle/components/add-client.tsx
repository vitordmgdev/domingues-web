"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import z from "zod";

export const AddClient = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>{children}</DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Adicionar cliente</DrawerTitle>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar cliente</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export const registerClientSchema = z.object({
    name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(120, "Nome deve ter menos de 120 caracteres"),
    
})