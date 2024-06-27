import { ReactNode } from 'react'

type HeaderProps = {
    children: ReactNode
}

const Header = ({
    children
}: HeaderProps) => {
  return (
    <header className="pb-16 pt-6 md:pt-10 bg-[#512689] mb-12">
        <div className="container relative">
            {children}
        </div>
    </header>
  )
}

export default Header