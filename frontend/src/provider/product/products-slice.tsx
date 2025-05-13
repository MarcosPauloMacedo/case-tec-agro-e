import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, deleteProduct, createProduct } from "../../api/products";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

// Thunks para operações assíncronas
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await getProducts();
  return response;
});

export const removeProduct = createAsyncThunk("products/removeProduct", async (id: number) => {
  await deleteProduct(id);
  return id;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: { name: string; price: number }) => {
    const response = await createProduct(productData);
    return response;
  }
);

// Slice de produtos
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Erro ao buscar produtos.";
      })
      // Remove product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productsSlice.reducer;