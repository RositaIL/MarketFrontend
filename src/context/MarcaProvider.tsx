import { createContext, useState } from "react"
import { MarcaContexState } from './types/marcaContextState';

type MarcaProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const MarcaContext = createContext<MarcaContexState>({} as MarcaContexState)

export const MarcaProvider = ({ children }: MarcaProviderProps) => {

    const [marcaNameSerch, setMarcaNameSearch] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const onSetMarcaNameSearch = (search: string) => setMarcaNameSearch(search);

    const onSetEditModeTrue = () => setIsEditMode(true);
    const onSetEditModeFalse = () => setIsEditMode(false);

    return (
        <MarcaContext.Provider value={{ marcaNameSerch, onSetMarcaNameSearch, isEditMode, onSetEditModeFalse, onSetEditModeTrue }}>
            {children}
        </MarcaContext.Provider>
    )
}
