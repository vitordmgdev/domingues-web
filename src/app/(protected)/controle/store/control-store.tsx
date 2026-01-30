import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";

interface SidebarStore {
    sidebarIsOpen: boolean;
    setSidebarIsOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
    persist(
        (set) => ({
            sidebarIsOpen: false,
            setSidebarIsOpen: (open: boolean) => set({ sidebarIsOpen: open }),
        }),
        {
            name: "sidebar",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                sidebarIsOpen: state.sidebarIsOpen,
            }),
        },
    ),
);
