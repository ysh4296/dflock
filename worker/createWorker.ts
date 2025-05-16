"use client";

import { calculateTotalGold, monteCarloSimulation } from "@/utils/calculator";
import { getLockType } from "@/utils/getLockType";

onmessage = function (e) {
  const {
    lockType,
    lockCount,
    boosterType,
    itemMetadata,
    normalLock1,
    normalLock2,
    mileageLock1,
    mileageLock2,
    TRIES,
  } = e.data;

  const { normalLocks, mileageLocks } = getLockType(
    lockType,
    lockCount,
    Number(boosterType)
  );

  const totalData = monteCarloSimulation(
    [normalLock1, normalLock2, mileageLock1, mileageLock2],
    TRIES,
    [normalLocks, normalLocks, mileageLocks, mileageLocks]
  );

  // 금액 계산
  const goldDataList = calculateTotalGold(totalData, itemMetadata);

  const frequencyMap: Record<number, number> = {};
  goldDataList.forEach(({ totalGold }) => {
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
