import type { Product } from "../../types/product";
import { AlertInfo } from "../utils/alerts/info";
import { TitlePage } from "../utils/title-page";

interface IProductListProps {
    products: Product[];
    render?: (product: any) => React.ReactNode;
}

export function ProductList({ products, render }: IProductListProps) {
  return (
    <div>
      <TitlePage title="Lista de Produtos" />
      <AlertInfo message="A lista abaixo contém todos os produtos disponíveis no sistema." />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
                Nome
              </th>
              <th colSpan={2} className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
                Preço
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  R$ {product.price.toFixed(2)}
                </td>
                {render && (
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {render(product)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
