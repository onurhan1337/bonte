import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const donateFormState = create<DialogState>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set(() => ({ isOpen })),
}));