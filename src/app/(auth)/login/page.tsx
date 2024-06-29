import { auth } from "@/auth"
import { Metadata } from "next"
import LoginForm from "@/components/ui/auth/login-form"
import SessionProviderWrapper from "@/components/hoc/session-provider"

export const metadata: Metadata = {
  title: 'Вход',
}

const LoginPage = async() => {
  const session = await auth()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center">
        <SessionProviderWrapper session={session}>
          <LoginForm />
        </SessionProviderWrapper>
      </div>
    </main>
  )
}

export default LoginPage