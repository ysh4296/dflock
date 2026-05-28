import axiosInstance from "@/utils/axios";
import {
  type UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ItemQueryKey } from "./queryKey";

const isMock = process.env.NEXT_PUBLIC_MOCK === "true";

const fetchItemList = async (): Promise<ItemListGetResponse> => {
  if (isMock) {
    const { mockItemList } = await import("./mockData");
    return mockItemList;
  }
  if (typeof window === "undefined") {
    return {
      firstItems: [],
      secondItems: [],
      mileageFirstItems: [],
      mileageSecondItems: [],
    };
  }
  const { data } = await axiosInstance.get("items");
  return data;
};

const fetchItemMetadata = async (): Promise<ItemMetadataGetResponse> => {
  if (isMock) {
    const { mockItemMetadata } = await import("./mockData");
    return mockItemMetadata;
  }
  if (typeof window === "undefined") return [];
  const { data } = await axiosInstance.get("items/metadata");
  return data;
};

export const useItemList = (
  options?: UseSuspenseQueryOptions<ItemListGetResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ItemQueryKey.list(),
    queryFn: fetchItemList,
    ...options,
  });
};

export const useItemMetadata = (
  options?: UseSuspenseQueryOptions<ItemMetadataGetResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ItemQueryKey.metadata(),
    queryFn: fetchItemMetadata,
    ...options,
  });
};
