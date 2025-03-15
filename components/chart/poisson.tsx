"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { poissonProbability } from "@/lib/calculator";
import { useInputStore, useItemSelectStore } from "@/store/form";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import ItemList from "../list/itemList";

/**
 * @todo
 * 실제 데이터 기반의 푸아송 차트 그리기
 */
const Poisson = () => {
  const { lockCount } = useInputStore();

  const [chartData, setChartData] = useState<any[] | undefined>(undefined);

  const { item } = useItemSelectStore();

  useEffect(() => {
    if (item !== undefined && lockCount !== undefined) {
      const data = [];
      let cumulativeProbability = 0;

      for (let i = 0; i <= 10; i++) {
        let probability = poissonProbability(
          (item.probability / 100) * lockCount,
          i,
        );

        if (i === 10) {
          probability = 1 - cumulativeProbability; // 10개 이상 획득할 확률
        } else {
          cumulativeProbability += probability; // 누적 확률 계산
        }

        data.push({
          num: String(i),
          probability,
        });
      }

      setChartData(data);
    }
  }, [item, lockCount]);

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
        {item ? (
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
              <XAxis
                dataKey="num"
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
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              자물쇠의 종류와 개수를 설정하여 아이템 획득 가능성을 시뮬레이션
              해보세요.
            </p>
          </div>
        )}
      </div>
      <ItemList />
    </div>
  );
};

export default Poisson;
