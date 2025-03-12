"use client";

import { calculateTotalGold, monteCarloSimulation } from "@/lib/calculator";
import { goldData } from "@/mock/goldData";

const lockType1 = (
  e: MessageEvent<any>,
  locks: number,
  boostNumber: number
): SimulationTrial[] => {
  const { normalLock1, normalLock2, TRIES } = e.data;

  const boosts = locks / boostNumber;
  const normals = locks - boosts;

  // normal
  const data1 = monteCarloSimulation(normalLock1, TRIES, normals);
  const data2 = monteCarloSimulation(normalLock2, TRIES, normals);
  // boost
  let data3 = monteCarloSimulation(normalLock1, TRIES, boosts);
  let data4 = monteCarloSimulation(normalLock2, TRIES, boosts);

  data3 = [...data3, ...data3];
  data4 = [...data4, ...data4];

  return [...data1, ...data2, ...data3, ...data4];
};

const lockType2 = (
  e: MessageEvent<any>,
  locks: number,
  boostNumber: number
): SimulationTrial[] => {
  const { normalLock1, normalLock2, mileageLock1, mileageLock2, TRIES } =
    e.data;

  const boosts = locks / boostNumber;
  const normals = locks - boosts;

  // normal
  const data1 = monteCarloSimulation(normalLock1, TRIES, normals);
  const data2 = monteCarloSimulation(normalLock2, TRIES, normals);
  // boost
  let data3 = monteCarloSimulation(mileageLock1, TRIES, boosts);
  let data4 = monteCarloSimulation(mileageLock2, TRIES, boosts);

  data3 = [...data3, ...data3];
  data4 = [...data4, ...data4];

  return [...data1, ...data2, ...data3, ...data4];
};

const lockType3 = (
  e: MessageEvent<any>,
  locks: number,
  boostNumber: number
): SimulationTrial[] => {
  const { mileageLock1, mileageLock2, TRIES } = e.data;

  const boosts = locks / boostNumber;
  const normals = locks - boosts;

  // normal
  const data1 = monteCarloSimulation(mileageLock1, TRIES, normals);
  const data2 = monteCarloSimulation(mileageLock2, TRIES, normals);
  // boost
  let data3 = monteCarloSimulation(mileageLock1, TRIES, boosts);
  let data4 = monteCarloSimulation(mileageLock2, TRIES, boosts);

  data3 = [...data3, ...data3];
  data4 = [...data4, ...data4];

  return [...data1, ...data2, ...data3, ...data4];
};

onmessage = function (e) {
  const { lockType, lockCount, boosterType } = e.data;

  let locks;

  // Web Worker에서 monteCarloSimulation을 병렬로 실행
  if (lockType === "normal") {
    locks = lockType1(e, lockCount, Number(boosterType));
  } else if (lockType === "mileage") {
    locks = lockType2(e, lockCount, Number(boosterType));
  } else {
    locks = lockType3(e, lockCount, Number(boosterType));
  }

  const totalData = [...locks];

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
