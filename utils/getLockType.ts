export const getLockType = (
  lockType: string,
  lockCount: number,
  boosterType: number,
) => {
  let normalLocks = 0;
  let mileageLocks = 0;

  switch (lockType) {
    case "normal":
      normalLocks = lockCount;
      break;
    case "mileage":
      mileageLocks = lockCount;
      break;
    default:
      mileageLocks = Math.floor(lockCount / boosterType);
      normalLocks = lockCount - mileageLocks;
  }

  return { normalLocks, mileageLocks };
};
