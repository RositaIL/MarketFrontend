import React from "react"

interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    children: React.ReactNode;
    text?: string;
    colorBG?: string;
    colorText?: string;
    hoverColor?: string;
    activeColor?: string;
    width?: string;
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
}) => {

    const handleClick = () => {
        onClick && onClick();
    };

    return (
        <button
            onClick={handleClick}
            type={type}
            className={`px-5 py-3 ${width} flex items-center justify-center rounded-lg text-${colorText} text-${text} tracking-wider  border-none outline-none bg-${colorBG} hover:${hoverColor} active:${activeColor}`}>
            {children}
        </button>
    )
}
