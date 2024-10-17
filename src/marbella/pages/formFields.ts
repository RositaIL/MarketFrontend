

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
        placeholder: "Ingrese su direccion",
    },
    {
        name: "telefProv",
        label: "Telefono",
        type: "text",
        placeholder: "Ingrese el telefono",
    },
    {
        name: "rucProv",
        label: "Ruc",
        type: "text",
        placeholder: "Ingrese el ruc",
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
        label: "Nombres Completos",
        type: "text",
        placeholder: "Ingrese sus nombres",
    },
    {
        name: "emailUsu",
        label: "Email",
        type: "text",
        placeholder: "Ingrese sus nombres",
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
        label: "producto",
        type: "text",
        placeholder: "Ingrese el producto",
    },
    {
        name: "descripcionPro",
        label: "descrpcion",
        type: "text",
        placeholder: "Ingrese la descripion",
    },
    {
        name: "precioPro",
        label: "precio",
        type: "number",
        placeholder: "Ingrese el precio",
    },
    {
        name: "stockActual",
        label: "stock actual",
        type: "number",
        placeholder: "Ingrese stock actual",
    },
    {
        name: "stockMin",
        label: "stock minimo",
        type: "number",
        placeholder: "Ingrese stock minimo",
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
        label: "Categoria",
        type: "text",
        placeholder: "Ingrese la categoria",
    },
];

export const NavItems = [
    { to: '/home', label: 'Home', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/marca', label: 'Marca', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/categoria', label: 'Categoria', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/producto', label: 'Productos', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/usuario', label: 'Usuario', roles: ['ADMINISTRADOR'] },
    { to: '/proveedor', label: 'Proveedor', roles: ['ADMINISTRADOR'] },
    { to: '/entrada', label: 'Entrada', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/salida', label: 'Salida', roles: ['ADMINISTRADOR', 'EMPLEADO'] },
    { to: '/reporte', label: 'Reportes', roles: ['ADMINISTRADOR', 'EMPLEADO'] }
];
