import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useInputStore, useItemSelectStore } from "@/store/form";
import { useItemStore } from "@/store/item";
import { makePartition, poissonProbability } from "@/utils/calculator";
import { getLockType } from "@/utils/getLockType";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import ItemList from "../../list/itemList";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { probability, cumulativeProbability } = payload[0].payload;
    return (
      <Card className="p-4 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200">
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-800">
            <span className="text-lg font-semibold">
              {label}개 {Number(label) === 10 && "이상"} 획득 확률:
            </span>
            <span className="text-xl font-bold text-blue-600">
              {probability.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <span className="text-lg font-semibold">
              {label}개 이하 획득 확률:
            </span>
            <span className="text-xl font-bold text-green-600">
              {cumulativeProbability.toFixed(1)}%
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }
  return null;
};

const Poisson = () => {
  const { lockType, lockCount, boosterType } = useInputStore();
  const [chartData, setChartData] = useState<any[] | undefined>(undefined);
  const { selectItem } = useItemSelectStore();
  const { itemList } = useItemStore();

  useEffect(() => {
    if (selectItem !== undefined && lockCount !== undefined) {
      const data = [];
      const { normalLocks, mileageLocks } = getLockType(
        lockType,
        lockCount,
        Number(boosterType),
      );
      let cumulativeProbability = 0;

      for (let i = 0; i <= 10; i++) {
        const partition = makePartition(i, 4);

        let probabilitySum = 0;
        const probability = [
          (itemList.firstItems.find((i) => i.name === selectItem.itemName)
            ?.probability ?? 0) / 100,
          (itemList.secondItems.find((i) => i.name === selectItem.itemName)
            ?.probability ?? 0) / 100,
          (itemList.mileageFirstItems.find(
            (i) => i.name === selectItem.itemName,
          )?.probability ?? 0) / 100,
          (itemList.mileageSecondItems.find(
            (i) => i.name === selectItem.itemName,
          )?.probability ?? 0) / 100,
        ];
        for (let j = 0; j < partition.length; j++) {
          probabilitySum +=
            Number(
              poissonProbability(
                probability[0] * normalLocks,
                partition[j][0],
              ).toFixed(3),
            ) *
            Number(
              poissonProbability(
                probability[1] * normalLocks,
                partition[j][1],
              ).toFixed(3),
            ) *
            Number(
              poissonProbability(
                probability[2] * mileageLocks,
                partition[j][2],
              ).toFixed(3),
            ) *
            Number(
              poissonProbability(
                probability[3] * mileageLocks,
                partition[j][3],
              ).toFixed(3),
            );
        }

        if (i === 10) {
          probabilitySum = 1 - cumulativeProbability; // 10개 이상 획득할 확률
        } else {
          cumulativeProbability += probabilitySum; // 누적 확률 계산
        }
        data.push({
          num: String(i),
          probability: probabilitySum < 0 ? 0 : probabilitySum * 100,
          cumulativeProbability: cumulativeProbability * 100,
        });
      }

      setChartData(data);
    }
  }, [selectItem, lockCount, lockType, boosterType]);

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
      <div className="flex flex-col h-full w-full justify-between">
        <CardHeader>
          <CardTitle>아이템 획득량 예측</CardTitle>
          <CardDescription>
            자물쇠 사용에 따른 아이템 획득 개수를 푸아송 분포로 나타낸
            확률입니다.
          </CardDescription>
        </CardHeader>
        {selectItem && lockCount ? (
          <ChartContainer
            config={chartConfig}
            className="justify-center items-end"
          >
            <AreaChart
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
              <Tooltip content={<CustomTooltip />} />
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
