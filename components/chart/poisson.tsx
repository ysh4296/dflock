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
    <>
      <CardHeader>
        <CardTitle>아이템 획득량 예측</CardTitle>
        <CardDescription>
          자물쇠 1000개를 사용했을 때 이달의 아이템 획득 개수별 확률 분포입니다.
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="num" tickFormatter={(value) => value.slice(0, 3)} />
          <XAxis
            dataKey="probability"
            tickFormatter={(value) => value.slice(0, 3)}
          />
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
    </>
  );
};

export default Poisson;
