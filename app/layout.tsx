import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteDataProvider } from '@/lib/context/site-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'The Vlog — Christian Media Platform',
  description: 'A platform for Christian content including videos, blogs, scriptures, podcasts, and faith-based news — updated weekly.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#09090B] text-white">
        <SiteDataProvider>
          {children}
        </SiteDataProvider>
        <Analytics />
      </body>
    </html>
  )
}
