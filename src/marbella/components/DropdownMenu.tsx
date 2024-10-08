import React from 'react'

type DropdownMenuProps = {
    getDataWithLimit: (size: number) => void;
    pageSize: number
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ pageSize, getDataWithLimit }) => {

    const getWithLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const size = parseInt(event.target.value);
        getDataWithLimit(size);
    };

    return (
        <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">Display</p>
            <select
                value={pageSize}
                onChange={getWithLimit}
                className="text-sm h-10 w-20 border border-blue-400 rounded px-1 outline-none bg-[#007bff] text-white"
            >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
            </select>
        </div>
    )
}
