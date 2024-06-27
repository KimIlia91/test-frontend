'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { BackRow } from '@/assets'

export default function BackButton() {
    const router = useRouter()

    return (
        <Button variant={"link"} position={`back`} onClick={() => router.back()}>
            <BackRow className="sm:hidden"/>
            <p className='hidden sm:inline'>Назад</p>
        </Button>
    )
}
