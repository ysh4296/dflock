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
      <p>hello</p>
    </ChartContainer>
  );
};

export default Liberty;
