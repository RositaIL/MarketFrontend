

export type MarcaContexState = {
    marcaNameSerch: string,
    onSetMarcaNameSearch: (search: string) => void,

    isEditMode: boolean
    onSetEditModeTrue: () => void,
    onSetEditModeFalse: () => void,
}