import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

interface IPrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: IPrivateRouteProps) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return <Navigate to="/" />;
  }

  return children;
}
