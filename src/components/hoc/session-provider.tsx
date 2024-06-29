'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

const SessionProviderWrapper = ({children, session}: { children: ReactNode, session?: Session | null }) => {
    return (<SessionProvider session={session}>{children}</SessionProvider>)
}

export default SessionProviderWrapper