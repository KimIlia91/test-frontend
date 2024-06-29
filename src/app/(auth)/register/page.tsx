import { Metadata } from "next"
import RegisterForm from "@/components/ui/auth/register-form"

export const metadata: Metadata = {
    title: 'Регистрация',
}

const RegisterPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-24">
            <RegisterForm />
        </main>
    )
}

export default RegisterPage