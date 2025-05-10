"use client";

import GoldExpectationChart from "@/components/chart/goldExpectationChart";
import Poisson from "@/components/chart/poisson";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosInstance from "@/utils/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const Tab = () => {
  /**
   * @todo
   * improve fetcher & query
   * ** add querykey factory
   */
  const fetchItems = async () => {
    const { data } = await axiosInstance.get("items");
    return data;
  };

  const { data } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  return (
    <Tabs defaultValue="distribution" className="p-2 h-full w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="distribution">골드 획득량 예측</TabsTrigger>
        <TabsTrigger value="items">아이템 확률</TabsTrigger>
      </TabsList>
      <TabsContent value="distribution" className="w-full h-full">
        <GoldExpectationChart />
      </TabsContent>
      <TabsContent value="items" className="w-full h-full">
        <Poisson />
      </TabsContent>
    </Tabs>
  );
};

const SuspenseTab = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Tab />
  </Suspense>
);

export default SuspenseTab;
