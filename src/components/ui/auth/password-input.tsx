'use client'

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import InputFrom from "./input-form"

type PasswordInputFormProps = {
    id: string,
    name: string,
    placeholder: string,
    lable: string,
    autoComplete?: string,
    errors?: string[],
}

export default function PasswordInput({
    id,
    name,
    placeholder,
    lable,
    autoComplete = "new-password",
    errors,
} : PasswordInputFormProps) {

    const [isShowPaswword, setIsShowPassword] = useState(false)

    const onShowPassword = () => {
        setIsShowPassword(isShowPaswword => !isShowPaswword)
    }

    return (
        <InputFrom
            id={id}
            name={name}
            type={ isShowPaswword ? "text" : "password" }
            placeholder={placeholder}
            lable={lable}
            autoComplete={autoComplete}
            errors={errors}
        >
            <button
                type="button"
                className="w-6 h-6 text-[#808185]"
                onClick={onShowPassword}
            >
                {isShowPaswword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
        </InputFrom>
    )
}