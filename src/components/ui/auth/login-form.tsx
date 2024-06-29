'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import InputForm from "./input-form"
import PasswordInput from "./password-input"
import { Button } from "@/components/ui/button"
import { LoginState, login } from "@/services/auth-service"

export default function LoginForm() {
    const initialState = { errors: {}, message: null }
    const [state, dispatch] = useFormState<LoginState, FormData>(login, initialState)

    return (
        <div className="max-w-[500px] w-full rounded-[16px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] bg-white p-4">
            <h1 className="text-xl mb-4 text-center font-bold">Вход</h1>
            <div aria-live="polite" aria-atomic="true">
                {state?.message &&
                    <p className="mt-2 text-center text-sm text-red-500" key={state?.message}>
                        {state?.message}
                    </p>
                }
            </div>
            <form action={dispatch} className="flex flex-col gap-8">
                <InputForm 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.ru"
                    lable="Электронная почта"
                    autoComplete="email"
                    errors={state?.errors?.email}
                />
                <PasswordInput 
                    id="password"
                    name="password"
                    placeholder="******"
                    lable="Пароль"
                    autoComplete="password"
                    errors={state?.errors?.password}
                />
                <Button variant={"registerForm"} type="submit">
                    Войти
                </Button>
            </form>
            <Link href={`/register`} className="block text-center mt-4 hover:underline text-gray-500 hover:text-black transition-all duration-300">
                Зарегистрироваться
            </Link>
        </div>
    )
}
