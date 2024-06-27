import Link from 'next/link'
import { UserCircle } from 'lucide-react'
import { Logout } from '@/assets'
import { Button } from './button'
import { signOut } from '@/auth'

export default function ProfilePanel() {
  return (
    <div className="absolute -top-4 right-5 flex gap-2 items-center">
        <Link href={"/profile"}>
            <UserCircle className="md:w-8 md:h-8 text-white/80 hover:text-white/50 transition-colors duration-300"/>
        </Link>
        <form action={async() => {
            'use server'
            await signOut()
        }}>
            <Button variant={"link"}>
                <Logout className="sm:hidden"/>
                <p className='hidden sm:inline'>Выход</p>
            </Button>
        </form>
    </div>
  )
}
