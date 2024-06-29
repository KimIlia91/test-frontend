'use client'

import { useSelector } from "react-redux"
import Spinner from "../spinner"
import { RootState } from "@/store"
import PartnerCard from "./partner-card"

type PartnerTableProps = {}

const PartnerTable = ({
}: PartnerTableProps) => {
    const {data} = useSelector((state: RootState) => state.partnersTable)
   
    return (
        <div>
            {data.length === 0 ? (
                <Spinner />
            ) : (
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
                    {data.map(partner => (
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
        </div>
        
    )
}

export default PartnerTable