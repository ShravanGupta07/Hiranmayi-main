import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ppRadioGrotesk = localFont({
  src: '../public/fonts/radio-grotesk-font/RadioGrotesk-FreeForPersonalUse/RadioGrotesk-Regular.otf',
  variable: '--font-space-grotesk',
  weight: '400',
  style: 'normal',
});

const ppPangaia = localFont({
  src: '../public/fonts/pp-pangaia/PPPangaia-Medium-BF654c530cc86d5.otf',
  variable: '--font-cormorant',
  weight: '500',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Hiranmayi – Real Estate Pvt. Ltd.',
  description: 'Experience sophisticated green luxury and tranquil villa living in the heart of nature.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png?v=2',
    apple: '/favicon.png?v=2',
  },
}

import { SmoothScroll } from '@/components/smooth-scroll'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${ppRadioGrotesk.variable} ${ppPangaia.variable} font-sans antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
