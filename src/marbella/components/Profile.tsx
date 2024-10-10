import { useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootState";
import { useAuthStore } from "../hooks/useAuthStore";

export const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { logoutUser } = useAuthStore();

    const logout = () => {
        logoutUser('');
    }

    const handleProfile = () => {
        setIsOpen(!isOpen);
    }

    return (

        <div className="relative ml-3">
            <div>
                <button onClick={handleProfile} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="user-logo" />
                </button>
            </div>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0"> {user.nombre}</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">{user.correo}</a>
                    <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Cerrar sesion</button>
                </div>
            )}

        </div>
    )
}
