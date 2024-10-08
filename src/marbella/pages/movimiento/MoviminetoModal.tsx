import { BsCalendarDateFill } from "react-icons/bs";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";
import Dropdown from "../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { useEffect, useState } from "react";
import { obtenerProductos } from "../../../store/thunks/thunkProducto";
import { StoreDispatch } from "../../../store/store";
import { MdOutlineAddCircle } from "react-icons/md";
import { DetalleTabla } from "./DetalleTabla";
import { useFormik } from "formik";
import { DetalleEntrada, EntradaProducto } from "../../types/entrada";
import { agregarDetalleEntrada } from "../../../store/thunks/thunkDetalleEntrada";
import { guardarEntrada } from "../../../store/thunks/thunkEntradaProducto";
import { obtenerProveedores } from "../../../store/thunks/thunkProveedor";
import { IoClose } from "react-icons/io5";

const intialValuesEntrada: DetalleEntrada = {
    idProducto: 0,
    precio: 0.0,
    cantidad: 0
}

type MovimientoModalProps = {
    handleCloseModal: () => void;
}

export const MovimientoModal: React.FC<MovimientoModalProps> = ({ handleCloseModal }) => {

    const [idProduct, setIdProduct] = useState<number>(0);
    const [idProveedor, setIdProveedor] = useState<number>(0);
    // const fechaActual = new Date().toLocaleDateString('es-ES');
    const fechaActual = new Date().toISOString().split('T')[0];
    const { productos } = useSelector((state: RootState) => state.producto);
    const { proveedores } = useSelector((state: RootState) => state.proveedor);
    const { detalleEntradas } = useSelector((state: RootState) => state.detalleEntrada);

    const dispatch: StoreDispatch = useDispatch();

    const productSelected = (idProducto: number) => setIdProduct(idProducto);
    const proveedorSelected = (idProve: number) => setIdProveedor(idProve);


    const registrarEntrada = () => {
        if (idProveedor && idProveedor !== 0) {
            const entrada: EntradaProducto = {
                idEntrada: 0,
                fechaEntrada: fechaActual,
                idProveedor: idProveedor,
                idUsuario: 1,
                detalleEntrada: detalleEntradas
            };
            dispatch(guardarEntrada(entrada));
        };
    };


    const validaciondeForm = (values: DetalleEntrada) => {
        const errors: Partial<DetalleEntrada> = {};
        if (!values.cantidad || parseInt(values.cantidad.toString()) < 1) {
            errors.cantidad = 'Este campo no puede estar vacio'
        }
        if (!values.precio || parseInt(values.precio.toString()) < 1) {
            errors.precio = 'Este campo no puede estar vacio'
        }
        if (!idProduct || parseInt(idProduct.toString()) === 0) {
            errors.idProducto = 'Este campo no puede estar vacio'
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: intialValuesEntrada,
        onSubmit: (values: DetalleEntrada, { resetForm }) => {
            dispatch(agregarDetalleEntrada({ ...values, idProducto: idProduct }));
            resetForm();
        },
        validate: validaciondeForm
    });

    const optionsProducts = productos.map(pro => {
        return {
            id: pro.idPro,
            description: pro.nombrePro
        }
    });
    const optionsProveedors = proveedores.map(pro => {
        return {
            id: pro.idProveedor,
            description: pro.nombreProv,
        }
    })

    useEffect(() => {
        dispatch(obtenerProductos());
        dispatch(obtenerProveedores());
    }, [])

    return (
        <div className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
            <div className={`w-full bg-white max-w-4xl shadow-lg rounded-lg p-8 relative`}>
                <IoClose
                    onClick={() => handleCloseModal()}
                    className="w-6 h-6 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                />
                <div className="mb-12">
                    <h3 className="text-[#007bff] text-3xl font-bold text-center">Registrar nuevo entrada</h3>
                </div>
                <form onSubmit={formik.handleSubmit}
                    className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6">
                    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                        <div className="col-span-full flex justify-between flex-wrap">
                            <div className="relative flex items-center">
                                <label className="text-[#007bff] absolute top-[-10px] left-0 font-bold">Fecha</label>
                                <input
                                    value={fechaActual}
                                    disabled={true}
                                    type="text"
                                    placeholder="Enter first name"
                                    className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#007bff] outline-none" />
                                <BsCalendarDateFill className="w-[18px] h-[18px] absolute right-2 text-[#007bff]" />
                            </div>

                            <div className="relative flex items-center">
                                <label className="text-[#007bff] absolute top-[-10px] left-0 font-bold">Proveedor</label>
                                <Dropdown options={optionsProveedors} optionSelected={proveedorSelected} />
                            </div>

                            <div className="relative flex items-center">
                                <label className={`text-${formik.touched.idProducto && formik.errors.idProducto ? 'red-500' : '[#007bff]'} absolute top-[-10px] left-0 font-bold`}>Producto</label>
                                <Dropdown options={optionsProducts} optionSelected={productSelected} />
                            </div>
                        </div>

                        <div className="col-span-full flex justify-between flex-wrap">
                            <div className="relative flex items-center">
                                <label
                                    className={`text-${formik.touched.cantidad && formik.errors.cantidad ? 'red-500' : '[#007bff]'} absolute top-[-10px] left-0 font-bold`}>
                                    Cantidad
                                </label>
                                <input
                                    value={formik.values.cantidad}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="cantidad"
                                    type="number"
                                    placeholder="Cantidad..."
                                    className="px-2 no-spinners appearance-none pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#007bff] outline-none" />
                                <FaSortAmountUpAlt className="w-[18px] h-[18px] absolute right-2 text-[#007bff]" />
                            </div>

                            <div className="relative flex items-center">
                                <label
                                    className={`text-${formik.touched.precio && formik.errors.precio ? 'red-500' : '[#007bff]'} absolute top-[-10px] left-0 font-bold`}>
                                    Precio
                                </label>
                                <input
                                    value={formik.values.precio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="precio"
                                    type="number"
                                    placeholder="Precio..."
                                    className="px-2 no-spinners appearance-none pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#007bff] outline-none" />
                                <BiSolidDollarCircle className="w-6 h-6 absolute right-2 text-[#007bff]" />
                            </div>
                            <div className="relative flex items-center">
                                <button
                                    type="submit"
                                    onClick={() => { }}
                                    id="dropdownToggle"
                                    className="px-6 py-3 flex items-center justify-around rounded-lg text-white text-sm min-w-[150px] tracking-wide border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
                                >
                                    <MdOutlineAddCircle className="w-5 h-5 fill-white text-sm font-bold inline ml-3" />
                                    Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                    <DetalleTabla />
                    <button
                        onClick={registrarEntrada}
                        type="button"
                        className="mt-10 px-2 py-2.5 w-full rounded-sm text-sm bg-[#333] hover:bg-[#222] text-white">Registrar la Entrada </button>
                </form>
            </div>
        </div>

    )
}
