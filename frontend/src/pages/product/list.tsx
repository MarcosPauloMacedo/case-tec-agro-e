import { useLocation } from "react-router-dom";
import { DeleteAction } from "../../components/actions/delete";
import { EditAction } from "../../components/actions/edit";
import { ViewAction } from "../../components/actions/view";
import { ProductList } from "../../components/lists/products";

const products = [
  { id: 1, name: "Produto A", price: 100.0 },
  { id: 2, name: "Produto B", price: 200.0 },
  { id: 3, name: "Produto C", price: 300.0 },
  { id: 4, name: "Produto D", price: 400.0 },
];

export function ProductListPage() {
  const location = useLocation();
  return (
    <ProductList
      products={products}
      render={(product) => (
        <div className="flex justify-end gap-6">
          <ViewAction to={`${location.pathname}/${product.id}`} />
          <EditAction to={`${location.pathname}/form/${product.id}`} />
          <DeleteAction />
        </div>
      )}
    />
  );
}
