"use client";

import { useGoldChartStore } from "@/store/chart";
import { Area, AreaChart, Tooltip, XAxis } from "recharts";
import { type ChartConfig, ChartContainer } from "../ui/chart";
import { Spinner } from "../ui/spinner";

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
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        자물쇠의 종류와 개수를 설정하여 골드 획득량을 시뮬레이션 해보세요.
      </p>
    );

  if (loading) return <Spinner size="medium" className="m-auto" />;

  return (
    <ChartContainer config={chartConfig} className="h-fit">
      <AreaChart data={chartData}>
        <XAxis
          dataKey="percentile"
          tickFormatter={(tick) => `${tick}%`}
          tickMargin={10}
          scale="linear"
          domain={[0, 100]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
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
  );
};

export default ChartArea;
