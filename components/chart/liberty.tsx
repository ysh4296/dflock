import { type ChartConfig, ChartContainer } from "../ui/chart";

const Liberty = () => {
  const chartConfig = {
    probability: {
      label: "probability",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer className="w-100" config={chartConfig}>
      <p>해방의 열쇄 그래프</p>
    </ChartContainer>
  );
};

export default Liberty;
