import { fetchWithAuth } from "../../services/fetch-witch-auth";
import type { Product } from "../../types/product";

const API_URL = "http://127.0.0.1:8000/products";

// Método para listar todos os produtos
export const getProducts = async () => {
  const response = await fetchWithAuth(`${API_URL}/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos.");
  }

  return response.json();
};

// Método para buscar um produto pelo ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetchWithAuth(`${API_URL}/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar o produto.");
  }

  return response.json();
};

// Método para criar um novo produto
export const createProduct = async (productData: {
  name: string;
  price: number;
}) => {
  const response = await fetchWithAuth(`${API_URL}/`, {
    method: "POST",
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar o produto.");
  }

  return response.json();
};

// Método para atualizar um produto existente
export const updateProduct = async (
  id: number,
  productData: { name: string; price: number }
) => {
  const response = await fetchWithAuth(`${API_URL}/${id}/`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar o produto.");
  }

  return response.json();
};

// Método para deletar um produto
export const deleteProduct = async (id: number) => {
  const response = await fetchWithAuth(`${API_URL}/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao deletar o produto.");
  }
  return { message: "Produto deletado com sucesso!" };
};
