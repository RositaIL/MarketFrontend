
import { LoginForm } from "./LoginForm"

export default function LoginPage() {
    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
