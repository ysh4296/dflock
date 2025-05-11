import axiosInstance from "@/utils/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ItemQueryKey } from "./queryKey";

const fetchItemList = async (): Promise<ItemListGetResponse[]> => {
  if (typeof window === "undefined") {
    // 서버 환경에서는 실행되지 않도록 처리
    return [];
  }
  const { data } = await axiosInstance.get("items");
  return data;
};

const fetchItemMetadata = async (): Promise<ItemMetadataGetResponse[]> => {
  if (typeof window === "undefined") {
    // 서버 환경에서는 실행되지 않도록 처리
    return [];
  }
  const { data } = await axiosInstance.get("items/metadata");
  return data;
};

export const useItemList = () => {
  return useSuspenseQuery({
    queryKey: ItemQueryKey.list(),
    queryFn: fetchItemList,
  });
};

export const useItemMetadata = () => {
  return useSuspenseQuery({
    queryKey: ItemQueryKey.metadata(),
    queryFn: fetchItemMetadata,
  });
};
