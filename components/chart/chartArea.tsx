// src/components/ChartArea.js

"use client";

import {
  mileageLock1,
  mileageLock2,
  normalLock1,
  normalLock2,
} from "@/mock/itemData";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const TRIES = 10000;

  useEffect(() => {
    // Web Worker 생성
    const worker = new Worker(
      new URL("@/worker/createWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );

    // Worker에 데이터 전달
    worker.postMessage({
      normalLock1,
      normalLock2,
      mileageLock1,
      mileageLock2,
      TRIES,
    });

    // Worker로부터 데이터 받기
    worker.onmessage = (event) => {
      setChartData(event.data); // chartData 업데이트
      setLoading(false); // 로딩 상태 업데이트
      worker.terminate(); // 작업 완료 후 Worker 종료
    };

    // 에러 처리
    worker.onerror = (error) => {
      console.error("Worker Error:", error);
      setLoading(false);
      worker.terminate();
    };

    return () => {
      worker.terminate(); // 컴포넌트 언마운트 시 Worker 종료
    };
  }, []);

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
