"use client";

import { useItemList, useItemMetadata } from "@/api/item/queryFn";
import GoldExpectationChart from "@/components/chart/monteCarlo/goldExpectationChart";
import Poisson from "@/components/chart/poisson/poisson";
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type TabType, useInputStore } from "@/store/form";
import { useItemStore } from "@/store/item";
import { Suspense, useEffect } from "react";

const MainTab = () => {
  const { setItemList, setItemMetadata } = useItemStore();
  const { tabType, setTabType } = useInputStore();
  const { data: ItemList } = useItemList();
  const { data: ItemMetadata } = useItemMetadata();

  useEffect(() => {
    setItemList(ItemList);
    setItemMetadata(ItemMetadata.sort((a, b) => b.unitPrice - a.unitPrice));
  }, [ItemList, ItemMetadata]);

  return (
    <Tabs
      className="p-2 h-full w-full"
      value={tabType}
      onValueChange={(value) => setTabType(value as TabType)}
    >
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

const SuspenseMainTab = () => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
          <Spinner size="large" />
          <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
        </div>
      }
    >
      <MainTab />
    </Suspense>
  </ErrorBoundary>
);

export default SuspenseMainTab;
