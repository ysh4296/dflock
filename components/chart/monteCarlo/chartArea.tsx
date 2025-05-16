"use client";

import { useGoldChartStore } from "@/store/chart";
import { formatGold } from "@/utils/formatGlod";
import { Area, AreaChart, Tooltip, XAxis } from "recharts";
import { type ChartConfig, ChartContainer } from "../../ui/chart";
import { Spinner } from "../../ui/spinner";

const chartConfig = {
  totalGold: {
    label: "Total Gold",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ChartArea = () => {
  const { loading, chartData } = useGoldChartStore();

  if (loading === undefined)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          자물쇠의 종류와 개수를 설정하여 골드 획득량을 시뮬레이션 해보세요.
        </p>
      </div>
    );

  if (loading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="medium" className="m-auto" />
      </div>
    );

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart data={chartData}>
        <XAxis
          dataKey="percentile"
          tickFormatter={(tick) => `${tick}%`}
          tickMargin={10}
          interval={0}
          scale="point"
          domain={[0, 100]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <Tooltip
          labelFormatter={(label) => `상위 ${Number(100 - label).toFixed(1)}%`}
          formatter={(value) => [`${formatGold(Number(value))} 골드`]}
        />
        <Area
          type="natural"
          dataKey="totalGold"
          stroke="#8884d8"
          fill="rgba(136, 132, 216, 0.5)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ChartArea;
