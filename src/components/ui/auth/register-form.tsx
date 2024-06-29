'use client'

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import Spinner from "../spinner"
import InputForm from "./input-form"
import PasswordInput from "./password-input"
import { Button } from "@/components/ui/button"
import { AuthState, register } from "@/services/auth-service"

export default function RegisterForm() {
    const initialState = { errors: {}, message: null }
    const [state, dispatch] = useFormState<AuthState, FormData>(register, initialState)
    const { pending } = useFormStatus()

    return (
        <div className="max-w-[500px] w-full rounded-[16px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] bg-white p-4">
            <h1 className="text-xl mb-4 text-center font-bold">Регистрация</h1>
            <form action={dispatch} className="flex flex-col gap-8">
                <InputForm 
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Артур"
                    lable="Имя"
                    autoComplete="name"
                    errors={state.errors?.name}
                />
                <InputForm 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.ru"
                    lable="Электронная почта"
                    autoComplete="email"
                    errors={state.errors?.email}
                />
                <PasswordInput 
                    id="password"
                    name="password"
                    placeholder="******"
                    lable="Пароль"
                    errors={state.errors?.password}
                />
                <PasswordInput 
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="******"
                    lable="Подтверждение пароля"
                    errors={state.errors?.confirmPassword}
                />
                <Button variant={"registerForm"} type="submit">
                    {pending ? <Spinner /> : "Зарегистрироваться"}
                </Button>
            </form> 
            <Link href={`/login`} className="block text-center mt-4 hover:underline text-gray-500 hover:text-black transition-all duration-300">
                Войти
            </Link>
        </div>
    )
}
