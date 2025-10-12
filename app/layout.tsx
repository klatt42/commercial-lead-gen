import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CopilotProvider from './components/CopilotProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Emergency Restoration Services MD, DC, VA | 24/7 Water, Fire, Mold & Storm Damage',
  description: 'Professional emergency restoration services in Maryland, Washington DC, and Virginia. 24/7 water damage, fire restoration, mold remediation, and storm repair. <60min response time. Licensed & insured. Call now!',
  keywords: [
    'emergency restoration',
    'water damage restoration MD DC VA',
    'fire damage restoration',
    'mold remediation',
    'storm damage repair',
    '24/7 emergency restoration',
    'Maryland restoration services',
    'Virginia water damage',
    'DC fire restoration',
  ],
  authors: [{ name: 'Emergency Restoration Services' }],
  openGraph: {
    title: 'Emergency Restoration YOU Choose | 24/7 MD, DC, VA',
    description: '24/7 water, fire, mold & storm restoration. <60min response. Licensed & insured. Serving Maryland, DC, Virginia. You choose - not your insurance company.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Emergency Restoration Services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Restoration Services | 24/7 MD, DC, VA',
    description: '24/7 emergency water, fire, mold & storm restoration. <60min response time.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Schema.org structured data for LocalBusiness and EmergencyService
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://yoursite.com/#business',
        name: 'Emergency Restoration Services',
        description: 'Professional 24/7 emergency restoration services for water, fire, mold, and storm damage',
        telephone: '+1-301-900-5171',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'MD, DC, VA',
          addressCountry: 'US',
        },
        areaServed: [
          {
            '@type': 'State',
            name: 'Maryland',
          },
          {
            '@type': 'State',
            name: 'Virginia',
          },
          {
            '@type': 'Place',
            name: 'Washington DC',
          },
        ],
        openingHours: '24/7',
        image: 'https://yoursite.com/og-image.jpg',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '2800',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'EmergencyService',
        '@id': 'https://yoursite.com/#emergency-service',
        name: 'Emergency Restoration Services',
        serviceType: [
          'Water Damage Restoration',
          'Fire Damage Restoration',
          'Mold Remediation',
          'Storm Damage Repair',
        ],
        availableChannel: {
          '@type': 'ServiceChannel',
          servicePhone: {
            '@type': 'ContactPoint',
            telephone: '+1-301-900-5171',
            contactType: 'Emergency Service',
            areaServed: 'Maryland',
            availableLanguage: 'English',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '00:00',
              closes: '23:59',
            },
          },
        },
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <CopilotProvider>
          {children}
        </CopilotProvider>
      </body>
    </html>
  )
}