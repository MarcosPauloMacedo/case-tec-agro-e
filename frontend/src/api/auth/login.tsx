import type { LoginSuccess } from "../../types/login";

const API_URL = "http://127.0.0.1:8000";

// Método para obter o token de acesso e refresh (login)
export const login = async (
  username: string,
  password: string
): Promise<LoginSuccess> => {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Falha no login. Verifique suas credenciais.");
  }

  return response.json();
};

// Método para atualizar o token de acesso (refresh)
export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Falha ao atualizar o token de acesso.");
  }

  return response.json();
};

// Método para verificar se o token de acesso é válido
export const verifyAccessToken = async (accessToken: string) => {
  const response = await fetch(`${API_URL}/api/token/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
  });

  if (!response.ok) {
    throw new Error("Token de acesso inválido ou expirado.");
  }

  return response.json();
};
