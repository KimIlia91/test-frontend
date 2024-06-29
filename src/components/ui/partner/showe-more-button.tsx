'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../button'
import { RootState } from '@/store'
import { ShowMoreRowDown } from '@/assets'
import { DEFAULT_CURSOR } from '@/lib/constants'
import { setPartnersTable } from '@/store/partner/partner-slice'
import { getPartnersTablePage } from '@/services/partner-service'

const ShoweMoreButton = () => {
    const dispatch = useDispatch()
    const { loading, hasNextPage, cursor } = useSelector((state: RootState) => state.partnersTable)
    const session = useSession()

    const request = (cursor: string = DEFAULT_CURSOR) => {
        if (session.status === "authenticated") {
            getPartnersTablePage(cursor, session.data?.user?.id!)
            .then(({partners, hasNextPartnersPage}) => 
                dispatch(setPartnersTable({partners: partners, hasNextPage: hasNextPartnersPage}))
            )
        }
    }

    useEffect(() => {
        request()
    }, [session])

    const onLoadMore = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        request(cursor)
    }
    
    return (
        <Button
            variant={"showMore"}
            disabled={!hasNextPage || loading}
            onClick={onLoadMore}
        >
            {loading ? (<p>Загрузка...</p>) : (<p>Показать еще</p>)}
            <ShowMoreRowDown />
        </Button>
    )
}

export default ShoweMoreButton