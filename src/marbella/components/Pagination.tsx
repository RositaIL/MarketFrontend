import React from 'react'
import { GrPrevious } from 'react-icons/gr';

type PaginationProps = {
    paginaActual: number;
    totalPagina: number;
    handlePageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ paginaActual, totalPagina, handlePageChange }) => {

    const onPageChange = (page: number) => {
        handlePageChange(page);
    }

    const renderPagination = () => {

        const buttons = [];
        const maxButtons = 3;
        let startPage = Math.max(0, paginaActual - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPagina - 1, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(0, endPage - maxButtons + 1);
        }

        buttons.push(
            <button
                key="first"
                onClick={() => onPageChange(0)}
                disabled={paginaActual === 0}
                className='text-white bg-[#007bff] w-full px-5 rounded-md'
            >
                Primera
            </button>

        );

        buttons.push(
            <button
                onClick={() => onPageChange(paginaActual - 1)}
                disabled={paginaActual === 0}
                key="prev"
                className="flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-lg"
            >
                <GrPrevious className="w-4 fill-gray-400" />
            </button>
        );

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    disabled={i === paginaActual}
                    className="flex items-center justify-center shrink-0 hover:bg-gray-50  border-2 cursor-pointer text-base font-bold text-[#333] w-10 h-10 rounded-lg"
                    style={{ backgroundColor: i === paginaActual ? '#007bff' : '', color: i === paginaActual ? 'white' : '' }}
                >
                    {i + 1}
                </button>
            );
        }
        buttons.push(
            <button
                onClick={() => onPageChange(paginaActual + 1)}
                disabled={paginaActual === totalPagina - 1}
                key="next"
                className="flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-lg">
                <GrPrevious className="w-4 fill-gray-400 rotate-180" />
            </button>
        );

        buttons.push(

            <button
                key="last"
                onClick={() => onPageChange(totalPagina - 1)}
                disabled={paginaActual === totalPagina - 1}
                className='text-white bg-[#007bff] w-full px-5 rounded-md'
            >
                Última
            </button>
        );

        return buttons;
    };


    return (
        <>{renderPagination()}</>
    )
}

