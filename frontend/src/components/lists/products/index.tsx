import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../provider/product/product-hook";
import {
  fetchProducts,
  removeProduct,
} from "../../../provider/product/products-slice";
import { delay } from "../../../services/delay";
import { DeleteAction } from "../../actions/delete";
import { EditAction } from "../../actions/edit";
import { ViewAction } from "../../actions/view";
import { AlertInfo } from "../../utils/alerts/info";
import { BoxDialogs } from "../../utils/box-dialogs";
import { ButtonCreate } from "../../utils/buttons/create";
import { LoadingCircle } from "../../utils/loading/circle";
import { TitlePage } from "../../utils/title-page";
import { dataProductList as data } from "./data";
import { cn } from "../../../lib/cn";

export function ProductList() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  const [typeBoxDialog, setTypeBoxDialog] = useState<
    "success" | "error" | "question" | "loading"
  >("question");

  const [openDialog, setOpenDialog] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);

  const handleDeleteProduct = async () => {
    setTypeBoxDialog("loading");

    if (productId) {
      await delay(1000);
      dispatch(removeProduct(productId))
        .then(() => {
          setTypeBoxDialog("success");
          if (!openDialog) setOpenDialog(true);
        })
        .catch((error) => {
          console.error("Erro ao apagar produto:", error);
          setTypeBoxDialog("error");
          if (!openDialog) setOpenDialog(true);
        })
        .finally(() => {
          setProductId(null);
        });
    } else {
      setTypeBoxDialog("error");
      if (!openDialog) setOpenDialog(true);
    }
  };

  const closeDialog = async () => {
    if (typeBoxDialog === "success") {
      setOpenDialog(false);
      setTypeBoxDialog("question");
      dispatch(fetchProducts());
    } else {
      setOpenDialog(false);
      setTypeBoxDialog("question");
    }
  };

  const getProductId = (id: number) => {
    setProductId(id);
    setOpenDialog(true);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const product = products[index];
    return (
      <div style={style} className="grid grid-cols-4 mt-4">
        <div className={cn("text-black col-span-2 flex justify-between items-center p-1 rounded-l-lg overflow-x-auto", index % 2 === 0 ? "bg-gray-200" : "")}>
          <span className="whitespace-nowrap me-2">{product.name}</span>
          <span className="whitespace-nowrap">R$ {product.price}</span>
        </div>
        <div className={cn("flex justify-end items-center gap-4 pe-3 col-span-2 rounded-e-lg me-2", index % 2 === 0 ? "bg-gray-200" : "")}>
          <ViewAction to={`${location.pathname}/${product.id}`} />
          <EditAction to={`${location.pathname}/form/${product.id}`} />
          <DeleteAction onClick={() => getProductId(product.id)} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <TitlePage title="Lista de Produtos" />
      <AlertInfo message="A lista abaixo contém todos os produtos disponíveis no sistema." />
      <ButtonCreate to="/admin/products/form" />
      <div>
        {status === "loading" && (
          <div className="flex justify-center items-center">
            <LoadingCircle />
          </div>
        )}
        {status === "failed" && (
          <BoxDialogs
            title="Erro ao buscar produtos"
            description="Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde."
            open={true}
            setOpen={() => navigate("/admin/dashboard")}
            variant="error"
          />
        )}
        {status === "succeeded" && products.length === 0 && (
          <div className="text-black flex justify-center items-center">
            <p>Nenhum produto encontrado.</p>
          </div>
        )}
        {status === "succeeded" && products.length && (
          <div>
            <section className="w-1/2">
              <div className="text-black col-span-2 flex justify-between">
                <span className="text-md font-semibold">Nome</span>
                <span className="text-md font-semibold">Preço</span>
              </div>
            </section>
            <List
              className="p-4"
              height={350}
              itemCount={products.length}
              itemSize={50}
              width="auto"
            >
              {Row}
            </List>
          </div>
        )}
      </div>
      <BoxDialogs
        title={data.dialog(typeBoxDialog).title}
        description={data.dialog(typeBoxDialog).message}
        open={openDialog}
        setOpen={closeDialog}
        variant={typeBoxDialog}
      >
        {typeBoxDialog === "question" && (
          <div className="flex justify-center">
            <button
              className="text-white px-4 py-2 rounded w-1/2"
              onClick={handleDeleteProduct}
            >
              Apagar
            </button>
          </div>
        )}
      </BoxDialogs>
    </div>
  );
}
