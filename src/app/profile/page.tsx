import Image from "next/image"
import { signOut } from "@/auth"
import { Email, Logout } from "@/assets"
import Header from "@/components/hoc/header"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/ui/back-button"
import { featchUserProfile } from "@/data/repository"

export default async function ProfilePage() {
  const user = await featchUserProfile()

  return (
    <main>
      <Header>
        <BackButton />
        <div className="flex flex-col md:flex-row items-center text-white md:pt-0 gap-4 md:pl-24 lg:pl-52">
          <div className='order-1 md:order-2'>
            <p className="text-xl leading-6 max-w-[846px] text-center md:text-start">Профиль</p>
            <h1 className="text-4xl md:text-[64px] md:leading-[75px] leading-10">{user.name}</h1>
          </div>
        </div>
        <div className="absolute -top-4 right-5 flex gap-2 items-center">
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
      </Header>
      <div className='container'>
        <div className='flex items-start flex-wrap gap-10 md:pl-24 lg:pl-52'>
          <Image 
            src={`${user.image}`}
            width={128}
            height={128}
            alt={`image-${user.name}`}
          />
          <div className='flex gap-2'>
            <Email />
            {user.email}
          </div>
        </div>
      </div>
    </main>
  )
}
