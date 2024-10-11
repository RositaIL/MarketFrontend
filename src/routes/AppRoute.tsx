
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../marbella/pages/HomePage";
import { CategoriaPage } from "../marbella/pages/categoria/CategoriaPage";
import { ProductoPage } from "../marbella/pages/producto/ProductoPage";
import { UsuarioPage } from "../marbella/pages/usuario/UsuarioPage";
import { MarcaPage } from "../marbella/pages/marcas/MarcaPage";
import { ProveedorPage } from "../marbella/pages/proveedor/ProveedorPage";
import { useEffect } from "react";
import LoginPage from "../marbella/auth/signIn/LoginPage";
import { useAuthStore } from "../marbella/hooks/useAuthStore";
import { EntradaPage } from "../marbella/pages/movimiento/entrada/EntradaPage";
import { SalidaPage } from "../marbella/pages/movimiento/salida/SalidaPage";
import { ReportePage } from "../marbella/pages/reporte/ReportePage";

export const AppRoute = () => {

  const { authenticated, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])

  return (
    <Routes>
      {authenticated ? (<>
        <Route path="/" element={<HomePage />}>
          <Route path="/marca" element={<MarcaPage />} />
          <Route path="/categoria" element={<CategoriaPage />} />
          <Route path="/productos" element={<ProductoPage />} />
          <Route path="/usuario" element={<UsuarioPage />} />
          <Route path="/proveedor" element={<ProveedorPage />} />
          <Route path="/entrada" element={<EntradaPage />} />
          <Route path="/salida" element={<SalidaPage />} />
          <Route path="/reportes" element={<ReportePage />} />
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
