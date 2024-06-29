import Image from "next/image"
import { Metadata } from 'next'
import { InternalServerErrorImage } from "@/assets"

export const metadata: Metadata = {
  title: '500',
}

export default function InternalError() {
    return (
      <div className=' flex flex-col justify-center text-center items-center h-[100vh] gap-2 overflow-hidden'>
        <Image
          src={InternalServerErrorImage}
          alt='not found image'
          priority={true}
          width={400}
          height={400}
          className='drop-shadow-[0_0_0.3rem_#ffffff70] w-auto h-auto mt-4'
        />
      </div>
    )
  }