import { create } from "zustand";

interface InputState {
  lockType: string; // normal | mileage | booster_mileage
  boosterType: string;
  lockCount?: number;
  compareMode: boolean;
  setLockType: (value: string) => void;
  setBoosterType: (value: string) => void;
  setLockCount: (value?: number) => void;
  setCompareMode: (value: boolean) => void;
}

export const useInputStore = create<InputState>((set) => ({
  lockType: "",
  boosterType: "",
  lockCount: undefined,
  compareMode: false,
  setLockType: (value) => set({ lockType: value }),
  setBoosterType: (value) => set({ boosterType: value }),
  setLockCount: (value) => set({ lockCount: value }),
  setCompareMode: (value) => set({ compareMode: value }),
}));

interface SelectState {
  selectItem?: ItemMeta;
  setSelectItem: (item: ItemMeta) => void;
}

export const useItemSelectStore = create<SelectState>((set) => ({
  selectItem: undefined,
  setSelectItem: (value) => set({ selectItem: value }),
}));
