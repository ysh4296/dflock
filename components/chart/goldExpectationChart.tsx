"use client";

import { calculateTotalGold, monteCarloSimulation } from "@/lib/calculator";
import { goldData } from "@/mock/goldData";
import { normalLock1 } from "@/mock/itemData";
import { Area, AreaChart, Tooltip, XAxis } from "recharts";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const TRIES = 10000;

const GoldExpectationChart = () => {
  const data = monteCarloSimulation(normalLock1, TRIES, 100);
  const goldDatas = calculateTotalGold(data, goldData);

  const frequencyMap: Record<number, number> = {};
  goldDatas.forEach(({ totalGold }) => {
    frequencyMap[totalGold] = (frequencyMap[totalGold] || 0) + 1;
  });

  // totalGold 값을 오름차순으로 정렬
  const sortedGolds = Object.entries(frequencyMap)
    .map(([gold, frequency]) => ({ gold: Number(gold), frequency }))
    .sort((a, b) => a.gold - b.gold);

  // 전체 빈도수 계산
  const totalFrequency = sortedGolds.reduce(
    (sum, { frequency }) => sum + frequency,
    0,
  );

  // 누적 분포 데이터 생성
  let cumulativeFrequency = 0;
  const chartData: { percentile: number; totalGold: number }[] =
    sortedGolds.map(({ gold, frequency }) => {
      cumulativeFrequency += frequency;
      return {
        percentile: (cumulativeFrequency / totalFrequency) * 100, // 누적 백분율
        totalGold: gold, // 해당 백분위수에서 얻을 수 있는 골드량
      };
    });

  const chartConfig = {
    totalGold: {
      label: "Total Gold",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <CardHeader>
        <CardTitle>골드 획득량 예측</CardTitle>
        <CardDescription>
          자물쇠 1000개 사용에 따른 골드획득 가능성을 시행횟수 10000의 몬테
          카를로 시뮬레이션을 통해 예측한 백분위수 기반의 누적 분포
          그래프입니다.
          <br />
          X축: 누적 확률 (%) | Y축: 획득 골드량
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig}>
        <AreaChart data={chartData}>
          <XAxis
            dataKey="percentile"
            tickFormatter={(tick) => `${tick}%`}
            domain={[0, 100]}
          />
          <Tooltip />
          <Area
            type="natural"
            dataKey="totalGold"
            stroke="#8884d8"
            fill="rgba(136, 132, 216, 0.5)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

export default GoldExpectationChart;
