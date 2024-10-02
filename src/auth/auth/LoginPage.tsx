
import { LoginForm } from "./LoginForm"

export default function LoginPage() {
    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-40 mb-8 mx-auto block' />
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Inicio sesión</h2>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
