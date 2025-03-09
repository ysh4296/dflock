"use client";

import { calculateTotalGold, monteCarloSimulation } from "@/lib/calculator";
import { goldData } from "@/mock/goldData";
import { normalLock1 } from "@/mock/itemData";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const TRIES = 10000;

const GoldExpectationChart = () => {
  const data = monteCarloSimulation(normalLock1, TRIES, 1000);
  const goldDatas = calculateTotalGold(data, goldData);

  const frequencyMap: Record<number, number> = {};
  goldDatas.forEach(({ totalGold }) => {
    frequencyMap[totalGold] = (frequencyMap[totalGold] || 0) + 1;
  });

  // 확률을 백분율로 변환하여 숫자형 데이터로 처리
  const chartData = Object.keys(frequencyMap).map((gold) => ({
    totalGold: Number(gold),
    frequency: (frequencyMap[Number(gold)] / TRIES) * 100, // 백분율로 변환
  }));

  const chartConfig = {
    frequency: {
      label: "Frequency (%)",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <CardHeader>
        <CardTitle>골드 획득 시뮬레이션</CardTitle>
        <CardDescription>
          100회의 자물쇠 개방으로 10000번의 시뮬레이션을 시도했을때 획득
          골드량의 확률 분포입니다.
        </CardDescription>
      </CardHeader>
      <ChartContainer className="w-100" config={chartConfig}>
        <AreaChart data={chartData}>
          <XAxis
            dataKey="totalGold"
            label={{
              value: "Total Gold",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Frequency (%)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={[0, "dataMax"]} // Y축의 최대값을 데이터 최대값에 맞춤
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="frequency"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

export default GoldExpectationChart;
