import type { Product } from "../../types/product";
import { ButtonBack } from "../utils/buttons/back";
import { TitlePage } from "../utils/title-page";

const product: Product = {
    id: 1,
    name: "Produto A",
    price: 100.0
};

export function ProductView() {
  return (
    <div className="p-4">
      <TitlePage title="Visualizar Produto" />
      <ButtonBack />
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-md font-bold text-gray-800 mb-4">Detalhes do Produto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nome</p>
            <p className="text-lg text-gray-700">{product.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Preço</p>
            <p className="text-lg text-gray-700">R$ {product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}