import { create } from "zustand";

/**
 * @todo
 * convert any to chart gold-percentage type
 */
interface goldChartState {
  chartData: any[];
  loading?: boolean;
  setChartData: (
    itemList: ItemListGetResponse,
    itemMetadata: ItemMetadataGetResponse,
    tries: number,
    lockType: string,
    boosterType: number,
    lockCount?: number,
  ) => void;
}

export const useGoldChartStore = create<goldChartState>((set) => ({
  chartData: [],
  loading: undefined,
  setChartData: (
    itemList: ItemListGetResponse,
    itemMetadata: ItemMetadataGetResponse,
    TRIES: number,
    lockType: string,
    boosterType: number,
    lockCount?: number,
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
      normalLock1: itemList.firstItems,
      normalLock2: itemList.secondItems,
      mileageLock1: itemList.mileageFirstItems,
      mileageLock2: itemList.mileageSecondItems,
      itemMetadata,
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
