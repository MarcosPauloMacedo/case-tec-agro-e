global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ProductForm } from "./index";

const mockProductsReducer = (state = { products: [], status: "succeeded" }) =>
  state;

const mockStore = configureStore({
  reducer: {
    products: mockProductsReducer,
  },
});

describe("ProductForm", () => {
  it("deve renderizar o formulário de produto com campos obrigatórios", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Criar Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });
});
