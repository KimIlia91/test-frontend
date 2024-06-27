import Link from 'next/link'
import Image from 'next/image'
import { NotFoundImage } from '@/assets'


export default function NotFound() {
    return (
      <div className=' flex flex-col justify-center text-center items-center h-[100vh] gap-2 overflow-hidden'>
        <h2 className='text-4xl font-bold'>404</h2>
        <h3 className='text-6xl text-orange font-extrabold'>Not Found</h3>
        <Link href="/partner" className='text-xl font-medium underline'>Back Home</Link>
        <Image
          src={NotFoundImage}
          alt='not found image'
          priority={true}
          width={400}
          height={400}
          className='drop-shadow-[0_0_0.3rem_#ffffff70] w-auto h-auto mt-4'
        />
      </div>
    )
  }
