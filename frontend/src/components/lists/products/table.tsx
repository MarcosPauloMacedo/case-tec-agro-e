import type { Product } from "../../../types/product";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../utils/itens-table";

interface ITableProductsProps {
  products: Product[];
  render?: (product: Product) => React.ReactNode;
}

export function TableProducts({ products, render }: ITableProductsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead colSpan={2}>Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>R$ {product.price.toFixed(2)}</TableCell>
            {render && <TableCell>{render(product)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
