import axiosInstance from "@/utils/axios";
import {
  type UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ItemQueryKey } from "./queryKey";

const fetchItemList = async (): Promise<ItemListGetResponse> => {
  if (typeof window === "undefined") {
    // 서버 환경에서는 실행되지 않도록 처리
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
  if (typeof window === "undefined") {
    // 서버 환경에서는 실행되지 않도록 처리
    return [];
  }
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
