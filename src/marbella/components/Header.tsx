import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";
import logoHeader from '../../data/logoHeader.jpg'

export const Header = () => {

    const [openMenu, setOpenMenu] = useState<string>('max-lg:hidden');

    const handleMenu = () => {
        if (openMenu === 'max-lg:hidden') {
            setOpenMenu('max-lg:none');
        } else {
            setOpenMenu('max-lg:hidden');
        }
    }

    return (
        <header className='shadow-md font-sans tracking-wide relative z-50'>
            <section className='py-2 bg-[#007bff] text-white text-right px-10'>
                <p className='text-sm'><strong className="mx-3">Dirección:</strong>Lima-Perú 185669<strong className="mx-3">Contacto
                    N°:</strong>1800333665</p>
            </section>

            <div className='flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[70px]'>
                <a href="/"><img src={logoHeader} alt="logo" className='w-36' />
                </a>

                <div id="collapseMenu"
                    className={`${openMenu}  lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}>
                    <button onClick={handleMenu} id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
                        <GrClose className="w-6 h-6" />
                    </button>
                    <Navbar />
                </div>

                <div className='flex max-lg:ml-auto'>
                    <button id="toggleOpen" onClick={handleMenu} className='lg:hidden'>
                        <GiHamburgerMenu className="w-7 h-7" />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Profile />
                </div>
            </div>
        </header >
    )
}
