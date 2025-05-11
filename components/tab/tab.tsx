"use client";

import { useItemList, useItemMetadata } from "@/api/item/queryFn";
import GoldExpectationChart from "@/components/chart/goldExpectationChart";
import Poisson from "@/components/chart/poisson";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

const Tab = () => {
  /**
   * @todo
   * modulate fetcher & query
   * add queryKey factory
   */
  const { data: ItemList } = useItemList();
  const { data: ItemMetadata } = useItemMetadata();

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

/**
 * @todo
 * more reasonable fallback ui
 */
const SuspenseTab = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Tab />
  </Suspense>
);

export default SuspenseTab;
