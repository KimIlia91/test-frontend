import type { Metadata } from "next";
import { roboto } from "@/fonts";
import "../styles/globals.css";
import { StoreProvider } from "@/store/store-provider";
import { auth } from "@/auth";
import SessionProviderWrapper from "@/components/hoc/session-provider";

export const metadata: Metadata = {
  title: {
    template: '%s | Antipoff IT',
    default: 'Antipoff IT',
  },
  description: 'Тестовое задание.',
  metadataBase: new URL('https://it-hub.vercel.sh'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <SessionProviderWrapper session={session}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
