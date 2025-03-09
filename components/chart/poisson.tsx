"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { normalLock1 } from "@/mock/itemData";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { poissonProbability } from "@/lib/calculator";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
        (normalLock1[0].probability / 100) * 1000,
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
    <Card className="flex grow">
      <CardHeader>
        <CardTitle>Area Chart - step</CardTitle>
        <CardDescription>
          이달의 아이템 획득 개수별 확률 분포입니다.
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
          <XAxis
            dataKey="num"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <XAxis
            dataKey="probability"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
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
    </Card>
  );
};

export default Poisson;
