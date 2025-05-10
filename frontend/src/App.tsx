import { Route, Routes } from "react-router-dom";
import { ProductList } from "./pages/product/list";
import { ProductView } from "./pages/product/view";
import { ProductForm } from "./pages/product/form";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/products/form" element={<ProductForm />} />
      <Route path="/products/form/:id" element={<ProductForm />} />
    </Routes>
  );
}

export default App;
