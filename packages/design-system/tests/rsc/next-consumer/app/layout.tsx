import type { Metadata } from 'next'
import './globals.css'

// Next.js requires route metadata to be exported from this layout.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Design System RSC consumer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
