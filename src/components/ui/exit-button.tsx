import { signOut } from '@/auth'
import { Button } from './button'
import { Logout } from '@/assets'

export default function ExitButton() {
  return (
    <form action={async() => {
        'use server'
        await signOut()
      }}>
        <Button variant={"link"}>
          <Logout className="sm:hidden"/>
          <p className='hidden sm:inline'>Выход</p>
        </Button>
    </form>
  )
}
