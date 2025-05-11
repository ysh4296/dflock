export const ItemQueryKey = {
  list: () => ["list"],
  metadata: () => [...ItemQueryKey.list(), "metadata"],
};
