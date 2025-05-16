import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useItemSelectStore } from "@/store/form";
import { useItemStore } from "@/store/item";
import { Card } from "../ui/card";

const ItemList = () => {
  const { itemMetadata } = useItemStore();

  const { selectItem, setSelectItem } = useItemSelectStore();

  return (
    <Card className="p-0 flex grow w-fit">
      <Table className="relative w-fit">
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead>아이템 이름</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemMetadata.map((itemMeta: ItemMeta) => (
            <TableRow
              key={itemMeta.itemName}
              onClick={() => setSelectItem(itemMeta)}
              className={`cursor-pointer hover:bg-gray-100 transition ${
                selectItem?.itemName === itemMeta.itemName ? "bg-gray-200" : ""
              }`}
            >
              <TableCell>{itemMeta.itemName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ItemList;
