
import { NavLink } from "react-router-dom"
import logoHeader from '../../data/logoHeader.jpg'
import { NavItems } from "../pages/formFields"
import { useSelector } from "react-redux"
import { RootState } from "../../store/rootState"

export const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navItems = NavItems;

    return (
        <ul
            className='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
            <li className='mb-6 hidden max-lg:block'>
                <a href="/"><img src={logoHeader} alt="logo" className='w-36' />
                </a>
            </li>

            {navItems.map((item, index) => item.roles.includes(user.rol) && (
                <li key={index} className='max-lg:border-b max-lg:py-3 px-3'>
                    <NavLink
                        to={item.to}
                        className='hover:text-[#007bff] text-[#007bff] p-2 block font-bold text-[15px]'
                        style={({ isActive, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                borderBottom: isActive ? "3px solid #007bff" : "",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
