import {
  mileageLock1,
  mileageLock2,
  normalLock1,
  normalLock2,
} from "@/mock/itemData";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const getUniqueItems = (...itemLists: Item[][]) => {
  const itemMap = new Map();

  itemLists.flat().forEach(({ name }) => {
    const key = `${name}`;
    if (!itemMap.has(key)) {
      itemMap.set(key, { name });
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

  return (
    <Card className="p-0">
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead>이미지</TableHead>
            <TableHead>아이템 이름</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueItems.map((item) => (
            <TableRow key={item.name}>
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
