import type { Metadata } from "next";
import { roboto } from "@/fonts";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | IT HUB',
    default: 'IT HUB',
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
        {children}
      </body>
    </html>
  );
}
