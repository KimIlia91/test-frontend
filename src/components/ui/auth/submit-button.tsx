import { useFormStatus } from "react-dom"
import { Button } from "../button"
import { LoaderIcon } from "lucide-react"

type SubmitButtonProps = {
    title: "Войти" | "Зарегистрироваться"
}

export default function SubmitButton({
    title
}: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button variant={"registerForm"} type="submit" disabled={pending}>
            {pending ? <LoaderIcon className="animate-pulse rounded-full" /> : title}
        </Button>
    )
}
