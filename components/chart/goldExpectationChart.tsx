"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChartArea from "./chartArea";

const GoldExpectationChart = () => {
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
      <ChartArea />
    </>
  );
};

export default GoldExpectationChart;
