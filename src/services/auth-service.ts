'use server'

import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { signIn } from '@/auth'
import { addUser, getUserByEmail } from '@/data/repository'
import { loginValidator, registerValidator } from '@/lib/auth/auth-validator'

export type AuthState = {
    errors?: { 
        name?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
    }
    message?: string | null
}

export async function register(
    prevState: AuthState,
    formData: FormData,
) {
    const { name, email, password, errors, message } = registerValidator(formData)

    if (errors || message) return { errors, message }

    try {
        const user = await getUserByEmail(email)

        if (user) {
            return {
                errors: {},
                message: 'Пользователь уже зарегистрирован.',
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        addUser(name, email, hashPassword)
    } catch(error) {
        return {
            errors: {},
            message: 'Произошла ошибка во время регистрации.',
        }
    }

    redirect('/login')
}

export type LoginState = {
    errors?: { 
        email?: string[]
        password?: string[]
    }
    message?: string | null
}

export async function login(
    prevState: LoginState,
    formData: FormData,
) {
    const { email, password, message, errors } = loginValidator(formData)

    if (message || errors) return { message, errors }

    try {
        await signIn('credentials', { email, password });
        return {}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CallbackRouteError':
                    return {message: "Неверные учётные данные."}
                default:
                    return {message: "Произошла ошибка попробуйте позже."}
            }
        }
        throw error
    }
}
