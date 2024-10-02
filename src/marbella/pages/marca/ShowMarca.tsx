import React from "react"
import { useDispatch, UseDispatch } from "react-redux";
import { Marca } from "../../interface/marca"
import { useFormik } from "formik";
import { actualizarMarca } from "../../../store/thunks/thunkMarca";

interface ShowModalProps {
    isOpen: boolean;
    marca?: Marca;
    closeShowMarca: () => void;
}

export const ShowMarca: React.FC<ShowModalProps> = ({ isOpen, marca, closeShowMarca }) => {

    const dispatch: any = useDispatch();

    const closeModal = () => {
        closeShowMarca();
    }

    const guardarMarca = (newMarca: Marca) => {
        dispatch(actualizarMarca(newMarca.idMarca, newMarca));
    }

    const validate = (values: Marca) => {
        const errors: Partial<Marca> = {};
        if (!values.nombreMarca) {
            errors.nombreMarca = 'El nombre de marca es obligatorio';
        }
        return errors;
    }
    const valuesForm = (values: Marca) => {
        guardarMarca(values);
        closeModal();
    }

    const formik = useFormik(
        {
            initialValues: {
                idMarca: marca?.idMarca || '',
                nombreMarca: marca?.nombreMarca || ''
            },
            onSubmit: (values, { resetForm }) => {
                valuesForm(values);
                resetForm();
            },
            validate: validate
        }
    )

    return (
        <div
            className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
                <div className="flex items-center">
                    <h3 className="text-blue-600 text-xl font-bold flex-1">Agregar nueva marca</h3>
                </div>

                <form className="space-y-4 mt-8" onSubmit={formik.handleSubmit} >
                    <div>
                        <label className={`text-${formik.errors.nombreMarca ? 'red' : 'blue'}-800 text-sm mb-2 block`}>Descripción</label>
                        <input
                            name="nombreMarca"
                            value={formik.values.nombreMarca}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            placeholder="Ingrese su descripción"
                            className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-2 border-${formik.errors.nombreMarca ? 'red' : 'gray'}-400 focus:outline-blue-600 focus:bg-transparent rounded-lg`}
                        />
                        {/* {formik.touched.nombreMarca && formik.errors.nombreMarca ? <p> {formik.errors.nombreMarca} </p> : undefined} */}
                    </div>
                    <div className="flex justify-end gap-4 !mt-8">
                        <button onClick={closeModal} type="button"
                            className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300">Cancelar</button>
                        <button type="submit"
                            className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700">Agregar marca</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
