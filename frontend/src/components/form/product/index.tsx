import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  getProductById,
  updateProduct
} from "../../../api/products";
import { useAppDispatch } from "../../../provider/product/product-hook";
import { addProduct } from "../../../provider/product/products-slice";
import { delay } from "../../../services/delay";
import { BoxDialogs } from "../../utils/box-dialogs";
import { ButtonBack } from "../../utils/buttons/back";
import { ButtonSubmit } from "../../utils/buttons/submit";
import { ErrorForm } from "../../utils/items-form/error";
import { Form } from "../../utils/items-form/form";
import { Input } from "../../utils/items-form/input";
import { Label } from "../../utils/items-form/label";
import { LoadingCircle } from "../../utils/loading/circle";
import { TitlePage } from "../../utils/title-page";
import { dataProductForm as data } from "./data";

const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório" })
    .max(100, { message: "O nome não pode ter mais de 100 caracteres" }),
  price: z
    .number()
    .min(0, { message: "O preço deve ser maior ou igual a 0" })
    .max(10000, { message: "O preço não pode ser maior que 10.000" }),
});

export function ProductForm() {
  const { id } = useParams();

  const [typeVariantDialog, setVariantDialog] = useState<
    "success" | "error" | "loading" | "question"
  >("question");

  const [statusComponent, setStatusComponent] = useState<
    "success" | "error" | "loading"
  >("loading");

  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const [product, setProduct] = useState<Zod.infer<typeof productSchema>>();

  const navigate = useNavigate();

  const form = useForm<Zod.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const fetchProduct = async (id: number) => {
    await delay(1000);
    getProductById(id)
      .then((response) => {
        const { name, price } = response;
        form.setValue("name", name);
        form.setValue("price", price);
        setStatusComponent("success");
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setStatusComponent("error");
      });
  };

  const create = async (data: z.infer<typeof productSchema>) => {
    dispatch(addProduct(data))
      .then(() => {
        setVariantDialog("success");
        if (!openDialog) setOpenDialog(true);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        setVariantDialog("error");
        if (!openDialog) setOpenDialog(true);
      });
  };

  const update = async (id: number, data: z.infer<typeof productSchema>) => {
    updateProduct(id, data)
      .then(() => {
        if (!openDialog) setOpenDialog(true);
        setVariantDialog("success");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setVariantDialog("error");
        if (!openDialog) setOpenDialog(true);
      });
  };

  const handleProduct = async () => {
    if (product) {
      setVariantDialog("loading");
      await delay(1000);

      if (isEdit) return await update(Number(id), product);
      return await create(product);
    } else {
      setVariantDialog("error");
      if (!openDialog) setOpenDialog(true);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    if (typeVariantDialog === "success") {
      return navigate("/admin/products");
    }

    if (typeVariantDialog === "error") {
      setOpenDialog(false);
      setVariantDialog("question");
      return;
    }

    if (typeVariantDialog === "loading") {
      setOpenDialog(false);
      setVariantDialog("question");
      return;
    }
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    setProduct(data);
    setOpenDialog(true);
  };

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
      setIsEdit(true);
    } else {
      setStatusComponent("success");
      setIsEdit(false);
    }

    setVariantDialog("question");
    setOpenDialog(false);
  }, [id]);

  return (
    <div className="p-4">
      {(id && <TitlePage title="Editar Produto" />) || (
        <TitlePage title="Criar Produto" />
      )}
      <ButtonBack />
      {statusComponent === "loading" && (
        <div className="flex justify-center">{<LoadingCircle />}</div>
      )}
      {statusComponent === "error" && (
        <BoxDialogs
          title="Erro"
          description="Erro ao carregar o produto"
          open={true}
          setOpen={() => navigate("/admin/products")}
          variant="error"
        />
      )}
      {statusComponent === "success" && (
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Nome */}
          <div>
            <Label htmlFor="name" text="Nome" required />
            <Input type="text" id="name" {...form.register("name")} />
            <ErrorForm error={form.formState.errors.name} />
          </div>

          {/* Preço */}
          <div>
            <Label htmlFor="price" text="Preço" required />
            <Input
              type="number"
              id="price"
              {...form.register("price", {
                valueAsNumber: true,
              })}
            />
            <ErrorForm error={form.formState.errors.price} />
          </div>
          <ButtonSubmit title={isEdit ? "Atualizar" : "Cadastrar"} />
        </Form>
      )}
      <BoxDialogs
        title={data.dialog(typeVariantDialog, isEdit).title}
        description={data.dialog(typeVariantDialog, isEdit).message}
        open={openDialog}
        setOpen={closeDialog}
        variant={typeVariantDialog}
      >
        {typeVariantDialog === "question" && (
          <div className="flex justify-center">
            <button
              disabled={form.formState.isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded w-1/2"
              onClick={handleProduct}
            >
              {isEdit ? "Editar" : "Criar"}
            </button>
          </div>
        )}
      </BoxDialogs>
    </div>
  );
}
