
import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <ul
            className='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
            <li className='mb-6 hidden max-lg:block'>
                <a href="/"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                </a>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/home'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Home
                </NavLink>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/marca'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Marca
                </NavLink>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/categoria'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Categoria
                </NavLink>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/productos'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Productos
                </NavLink>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/usuario'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Usuario
                </NavLink>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/proveedor'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Proveedor
                </NavLink>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
                <NavLink to={'/reportes'} className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>
                    Reportes
                </NavLink>
            </li>
        </ul>
    )
}
