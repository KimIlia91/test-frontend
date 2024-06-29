import { Suspense } from "react"
import { Metadata } from "next"
import Spinner from "@/components/ui/spinner"
import LoginForm from "@/components/ui/auth/login-form"

export const metadata: Metadata = {
  title: 'Вход',
}

const LoginPage = async() => {

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center">
        <Suspense fallback={<Spinner />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}

export default LoginPage