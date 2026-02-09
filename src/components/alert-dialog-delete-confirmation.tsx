import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

export const AlertDialogDeleteConfirmation = ({
    children,
    onClick,
    title,
    description,
}: {
    children?: React.ReactNode;
    onClick?: () => void;
    title: string;
    description: string;
}) => {
    return (
        <AlertDialog>
            {children && (
                <AlertDialogTrigger asChild>
                    {React.isValidElement(children)
                        ? React.cloneElement(
                              children as React.ReactElement<any>,
                              {
                                  onSelect: (e: Event) => {
                                      e.preventDefault();
                                  },
                              },
                          )
                        : children}
                </AlertDialogTrigger>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.();
                        }}
                    >
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
