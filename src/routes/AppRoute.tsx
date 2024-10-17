import { useEffect } from "react";
import { useAuthStore } from "../marbella/hooks/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./AuthGuard";
import { UsuarioPage } from "../marbella/pages/usuario/UsuarioPage";
import { HomePage } from "../marbella/pages/home/HomePage";
import { MarcaPage } from "../marbella/pages/marcas/MarcaPage";
import { CategoriaPage } from "../marbella/pages/categoria/CategoriaPage";
import { ProveedorPage } from "../marbella/pages/proveedor/ProveedorPage";
import { ProductoPage } from "../marbella/pages/producto/ProductoPage";
import { ReportePage } from "../marbella/pages/reporte/ReportePage";
import { SalidaPage } from "../marbella/pages/movimiento/salida/SalidaPage";
import { EntradaPage } from "../marbella/pages/movimiento/entrada/EntradaPage";
import LoginPage from "../marbella/auth/signIn/LoginPage";

export const AppRoute = () => {

  const { authenticated, checkAuthToken, user } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])

  return (
    <Routes>
      <Route element={<PrivateRoute isAuthenticated={authenticated} role={['ADMINISTRADOR', 'EMPLEADO']} requiredRole={true} user={user} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/marca" element={<MarcaPage />} />
        <Route path="/categoria" element={<CategoriaPage />} />
        <Route path="/producto" element={<ProductoPage />} />
        <Route path="/entrada" element={<EntradaPage />} />
        <Route path="/salida" element={<SalidaPage />} />
        <Route path="/reporte" element={<ReportePage />} />
        <Route path="/unauthorized" element={<h1>UNAUTHORIZED</h1>} />
      </Route>

      <Route element={<PrivateRoute isAuthenticated={authenticated} role={['ADMINISTRADOR']} requiredRole={true} user={user} />}>
        <Route path="/usuario" element={<UsuarioPage />} />
        <Route path="/proveedor" element={<ProveedorPage />} />
      </Route>

      <Route path="/login" element={
        <PublicRoute isAuthenticated={authenticated}>
          <LoginPage />
        </PublicRoute>} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
