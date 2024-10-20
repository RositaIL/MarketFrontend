

export const ProveedorFields = [
    {
        name: "nombreProv",
        label: "Proveedor",
        type: "text",
        placeholder: "Ingrese el proveedor",
    },
    {
        name: "direccProv",
        label: "Dirección",
        type: "text",
        placeholder: "Ingrese su dirección",
    },
    {
        name: "telefProv",
        label: "Teléfono",
        type: "text",
        placeholder: "Ingrese el teléfono",
    },
    {
        name: "rucProv",
        label: "Ruc",
        type: "text",
        placeholder: "Ingrese el Ruc",
    },
    {
        name: "emailProv",
        label: "Email",
        type: "text",
        placeholder: "Ingrese el correo",
    },
    {
        name: "nomRepresentante",
        label: "Representante",
        type: "text",
        placeholder: "Ingrese el representante",
    },
];

export const UsuarioFields = [
    {
        name: "nombresApellidosUsu",
        label: "Nombres completos",
        type: "text",
        placeholder: "Ingrese sus nombres",
    },
    {
        name: "emailUsu",
        label: "Email",
        type: "text",
        placeholder: "Ingrese su Email",
    },
    {
        name: "username",
        label: "Usuario",
        type: "text",
        placeholder: "Ingrese su usuario",
    },
    {
        name: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "Ingrese su contraseña",
    },
];

export const FieldsProducts = [
    {
        name: "nombrePro",
        label: "Producto",
        type: "text",
        placeholder: "Ingrese el producto",
    },
    {
        name: "descripcionPro",
        label: "Descrpción",
        type: "text",
        placeholder: "Ingrese la descripción",
    },
    {
        name: "precioPro",
        label: "Precio",
        type: "number",
        placeholder: "Ingrese el precio",
    },
    {
        name: "stockActual",
        label: "Stock actual",
        type: "number",
        placeholder: "Ingrese stock actual",
    },
    {
        name: "stockMin",
        label: "Stock mínimo",
        type: "number",
        placeholder: "Ingrese stock mínimo",
    }
];

export const MarcaFields = [
    {
        name: "nombreMarca",
        label: "Marca",
        type: "text",
        placeholder: "Ingrese la marca",
    },
];

export const CategoriaFields = [
    {
        name: "nombreCategoria",
        label: "Categoría",
        type: "text",
        placeholder: "Ingrese la categoría",
    },
];

export const NavItems = [
    { to: '/home', label: 'Home', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/marca', label: 'Marca', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/categoria', label: 'Categoría', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/producto', label: 'Productos', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/usuario', label: 'Usuario', roles: ['ADMINISTRADOR'] },
    { to: '/proveedor', label: 'Proveedor', roles: ['ADMINISTRADOR'] },
    { to: '/entrada', label: 'Entrada', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/salida', label: 'Salida', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/reporte', label: 'Reporte', roles: ['ADMINISTRADOR', 'EMPLEADO'] }
];
