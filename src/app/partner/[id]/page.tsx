import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import NotFound from '@/app/(overview)/not-found'
import { Phone, Email } from '@/assets'
import Header from '@/components/hoc/header'
import BackButton from '@/components/ui/back-button'
import { fetchPartnerById } from '@/data/repository'
import ProfilePanel from '@/components/ui/profile-panel'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const partner = await fetchPartnerById(params.id);

  if (!partner) {
    return {
      title: 'Партнёр не найден',
    }
  }

  return {
    title: `${partner.name}`,
  }
}

export default async function PartnerPage({
  params
}:{
  params: { id: string }
}) {
  const partner = await fetchPartnerById(params.id)
  
  if (!partner) return <NotFound />

  return (
    <main className='pb-[69px]'>
      <Header>
        <BackButton />
        <div className="flex flex-col md:flex-row items-center text-white pt-8 md:pt-0 gap-4 md:pl-24 lg:pl-52">
          <Image 
            src={`${partner.image}`}
            width={128}
            height={128}
            alt={`image-${partner.name}`}
            className='order-2 md:order-1'
          />
          <div className='order-1 md:order-2'>
            <h1 className="text-4xl md:text-[64px] md:leading-[75px] leading-10">{partner.name}</h1>
            <p className="text-xl leading-6 max-w-[846px] text-center md:text-start">Партнёр</p>
          </div>
        </div>
        <ProfilePanel />
      </Header>
      <div className='container'>
        <div className='flex w-full text-base flex-col md:flex-row max-w-[1440px] gap-4 md:gap-[129px] md:pl-24 lg:pl-52'>
          <p className='max-w-[630px] order-2 md:order-1'>{partner.description}</p>
          <div className='flex gap-6 flex-col text-nowrap order-1 md:order-2'>
            <div className='flex gap-2'>
              <Phone/>
              <Link href={`tel:${partner.phone}`} className="hover:underline">
                {partner.phone}
              </Link>
            </div>
            <div className='flex gap-2'>
              <Email />
              <Link href={`mailto:${partner.email}`} className="hover:underline">
                {partner.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
