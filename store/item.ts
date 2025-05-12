import { create } from "zustand";

interface ItemState {
  itemList: ItemListGetResponse;
  itemMetadata: ItemMetadataGetResponse;
  setItemList: (value: ItemListGetResponse) => void;
  setItemMetadata: (value: ItemMetadataGetResponse) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  itemList: {
    firstItems: [],
    secondItems: [],
    mileageFirstItems: [],
    mileageSecondItems: [],
  },
  itemMetadata: [],
  setItemList: (value: ItemListGetResponse) => {
    set({ itemList: value });
  },
  setItemMetadata: (value: ItemMetadataGetResponse) => {
    set({ itemMetadata: value });
  },
}));
