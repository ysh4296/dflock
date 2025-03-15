import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mileageLock1,
  mileageLock2,
  normalLock1,
  normalLock2,
} from "@/mock/itemData";
import { useItemSelectStore } from "@/store/form";
import { Card } from "../ui/card";

const getUniqueItems = (...itemLists: Item[][]) => {
  const itemMap = new Map();

  itemLists.flat().forEach(({ name, probability }) => {
    const key = `${name}`;
    if (!itemMap.has(key)) {
      itemMap.set(key, { name, probability });
    }
  });

  return Array.from(itemMap.values());
};

const ItemList = () => {
  const uniqueItems = getUniqueItems(
    normalLock1,
    normalLock2,
    mileageLock1,
    mileageLock2,
  );

  const { item: selectedItem, setItem } = useItemSelectStore();

  return (
    <Card className="p-0 flex grow w-fit">
      <Table className="relative w-fit">
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead>이미지</TableHead>
            <TableHead>아이템 이름</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueItems.map((item) => (
            <TableRow
              key={item.name}
              onClick={() => setItem(item)}
              className={`cursor-pointer hover:bg-gray-100 transition ${
                selectedItem?.name === item.name ? "bg-gray-200" : ""
              }`}
            >
              <TableCell>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ItemList;
