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
 * @function n을_k개의_정수로_나누는_함수
 * @param n 나눠지는 수의 총합
 * @param k 나눌 집합 크기
 * @returns 가능한 경우의수의 배열 [ ex) [[0,0,1][0,1,0][1,0,0]] ]
 */
export function makePartition(n: number, k: number): number[][] {
  const result: number[][] = [];

  const findPartition = (sum: number, parts: number[], depth: number) => {
    if (depth === k - 1) {
      // 마지막 부분에 남은 값을 채워 넣음
      parts.push(sum);
      result.push([...parts]);
      parts.pop();
      return;
    }

    // 0부터 시작하여 가능한 모든 분할을 탐색
    for (let i = 0; i <= sum; i++) {
      parts.push(i);
      findPartition(sum - i, parts, depth + 1);
      parts.pop();
    }
  };

  findPartition(n, [], 0);
  return result;
}

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
