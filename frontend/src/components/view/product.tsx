import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { ButtonBack } from "../utils/buttons/back";
import { TitlePage } from "../utils/title-page";
import { getProductById } from "../../api/products";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingCircle } from "../utils/loading/circle";
import { BoxDialogs } from "../utils/box-dialogs";
import { delay } from "../../services/delay";
import { AlertInfo } from "../utils/alerts/info";

export function ProductView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [statusComponent, setStatusComponent] = useState<
    "loading" | "success" | "error"
  >("loading");

  const fetchProduct = async (id: number) => {
    await delay(1000); 
    await getProductById(id)
      .then((response) => {
        setProduct(response);
        setStatusComponent("success");
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
        setStatusComponent("error");
      });
  };

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    } else {
      setStatusComponent("error");
    }
  }, [id]);

  return (
    <div className="pb-8">
      <TitlePage title="Visualizar Produto" />
      <AlertInfo message="Esta página é apenas para visualização. Para editar ou excluir o produto, acesse a página de edição." />
      <ButtonBack />
      {statusComponent === "loading" && (
        <div className="flex justify-center items-center">
          <LoadingCircle />
        </div>
      )}
      {statusComponent === "error" && (
        <BoxDialogs
          title="Erro"
          description="Não foi possível carregar o produto. Tente novamente mais tarde."
          open={true}
          setOpen={() => navigate(-1)}
          variant="error"
        />
      )}
      {statusComponent === "success" && (
        <div className="mt-6 bg-gray-50 shadow rounded-lg p-6">
          <h2 className="text-md font-bold text-gray-800 mb-4">
            Detalhes do Produto
          </h2>
          {product && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-lg text-gray-700">{product.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Preço</p>
                <p className="text-lg text-gray-700">R$ {product.price}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
