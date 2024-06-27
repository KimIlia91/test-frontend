import { z } from 'zod'

export const AuthFormSchema = z.object({
    id: z.string().min(1, { message: "Обязательное поле" }),
    name: z.string().min(1, { message: "Обязательное поле" }),
    email: z.string().min(1, { message: "Обязательное поле" }).email({ message: "Введите корректный email" }),
    password: z.string().min(1, { message: "Обязательное поле" }).min(6, "Пароль должен содержать не менее 6 символов"),
    confirmPassword: z.string().min(1, { message: "Обязательное поле" }).min(6, "Пароль должен содержать не менее 6 символов"),  
})

export const RegisterFormSchema = AuthFormSchema.omit({id: true})

export function registerValidator(formData: FormData) {
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        }
    }

    const { name, email, password, confirmPassword } = validatedFields.data

    if (password != confirmPassword) {
        return {
            errors: { confirmPassword: ["Подтверждение пароля не совпадает."] },
            message: 'Missing Fields. Failed to Create User.',
        }
    }

    return { name, email, password }
}

export const LoginFormSchema = AuthFormSchema.omit({id: true, name: true, confirmPassword: true})

export function loginValidator(formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: null,
        }
    }

    const { email, password } = validatedFields.data

    return { email, password }
}
