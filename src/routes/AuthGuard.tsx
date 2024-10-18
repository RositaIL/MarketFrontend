import { Navigate, Outlet } from "react-router-dom";
import { UserAuthenticate } from "../store/auth/userAuthenticate";
import { Header } from "../marbella/components/Header";
import { MarbellaProvider } from "../context/MarbellaProvider";
import { Footer } from "../marbella/components/Footer";

type PrivateRouteProps = {
    children?: JSX.Element[] | JSX.Element;
    isAuthenticated: boolean;
    role: string[];
    requiredRole: boolean;
    user: UserAuthenticate
};

type PublicRouteProps = {
    children: JSX.Element[] | JSX.Element;
    isAuthenticated: boolean;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ children, isAuthenticated }) => {
    return isAuthenticated ? <Navigate replace to={'/home'} /> : children;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, role, user, requiredRole }) => {

    if (!isAuthenticated) return <Navigate replace to={'/login'} />;

    if (requiredRole) if (role && !role.includes(user.rol)) return <Navigate replace to={'unauthorized'} />;

    return (
        <>
            <Header />
            <div className="container mx-auto">
                <MarbellaProvider>
                    <Outlet />
                </MarbellaProvider>
            </div>
            <Footer />
        </>
    );
};


