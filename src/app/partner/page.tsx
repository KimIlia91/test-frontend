import { auth } from "@/auth"
import { Metadata } from "next"
import Header from "@/components/hoc/header"
import ProfilePanel from "@/components/ui/profile-panel"
import PartnerTable from "@/components/ui/partner/partner-table"
import ShoweMoreButton from "@/components/ui/partner/showe-more-button"
import SessionProviderWrapper from "@/components/hoc/session-provider"

export const metadata: Metadata = {
    title: 'Наша команда',
}

export default async function PartnersPage() {
    const session = await auth()
    return (
        <main className="pb-[69px]">
            <Header>
                <div className="flex flex-col items-center text-white gap-4">
                    <h1 className="text-[64px] leading-[75px] text-center mt-8">Наша команда</h1>
                    <p className="text-xl leading-6 text-center max-w-[846px]">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
                </div>
                <ProfilePanel />
            </Header>
            <div className="container">
                <div className="flex flex-col items-center gap-14">
                    <SessionProviderWrapper session={session}>
                        <PartnerTable />
                        <ShoweMoreButton />
                    </SessionProviderWrapper>
                </div>
            </div>
        </main>
    )
}

