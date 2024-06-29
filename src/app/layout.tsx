import type { Metadata } from "next"
import { roboto } from "@/fonts"
import { StoreProvider } from "@/store/store-provider"

import "../styles/globals.css"

export const metadata: Metadata = {
  title: {
    template: '%s | Antipoff IT',
    default: 'Antipoff IT',
  },
  description: 'Тестовое задание.',
  metadataBase: new URL('https://it-hub.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
