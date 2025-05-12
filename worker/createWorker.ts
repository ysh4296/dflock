"use client";

import { calculateTotalGold, monteCarloSimulation } from "@/lib/calculator";
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

  let locks;

  const { normalLocks, mileageLocks } = getLockType(
    lockType,
    lockCount,
    Number(boosterType)
  );
  // normal
  const data1 = monteCarloSimulation(normalLock1, TRIES, normalLocks);
  const data2 = monteCarloSimulation(normalLock2, TRIES, normalLocks);
  // boost
  const data3 = monteCarloSimulation(mileageLock1, TRIES, mileageLocks);
  const data4 = monteCarloSimulation(mileageLock2, TRIES, mileageLocks);

  locks = [...data1, ...data2, ...data3, ...data4];

  const totalData = [...locks];
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
