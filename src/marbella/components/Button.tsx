import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootState";

type ButtonProps = {
    onClick: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    children: React.ReactNode;
    text?: string;
    colorBG?: string;
    colorText?: string;
    hoverColor?: string;
    activeColor?: string;
    width?: string;
    movimiento?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    width,
    text = 'sm',
    type = 'button',
    colorBG = '[#007bff]',
    colorText = 'white',
    hoverColor = 'bg-blue-800',
    activeColor = 'bg-blue-600',
    movimiento = false,
}) => {
    const { user } = useSelector((state: RootState) => state.auth)

    const rolUser = !user.rol.includes('ADMINISTRADOR') && !movimiento

    const handleClick = () => {
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            disabled={rolUser}
            type={type}
            className={`px-5 py-3 ${width} flex items-center justify-center rounded-lg text-${colorText} text-${text} 
            tracking-wider  border-none outline-none bg-${rolUser ? 'red-200' : colorBG} hover:${hoverColor} active:${rolUser ? 'bg-red-200' : activeColor}`}>
            {children}
        </button>
    )
}
