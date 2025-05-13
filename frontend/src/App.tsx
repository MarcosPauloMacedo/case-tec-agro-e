import { Route, Routes } from "react-router-dom";
import { LayoutAdmin } from "./layouts/admin";
import { ProductFormPage } from "./pages/product/form";
import { ProductListPage } from "./pages/product/list";
import { ProductViewPage } from "./pages/product/view";

import "./App.css";
import { LoginPage } from "./pages/auth/login";
import { PrivateRoute } from "./components/auth/private-route";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rotas privadas administrativas */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <LayoutAdmin>
              <Routes>
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/:id" element={<ProductViewPage />} />
                <Route path="products/form" element={<ProductFormPage />} />
                <Route path="products/form/:id" element={<ProductFormPage />} />
              </Routes>
            </LayoutAdmin>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
