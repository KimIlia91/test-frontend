import { Metadata } from "next"
import RegisterForm from "@/components/ui/auth/register-form"
import { Suspense } from "react"
import Spinner from "@/components/ui/spinner"

export const metadata: Metadata = {
    title: 'Регистрация',
}

const RegisterPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-24">
            <Suspense fallback={<Spinner />}>
                <RegisterForm />
            </Suspense>
        </main>
    )
}

export default RegisterPage