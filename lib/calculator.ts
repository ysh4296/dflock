/**
 * @function 푸아송_분포_계산기
 * @param lambda 기대값
 * @param k 사건 발생 횟수
 * @returns 푸아송 분포 확률
 */
export function poissonProbability(lambda: number, k: number) {
  return (lambda ** k * Math.exp(-lambda)) / factorial(k);
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
 * @param lambda 사건 발생 확률
 * @param trials 시뮬레이션 횟수
 * @returns 시뮬레이션 결과
 */
export function monteCarloSimulation(lambda: number, trials: number) {
  const results = new Array(trials).fill(0);

  for (let i = 0; i < trials; i++) {
    let count = 0;
    let sum = 0;
    while (sum <= lambda) {
      sum += Math.log(1 / Math.random());
      count++;
    }
    results[i] = count - 1;
  }

  const frequency: Record<string, number> = {};
  results.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });

  Object.keys(frequency).forEach((key) => {
    frequency[key] /= trials;
  });

  return frequency;
}
