import { Metadata } from "next"
import LoginForm from "@/components/ui/auth/login-form"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: 'Вход',
}

const LoginPage = async() => {

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center">
        <Suspense fallback={<p>Loading...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}

export default LoginPage