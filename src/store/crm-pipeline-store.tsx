import { create } from "zustand/react";

interface PipelineStore {
    isCreatingStageItem: string | null;
    setIsCreatingStageItem: (id: string | null) => void;
}

export const usePipelineStore = create<PipelineStore>()((set) => ({
    isCreatingStageItem: null,
    setIsCreatingStageItem: (id) => set({ isCreatingStageItem: id }),
}));
