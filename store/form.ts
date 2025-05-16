import { create } from "zustand";

export type TabType = "distribution" | "items";

type LockType = "normal" | "mileage" | "booster_mileage";

interface InputState {
  tabType: TabType;
  lockType: LockType;
  boosterType: string;
  lockCount?: number;
  compareMode: boolean;
  setTabType: (value: TabType) => void;
  setLockType: (value: LockType) => void;
  setBoosterType: (value: string) => void;
  setLockCount: (value?: number) => void;
  setCompareMode: (value: boolean) => void;
}

export const useInputStore = create<InputState>((set) => ({
  tabType: "distribution",
  lockType: "normal",
  boosterType: "",
  lockCount: undefined,
  compareMode: false,
  setTabType: (value) => set({ tabType: value }),
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
