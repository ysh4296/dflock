import { create } from "zustand";

import {
  mileageLock1,
  mileageLock2,
  normalLock1,
  normalLock2,
} from "@/mock/itemData";

/**
 * @todo
 * convert any to chart gold-percentage type
 */
interface goldChartState {
  chartData: any[];
  loading?: boolean;
  setChartData: (
    tries: number,
    lockType: string,
    lockCount: number,
    boosterType: number,
  ) => void;
}

export const useGoldChartStore = create<goldChartState>((set) => ({
  chartData: [],
  loading: undefined,
  setChartData: (
    TRIES: number,
    lockType: string,
    lockCount: number,
    boosterType: number,
  ) => {
    set({ loading: true });

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
      lockType,
      lockCount,
      boosterType,
      TRIES,
    });

    // Worker로부터 데이터 받기
    worker.onmessage = (event) => {
      set({ chartData: event.data, loading: false });
      worker.terminate(); // 작업 완료 후 Worker 종료
    };

    // 에러 처리
    worker.onerror = (error) => {
      console.error("Worker Error:", error);
      worker.terminate();
    };
  },
}));
