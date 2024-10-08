import React, { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

type Options = {
  id: number;
  description: string;
}

type DropdownProps = {
  options: Options[];
  optionSelected: (idOptionSelected: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, optionSelected }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOPtion, setSelectedOption] = useState<string>('Seleccione un item');
  const [search, setSearch] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null);


  const hanldeDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hanldeSelectedOption = (id: number, option: string) => {
    optionSelected(id);
    setSelectedOption(option);
    setIsOpen(!isOpen);
  };

  const searchItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target.value).trim().toLocaleLowerCase();
    setSearch(value);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative font-[sans-serif] w-max my-5" ref={dropdownRef}>
      <button
        type="button"
        onClick={hanldeDropdown}
        id="dropdownToggle"
        className="px-6 py-3 flex items-center justify-between rounded-lg text-white text-sm min-w-[243px] max-w-[243px] tracking-wide border-none outline-none bg-[#007bff] hover:bg-blue-700 active:bg-blue-600"
      >
        {selectedOPtion}
        <IoIosArrowDown className="w-5 h-5 fill-white text-sm font-bold inline ml-3" />
      </button>

      <div
        id="dropdownMenu"
        className={`absolute ${isOpen ? 'block' : 'hidden'} p-4 shadow-xl bg-white z-[1000] w-max rounded-lg max-h-96 overflow-auto min-w-[200px] max-w-[243px]`}
      >
        <input
          onChange={searchItems}
          type="search"
          placeholder="Buscar..."
          className="px-4 py-3 w-full rounded-lg text-black text-sm border-none outline-blue-600 bg-gray-50 focus:bg-transparent"
        />
        <ul>
          {options
            .filter(option => option.description.toLowerCase().includes(search))
            .map((option, index) => {
              return (
                <li
                  key={index}
                  onClick={() => hanldeSelectedOption(option.id, option.description)}
                  className="flex items-center py-3 px-4 hover:bg-gray-50 text-black text-sm cursor-pointer rounded-lg"
                  style={{
                    backgroundColor: option.description.toLowerCase() === selectedOPtion.toLowerCase() ? '#007bff' : '',
                    color: option.description.toLowerCase() === selectedOPtion.toLowerCase() ? 'white' : ''
                  }}
                >
                  <FaUserAlt className="mr-3 inline-block" />
                  {option.description}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
