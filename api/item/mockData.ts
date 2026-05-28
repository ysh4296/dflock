import { createMock, createMockList } from "unplugin-ts-mock";

export const mockItemList: ItemListGetResponse = createMock<ItemListGetResponse>();
export const mockItemMetadata: ItemMetadataGetResponse = createMockList<ItemMeta>(10);
