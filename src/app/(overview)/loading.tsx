import { Metadata } from 'next'
import Spinner from '@/components/ui/spinner'

export const metadata: Metadata = {
  title: 'Загрузка...',
}

export default function Loading() {
  return (
    <main className='flex justify-center items-center h-screen'>
        <Spinner />
    </main>
  )
}
