import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Login } from './Login';
import { startGooleSingIn } from "../../store/thunks/thunkAuth";
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from "sweetalert2";

export const LoginForm = () => {

    const [typePassword, setTypePasswprd] = useState('password');
    const dispatch: any = useDispatch()

    const { startLogin, messageError, status } = useAuthStore();

    useEffect(() => {
        if (messageError !== null) {
            Swal.fire('Error en autenticacion', messageError, "error");
        }

    }, [messageError]);

    const hidenPassword = () => {
        if (typePassword === 'text') {
            setTypePasswprd('password');
        } else {
            setTypePasswprd('text');
        }
    }
    const signInWithGoole = () => {
        dispatch(startGooleSingIn())
    }

    const valuesForm = (values: Login) => {
        console.log('VALORES', values);
        startLogin(values.username, values.password)
    }

    const validateForm = (values: Login) => {
        const errors: Partial<Login> = {};
        if (!values.username) {
            errors.username = 'Por favor ingrese su usuario';
        }
        if (!values.password) {
            errors.password = 'Por favor ingrese su contraseña';
        }
        return errors;
    }

    const formik = useFormik(
        {
            initialValues: {
                username: '',
                password: '',
            },
            onSubmit: (values, { resetForm }) => {
                valuesForm(values);
                resetForm()
            },
            validate: validateForm,

        }
    )

    if (status === 'checking') {
        return (
            <div className="text-center mt-3">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        )
    }

    return (
        <form className="mt-8 space-y-4" onSubmit={formik.handleSubmit}>
            <div>
                <label className="text-gray-800 text-sm mb-2 block">Usuario</label>
                <div className="relative flex items-center">
                    <input
                        name="username"
                        type="text"
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Ingrese su usuario"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                    />
                    <FaUser className="w-4 h-4 absolute right-4" />
                </div>
                <div>
                    {formik.touched.username && formik.errors.username ? <p> {formik.errors.username} </p> : undefined}
                </div>
            </div>

            <div>
                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                <div className="relative flex items-center">
                    <input
                        type={typePassword}
                        name="password"
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Ingrese su constraseña"
                        autoComplete="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {
                        typePassword === 'text'
                            ? <IoEyeOff onClick={hidenPassword} className="w-5 h-5 absolute right-4 cursor-pointer" />
                            : <IoEye onClick={hidenPassword} className="w-5 h-5 absolute right-4 cursor-pointer" />
                    }
                </div>
                <div>
                    {formik.touched.password && formik.errors.password ? <p> {formik.errors.password} </p> : undefined}
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-3 block text-sm text-gray-800" >
                        Recordarme
                    </label>
                </div>
                <div className="text-sm">
                    <a href="/" className="text-blue-600 hover:underline font-semibold">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>

            <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Iniciar Sesión
                </button>
            </div>
            <div className="!mt-3">
                <button onClick={signInWithGoole} type="button" className="w-full flex justify-center gap-4 border-2 border-blue py-2 px-3 text-sm tracking-wide rounded-lg text-black bg-white-600 hover:bg-gray-100 focus:outline-none">
                    <FcGoogle className="w-5 h-5" />
                    <p>Iniciar sesión con google</p>
                </button>
            </div>
            <p className="text-gray-800 text-sm !mt-8 text-center">¿No tienes una cuenta?
                <a href="/" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Registrate aquí</a>
            </p>
        </form>
    )
}
