import GoldExpectationChart from "@/components/chart/goldExpectationChart";
import Poisson from "@/components/chart/poisson";
import SimulationSettingForm from "@/components/form/simulationSettingForm";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";

export default function Home() {
  return (
    <>
      <header>
        <div className="flex flex-row gap-2">
          <Lock className="h-8 w-8" />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            던락
          </h1>
          <p className="text-sm text-muted-foreground self-center">
            던전앤 파이터 봉인된 자물쇠 시뮬레이터
          </p>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          던전 앤 파이터의 확률형 아이템 "봉인된 자물쇠" 와 "해방된 열쇠"사용시
          얻을 수 있는 아이템 및 골드를 예측하고 플레이어들의 획득 결과를 몬테
          카를로 시뮬레이션과 포아송 분포를 활용하여 예측합니다.
        </p>
      </header>
      <main className="flex flex-row gap-4">
        <SimulationSettingForm />

        <Card className="flex grow">
          <Tabs defaultValue="distribution">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="distribution">골드 분포</TabsTrigger>
              <TabsTrigger value="items">아이템 확률</TabsTrigger>
              <TabsTrigger value="liberation">해방의 흔적</TabsTrigger>
            </TabsList>
            <TabsContent value="distribution" className="space-y-4">
              <GoldExpectationChart />
            </TabsContent>
            <TabsContent value="items" className="space-y-4">
              <Poisson />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <footer />
    </>
  );
}
