import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../utils/items-form/label";
import { TitlePage } from "../utils/title-page";
import { ButtonBack } from "../utils/buttons/back";
import { useParams } from "react-router-dom";
import { Input } from "../utils/items-form/input";
import { ErrorForm } from "../utils/items-form/error";
import { ButtonSubmit } from "../utils/buttons/submit";
import { Form } from "../utils/items-form/form";

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

  const form = useForm<Zod.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    console.log("Form data:", data);
  };

  return (
    <div className="p-4">
      {(id && <TitlePage title="Editar Produto" />) || (
        <TitlePage title="Criar Produto" />
      )}
      <ButtonBack />
      <Form
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <ButtonSubmit title={id ? 'Cadastrar' : 'Atualizar'} />
      </Form>
    </div>
  );
}
