import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchProps {
    name: string,
    hadleSearch: (buscar: string) => void
}

export const Search: React.FC<SearchProps> = ({ name, hadleSearch }) => {
    const [search, setSearch] = useState<string>('');

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value);
        hadleSearch(target.value);
    };
    const handleSearch = () => {
        hadleSearch(search);
    };

    return (
        <div className="flex rounded-[18px] border-2 border-[#007bff] overflow-hidden max-w-md  font-[sans-serif]">
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder={`Buscar ${name}...`}
                className="w-full outline-none bg-white text-sm px-5 py-3"
            />
            <button
                onClick={handleSearch}
                type='button'
                className="flex items-center justify-center bg-[#007bff] hover:bg-blue-600 px-6"
            >
                <IoSearchOutline className="w-6 h-6 text-white" />
            </button>
        </div>
    )
}
