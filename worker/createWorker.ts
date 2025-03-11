// src/worker/chartWorker.js

import { calculateTotalGold, monteCarloSimulation } from "@/lib/calculator";
import { goldData } from "@/mock/goldData";

onmessage = function (e) {
  const { normalLock1, normalLock2, mileageLock1, mileageLock2, TRIES } =
    e.data;

  // Web Worker에서 monteCarloSimulation을 병렬로 실행
  const data = monteCarloSimulation(normalLock1, TRIES, 1000);
  const data2 = monteCarloSimulation(normalLock2, TRIES, 18);
  const data3 = monteCarloSimulation(mileageLock1, TRIES, 1000);
  const data4 = monteCarloSimulation(mileageLock2, TRIES, 18);

  const totalData = [...data, ...data2, ...data3, ...data4];

  // 금액 계산
  const goldDatas = calculateTotalGold(totalData, goldData);

  const frequencyMap: Record<number, number> = {};
  goldDatas.forEach(({ totalGold }) => {
    frequencyMap[totalGold] = (frequencyMap[totalGold] || 0) + 1;
  });

  // 정렬 및 누적 데이터 생성
  const sortedGolds = Object.entries(frequencyMap)
    .map(([gold, frequency]) => ({ gold: Number(gold), frequency }))
    .sort((a, b) => a.gold - b.gold);

  const totalFrequency = sortedGolds.reduce(
    (sum, { frequency }) => sum + frequency,
    0
  );

  let cumulativeFrequency = 0;
  const chartData = sortedGolds.map(({ gold, frequency }) => {
    cumulativeFrequency += frequency;
    return {
      percentile: (cumulativeFrequency / totalFrequency) * 100,
      totalGold: gold,
    };
  });

  postMessage(chartData); // 계산 결과를 메인 스레드로 전달
};
