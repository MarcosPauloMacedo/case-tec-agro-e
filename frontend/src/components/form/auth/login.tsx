import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../../../api/auth/login";
import { ButtonSubmit } from "../../utils/buttons/submit";
import { ErrorForm } from "../../utils/items-form/error";
import { Form } from "../../utils/items-form/form";
import { Input } from "../../utils/items-form/input";
import { Label } from "../../utils/items-form/label";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../services/token";
import { delay } from "../../../services/delay";
import { BoxDialogs } from "../../utils/box-dialogs";
import { useState } from "react";
import imgLogin from "../../../assets/login-img.jpg";
import logo from "../../../assets/Logomarca.png"

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "O usuário é obrigatório" })
    .max(100, { message: "O usuário não pode ter mais de 100 caracteres" }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória" })
    .max(100, { message: "A senha não pode ter mais de 100 caracteres" }),
});

export function Login() {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await delay(1000);
    await login(data.username, data.password)
      .then((response) => {
        setToken(response);
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setLoginError(true);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="flex m-10">
        <div className="hidden md:flex flex-col w-1/2 p-10 bg-white rounded-bl-2xl rounded-tl-2xl">
          <img src={imgLogin} alt="login" className="w-xl" />
        </div>
        <div className="flex flex-col w-full md:w-1/2 p-10 bg-yellow-300 md:rounded-br-2xl md:rounded-tr-2xl rounded-2xl md:rounded-none">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="w-64" />
          </div>
          <Form
            className="bg-yellow-300 border-0"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* username */}
            <div>
              <Label htmlFor="username" text="Usuário" required />
              <Input
                className="bg-white"
                type="text"
                id="username"
                {...form.register("username")}
                name="username"
                placeholder="Digite seu usuário"
              />
              <ErrorForm error={form.formState.errors.username} />
            </div>

            {/* password */}
            <div>
              <Label htmlFor="password" text="Senha" required />
              <Input
                className="bg-white"
                type="password"
                id="password"
                {...form.register("password")}
                name="password"
                placeholder="Digite sua senha"
              />
              <ErrorForm error={form.formState.errors.password} />
            </div>
            <ButtonSubmit
              className="w-full md:w-auto"
              title={form.formState.isSubmitting ? "Aguarde..." : "Entrar"}
            />
          </Form>
        </div>
        {loginError && (
          <BoxDialogs
            title="Erro"
            description="Usuário ou senha inválidos"
            open={loginError}
            setOpen={() => setLoginError(false)}
            variant="error"
          />
        )}
      </div>
    </div>
  );
}
