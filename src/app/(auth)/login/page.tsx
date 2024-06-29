import { Metadata } from "next"
import LoginForm from "@/components/ui/auth/login-form"

export const metadata: Metadata = {
  title: 'Вход',
}

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage