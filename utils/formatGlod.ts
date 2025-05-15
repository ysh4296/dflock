export const formatGold = (value: number): string => {
  if (value >= 1_0000_0000) {
    return `${(value / 1_0000_0000).toFixed(0).replace(/\.00$/, "")}억`;
  }
  if (value >= 1_0000) {
    return `${(value / 1_0000).toFixed(0).replace(/\.00$/, "")}만`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0).replace(/\.00$/, "")}천`;
  }
  return value.toString();
};
