"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { normalLock1 } from "@/mock/itemData";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { poissonProbability } from "@/lib/calculator";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import ItemList from "../list/itemList";

const TRIES = 1000;

/**
 * @todo
 * 실제 데이터 기반의 푸아송 차트 그리기
 */
const Poisson = () => {
  const chartData: any[] | undefined = [];
  for (let i = 0; i <= 10; i++) {
    chartData.push({
      num: String(i),
      probability: poissonProbability(
        (normalLock1[0].probability / 100) * TRIES,
        i,
      ),
    });
  }

  const chartConfig = {
    probability: {
      label: "probability",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div
      className="flex flex-row w-full"
      style={{ height: "calc(100% - 40px)" }}
    >
      <div className="flex flex-col h-full w-full">
        <CardHeader>
          <CardTitle>아이템 획득량 예측</CardTitle>
          <CardDescription>
            자물쇠 사용에 따른 아이템 획득 개수를 푸아송 분포로 나타낸
            확률입니다.
          </CardDescription>
        </CardHeader>
        <ChartContainer
          config={chartConfig}
          className="justify-center items-center mt-16"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            height={72}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="num" tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="probability"
              type="step"
              fill="var(--color-lock)"
              fillOpacity={0.4}
              stroke="var(--color-lock)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <ItemList />
    </div>
  );
};

export default Poisson;
