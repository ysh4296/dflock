import { calculateTotalGold, monteCarloSimulation } from "@/lib/calculator";
import {
  mileageLock1,
  mileageLock2,
  normalLock1,
  normalLock2,
} from "@/mock/itemData";

import { goldData } from "@/mock/goldData";

const TRIES = 10000;

export const fetchChartData = async () => {
  const data = await monteCarloSimulation(normalLock1, TRIES, 1000);
  const data2 = await monteCarloSimulation(normalLock2, TRIES, 18);
  const data3 = await monteCarloSimulation(mileageLock1, TRIES, 1000);
  const data4 = await monteCarloSimulation(mileageLock2, TRIES, 18);

  const totalData = [...data, ...data2, ...data3, ...data4];

  const goldDatas = calculateTotalGold(totalData, goldData);

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
  const chartData = sortedGolds.map(({ gold, frequency }) => {
    cumulativeFrequency += frequency;
    return {
      percentile: (cumulativeFrequency / totalFrequency) * 100, // 누적 백분율
      totalGold: gold, // 해당 백분위수에서 얻을 수 있는 골드량
    };
  });

  return chartData;
};
