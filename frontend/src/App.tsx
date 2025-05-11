import { Route, Routes } from "react-router-dom";
import { LayoutAdmin } from "./layouts/admin";
import { ProductForm } from "./pages/product/form";
import { ProductList } from "./pages/product/list";
import { ProductView } from "./pages/product/view";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Rotas privadas administrativas */}
      <Route
        path="/admin/*"
        element={
          <LayoutAdmin>
            <Routes>
              <Route path="products" element={<ProductList />} />
              <Route path="products/:id" element={<ProductView />} />
              <Route path="products/form" element={<ProductForm />} />
              <Route path="products/form/:id" element={<ProductForm />} />
            </Routes>
          </LayoutAdmin>
        }
      />
    </Routes>
  );
}

export default App;
