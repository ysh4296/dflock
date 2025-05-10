import SimulationSettingForm from "@/components/form/simulationSettingForm";
import Tab from "@/components/tab/tab";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex flex-col h-full p-8">
        <header className="mb-8">
          <div className="flex flex-row gap-2">
            <Lock className="h-8 w-8" />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              던락
            </h1>
            <p className="text-sm text-muted-foreground self-center">
              던전앤 파이터 봉인된 자물쇠 시뮬레이터
            </p>
          </div>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-wrap">
            던전 앤 파이터의 확률형 아이템 "봉인된 자물쇠" 와 "해방된 열쇠" 사용
            시 얻을 수 있는 아이템 및 골드를 예측하고
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-wrap">
            플레이어들의 획득 결과를 몬테 카를로 시뮬레이션과 푸아송 분포를
            활용하여 예측합니다.
          </p>
        </header>
        {/* ⬇️ flex-grow와 min-h-0 추가 */}
        <main className="flex flex-row gap-4 grow min-h-0">
          <SimulationSettingForm />

          <Card className="flex w-full grow p-0 h-full">
            <Tab />
          </Card>
        </main>
        <footer />
      </div>
    </div>
  );
}
