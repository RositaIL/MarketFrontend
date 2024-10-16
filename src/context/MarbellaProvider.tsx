import { createContext, useState } from "react"
import { MarbellaContexState } from './MarbellaContextState';

type MarcaProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const MarbellaContext = createContext<MarbellaContexState>({} as MarbellaContexState)

export const MarbellaProvider = ({ children }: MarcaProviderProps) => {

    const [marcaNameSerch, setMarcaNameSearch] = useState<string>('');
    const [categoriaNameSearch, setCategoriaNameSearch] = useState<string>('');
    const [productoNameSearch, setProductoNameSearch] = useState<string>('');
    const [usuarioNameSearch, setUsuarioNameSearch] = useState<string>('');
    const [proveedorNameSearch, setProveedorNameSearch] = useState<string>('');

    const onSetMarcaNameSearch = (search: string) => setMarcaNameSearch(search);
    const onSetCategoriaNameSearch = (search: string) => setCategoriaNameSearch(search);
    const onSetProductoNameSearch = (search: string) => setProductoNameSearch(search);
    const onSetProveedorNameSearch = (search: string) => setProveedorNameSearch(search);
    const onSetUsuarioNameSearch = (search: string) => setUsuarioNameSearch(search);

    return (
        <MarbellaContext.Provider value={{
            marcaNameSerch, onSetMarcaNameSearch,
            categoriaNameSearch, onSetCategoriaNameSearch,
            productoNameSearch, onSetProductoNameSearch,
            proveedorNameSearch, onSetProveedorNameSearch,
            usuarioNameSearch, onSetUsuarioNameSearch,
        }}>
            {children}
        </MarbellaContext.Provider>
    )
}
