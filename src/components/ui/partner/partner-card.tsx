'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { HeardLike, HeardUnlike } from "@/assets"
import { deleteIsFavorite, setIsFavorite } from "@/services/partner-service"

type PartnerCardProps = {
    id: string
    name: string
    image: string
    isFavorite: boolean
}

export default function PartnerCard({
    id,
    name,
    image,
    isFavorite,
}: PartnerCardProps) {
    const router = useRouter()
    const [isLike, setIsLike] = useState(isFavorite)
    const [isLoading, setIsLoading] = useState(false)
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        if (trigger) {
            setIsLoading(true)
            const request = isLike ? deleteIsFavorite : setIsFavorite
            request(id)
            .then(() => setIsLike(!isLike))
            .finally(() => {
                setIsLoading(false)
                setTrigger(false)
            })
        }
    }, [trigger])

    const onSetIsLike = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setTrigger(true)
    }

    const onGetPartner = (id: string) => {
        router.push(`/partner/${id}`)
    }

    console.log("render card")

    return (
        <li
            key={`partner-${id}`}
            className="flex items-center flex-col gap-4 h-[263px] w-[305px] p-7 border bg-white rounded-xl shadow-[0px_1px_3.98px_0px_rgba(51,51,51,0.15)] hover:border-black hover:scale-105 transition-all duration-300"
            onClick={() => onGetPartner(id)}
        >
            <Image
                src={`${image}`}
                height={124}
                width={124}
                alt={`image-${name}`}
            />
            <h2 className="text-xl font-normal leading-6">{name}</h2>
            <div className="ml-auto">
                {isLoading ? (
                    <Loader className="animate-pulse w-4 h-4 rounded-full" />
                ) : (
                    <button onClick={onSetIsLike}>
                        {isLike ? <HeardLike /> : <HeardUnlike />}
                    </button>
                )}
            </div>
        </li>
    )
}
