import type { LoginSuccess } from "../types/login";

const accessToken = "accessToken";
const refreshToken = "refreshToken";

export const setToken = (response: LoginSuccess) => {
  localStorage.setItem(accessToken, response.access);
  localStorage.setItem(refreshToken, response.refresh);
};

export const removeToken = () => {
  localStorage.removeItem(accessToken);
  localStorage.removeItem(refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(accessToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem(refreshToken);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(accessToken, token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(refreshToken, token);
};
