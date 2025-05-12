import { useState } from "react";
import { DeleteAction } from "../../actions/delete";
import { EditAction } from "../../actions/edit";
import { ViewAction } from "../../actions/view";
import { AlertInfo } from "../../utils/alerts/info";
import { BoxDialogs } from "../../utils/box-dialogs";
import { ButtonCreate } from "../../utils/buttons/create";
import { TitlePage } from "../../utils/title-page";
import { TableProducts } from "./table";
import { useLocation } from "react-router-dom";

const products = [
  { id: 1, name: "Produto A", price: 100.0 },
  { id: 2, name: "Produto B", price: 200.0 },
  { id: 3, name: "Produto C", price: 300.0 },
  { id: 4, name: "Produto D", price: 400.0 },
];

export function ProductList() {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <TitlePage title="Lista de Produtos" />
      <AlertInfo message="A lista abaixo contém todos os produtos disponíveis no sistema." />
      <ButtonCreate to="/admin/products/form" />
      <div className="overflow-x-auto">
        <TableProducts
          products={products}
          render={(product) => (
            <div className="flex justify-end gap-6">
              <ViewAction to={`${location.pathname}/${product.id}`} />
              <EditAction to={`${location.pathname}/form/${product.id}`} />
              <DeleteAction />
            </div>
          )}
        />
      </div>
      <BoxDialogs
        title="Produto excluído com sucesso"
        description="O produto foi excluído com sucesso."
        open={openDialog}
        setOpen={() => setOpenDialog(false)}
        variant="success"
      />
    </div>
  );
}
