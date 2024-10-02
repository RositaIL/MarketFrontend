
import { useAuthStore } from "../hooks/useAuthStore"
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../auth/auth/LoginPage";
import { useEffect } from "react";
import { HomePage } from "../marbella/pages/HomePage";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FireBaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { CategoriaPage } from "../marbella/pages/CategoriaPage";
import { ProductoPage } from "../marbella/pages/ProductoPage";
import { UsuarioPage } from "../marbella/pages/UsuarioPage";
import { MarcaPage } from "../marbella/pages/marca/MarcaPage";

export const AppRoute = () => {

    const { authenticated, checkAuthToken } = useAuthStore();
    const dispatch = useDispatch();

    useEffect(() => {
        const unSuscribe = onAuthStateChanged(FireBaseAuth, async (user) => {
            if (user) {
                const usuario = {
                    accessToken: '',
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
                dispatch(login(usuario))
            } else {
                dispatch(logout(null));
            }
        })
        return () => unSuscribe();
    }, [])

    useEffect(() => {
        checkAuthToken();
    }, [])

    return (
        <Routes>
            {
                (!authenticated)
                    ? (
                        <>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to={'/login'} />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/marca" element={<MarcaPage />} />
                            <Route path="/categoria" element={<CategoriaPage />} />
                            <Route path="/productos" element={<ProductoPage />} />
                            <Route path="/usuario" element={<UsuarioPage />} />
                            <Route path="/*" element={<Navigate to={'/marca'} />} />
                        </>
                    )
            }

        </Routes>
    )
}
