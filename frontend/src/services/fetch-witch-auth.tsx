import { refreshAccessToken } from "../api/auth/login";
import { getAccessToken, getRefreshToken, setAccessToken } from "./token";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = getAccessToken();

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Se o token expirou (401 Unauthorized), tenta buscar um novo token
  if (response.status === 401) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      return await refreshAccessToken(refreshToken)
        .then(async (data) => {
          setAccessToken(data.access);
          // Tenta novamente a requisição com o novo token
          return await fetch(url, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${data.access}`,
            },
          });
        })
        .catch((error) => {
          console.error("Erro ao atualizar o token:", error);
          throw error;
        });
    }
  }

  return response;
};
