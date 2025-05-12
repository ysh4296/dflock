/**
 * @function 푸아송_분포_계산기
 * @param lambda 기대값
 * @param k 사건 발생 횟수
 * @returns 푸아송 분포 확률
 */
export function poissonProbability(lambda: number, k: number) {
  return (lambda ** k * Math.exp(-lambda)) / factorial(k);
}

/**
 * @function 혼합형_푸아송_분포_계산기
 * @param counts 시행횟수
 * @param lambdas 기대값 리스트
 * @param k 사건 발생 횟수
 * @returns 혼합 푸아송 분포 확률
 */
export const mixedPoissonProbability = (
  counts: number[],
  lambdas: number[],
  k: number,
): number => {
  const totalTrials = counts.reduce((acc, count) => acc + count, 0);
  return counts.reduce((acc, count, i) => {
    return acc + (count / totalTrials) * poissonProbability(lambdas[i], k);
  }, 0);
};

function factorial(n: number) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * @todo 분활된 확률의 몬테 카를로 시뮬레이터로 교체
 * @function 몬테_카를로_시뮬레이터
 * @param lambda 사건 발생 확률들
 * @param trials 시뮬레이션 횟수
 * @param lock 사용한 자물쇠 개수
 * @returns 시뮬레이션 결과
 */
export function monteCarloSimulation(
  lambdas: Item[],
  trials: number,
  locks: number,
): SimulationTrial[] {
  const results: {
    trial: number;
    acquiredItems: { name: string; count: number }[];
  }[] = [];

  for (let i = 0; i < trials; i++) {
    const acquiredItems: { name: string; count: number }[] = [];

    for (let j = 0; j < locks; j++) {
      // 자물쇠 개수만큼 시도
      const rand = Math.random();
      let probabilitySum = 0;
      for (const item of lambdas) {
        if (probabilitySum > rand) {
          acquiredItems.push({ name: item.name, count: 1 });
          break;
        }
        probabilitySum += item.probability / 100;
      }
    }

    results.push({ trial: i + 1, acquiredItems });
  }

  return results;
}

export function calculateTotalGold(
  results: {
    trial: number;
    acquiredItems: { name: string; count: number }[];
  }[],
  itemMetadata: ItemMeta[],
): {
  totalGold: number;
  trial: number;
  acquiredItems: {
    name: string;
    count: number;
  }[];
}[] {
  return results.map((result) => {
    let totalGold = 0;

    for (const item of result.acquiredItems) {
      const goldItem = itemMetadata.find((g) => g.itemName === item.name);
      if (goldItem) {
        totalGold += item.count * goldItem.unitPrice;
      }
    }

    return { ...result, totalGold };
  });
}
