
export type MarbellaContexState = {
    marcaNameSerch: string,
    onSetMarcaNameSearch: (search: string) => void,
    categoriaNameSearch: string,
    onSetCategoriaNameSearch: (search: string) => void,
    usuarioNameSearch: string,
    onSetUsuarioNameSearch: (search: string) => void,
    proveedorNameSearch: string,
    onSetProveedorNameSearch: (search: string) => void,
    productoNameSearch: string,
    onSetProductoNameSearch: (search: string) => void,
}