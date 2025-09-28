import './globals.css'

export const metadata = {
  title: 'Commercial Restoration Lead Gen',
  description: 'AI-powered commercial restoration lead generation and damage assessment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}