'use client'

import { useState, useEffect } from "react"
import PartnerCard from "./partner-card"
import { ShowMoreRowDown } from "@/assets"
import Spinner from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { PartnersTable } from "@/lib/definitions"
import { fetchPartnersTable } from "@/data/repository"
import { isLastPartners } from "@/services/partner-service"
import { useSession } from "next-auth/react"

type PartnerTableProps = {
}

const PartnerTable = ({
}: PartnerTableProps) => {
    const { data: session, status } = useSession()
    const [partners, setPartners] = useState<PartnersTable[]>([])
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (status === "authenticated") {
            onRequest(0);
        }
    }, [status]);

    useEffect(() => {
        onRequest(offset)
    }, [offset])

    const onRequest = (offset:number) => {
        Promise.all([
            fetchPartnersTable(session?.user?.id!, offset),
            isLastPartners(offset)
        ]).then(([newPartners, hasMoreResult]) => {
            setPartners([...partners, ...newPartners])
            setHasMore(hasMoreResult)
        }).catch((error) => {
            console.error('Error loading partners:', error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const onLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setLoading(true)
        setOffset(offset => offset + 8)
    }

    console.log("render list")

    return (
        <div className="flex flex-col items-center gap-14">
            {partners.length === 0 ? (
                <Spinner />
            ) : (
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
                    {partners.map(partner => (
                        <PartnerCard
                            key={`partner-${partner.id}`}
                            id={partner.id}
                            name={partner.name}
                            image={partner.image}
                            isFavorite={partner.is_favorite}
                        />
                    ))}
                </ul>
            )}
            <Button variant={"showMore"} disabled={!hasMore || loading} onClick={onLoadMore}>
                {loading ? (<p>Загрузка...</p>) : (<p>Показать еще</p>)}
                <ShowMoreRowDown />
            </Button>
        </div>
    )
}

export default PartnerTable