"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInputStore, useItemSelectStore } from "@/store/form";
import { useItemStore } from "@/store/item";
import { makePartition, poissonProbability } from "@/utils/calculator";
import { getLockType } from "@/utils/getLockType";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import ItemList from "../../list/itemList";

/**
 * @todo
 * 실제 데이터 기반의 푸아송 차트 그리기
 * 자물쇠 타입별 서로다른 확률적용하기
 * 계산하기 버튼을 눌렀을때 계산하기
 */
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
          probability: probabilitySum < 0 ? 0 : probabilitySum,
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
