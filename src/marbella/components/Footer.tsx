
import { NavLink } from 'react-router-dom';
import logo from '../../data/marbella-Logo2.png';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#00293b] via-[#00296b] to-[#00293b] p-10 font-[sans-serif] tracking-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="lg:flex lg:items-center">
                    <NavLink to={'/home'}>
                        <img src={logo} alt="logo" width={120} />
                    </NavLink>
                </div>

                <div className="lg:flex lg:items-center flex items-center">
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink to={'/home'}>
                                <FaFacebookSquare className="fill-gray-300 hover:fill-white w-7 h-7" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/home'}>
                                <FaInstagram className="fill-gray-300 hover:fill-white w-7 h-7" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/home'}>
                                <FaTwitter className="fill-gray-300 hover:fill-white w-7 h-7" />
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
                    <ul className="space-y-4">
                        <li>
                            <NavLink to={'/home'} className="text-gray-300 hover:text-white text-sm">
                                Phone:
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/home'} className="text-gray-300 hover:text-white text-sm">
                                Telefono
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/home'} className="text-gray-300 hover:text-white text-sm">
                                Direccion
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-6 text-white">Information</h4>
                    <ul className="space-y-4">
                        <li>
                            <NavLink to={'/home'} className="text-gray-300 hover:text-white text-sm">
                                Acerca
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/home'} className="text-gray-300 hover:text-white text-sm">
                                Condiciones
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/home'} className="text-gray-300 hover:text-white text-sm">
                                Policia
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
