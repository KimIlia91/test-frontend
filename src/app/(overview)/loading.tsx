import Spinner from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <main className='flex justify-center items-center h-screen'>
        <Spinner />
    </main>
  )
}
