
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../marbella/pages/HomePage";
import { CategoriaPage } from "../marbella/pages/categoria/CategoriaPage";
import { ProductoPage } from "../marbella/pages/producto/ProductoPage";
import { UsuarioPage } from "../marbella/pages/usuario/UsuarioPage";
import { MarcaPage } from "../marbella/pages/marcas/MarcaPage";
import { ProveedorPage } from "../marbella/pages/proveedor/ProveedorPage";
import { useState } from "react";
import LoginPage from "../marbella/auth/signIn/LoginPage";

export const AppRoute = () => {

  const [authenticated, setAuthenticate] = useState<boolean>(true);

  return (
    <Routes>
      {authenticated ? (<>
        <Route path="/" element={<HomePage />}>
          <Route path="/marca" element={<MarcaPage />} />
          <Route path="/categoria" element={<CategoriaPage />} />
          <Route path="/productos" element={<ProductoPage />} />
          <Route path="/usuario" element={<UsuarioPage />} />
          <Route path="/proveedor" element={<ProveedorPage />} />
          <Route path="/*" element={<Navigate to={"/marca"} />} />
        </Route>
      </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>
      )}
    </Routes>
  );
};
