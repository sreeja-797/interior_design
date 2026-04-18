import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Best Interior Designers in Gajuwaka, Visakhapatnam | Sulekha',
  description: 'Find top-rated interior designers and decorators in Gajuwaka, Visakhapatnam. Get quotes for home, office, kitchen, and bedroom interior design services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
