import { ReactNode } from "react"

type InputFormProps = {
    id: string,
    name: string,
    type: string,
    placeholder: string,
    lable: string,
    autoComplete?: string,
    errors?: string[], 
    children?: ReactNode | null,
}

export default function InputForm({
    id,
    name,
    type,
    placeholder,
    lable,
    autoComplete = "off",
    errors,
    children = null,
}: InputFormProps) {
    return (
        <div className="relative flex flex-col gap-2">
            <label
                htmlFor={id}
                className="text-[16px]"
            >{lable}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`bg-[#F8F8F8] py-3 pl-2 pr-4 h-[48px] rounded-md text-[16px] focus-visible:border-gray-500 ${errors ? "border-red-600 border-2" : ""}`}
            />
            {children && (
                <div className="absolute right-2 top-[55%]">
                    {children}
                </div>
            )}
            <div id={`${name}-error"`} aria-live="polite" aria-atomic="true" className="absolute -bottom-6">
                {errors &&
                    <p className="text-sm text-red-500">
                        {errors[0]}
                    </p>
                }
            </div>
        </div>
    )
}