'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    // Always start with home
    const breadcrumbs = [
      { label: 'Home', href: '/' }
    ]

    // If we're on the home page, just return home
    if (pathname === '/') {
      return breadcrumbs
    }

    // Split the pathname and filter out empty strings
    const pathSegments = pathname.split('/').filter(segment => segment !== '')

    // Build up breadcrumbs from path segments
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Convert segment to readable label
      const label = formatSegmentLabel(segment, index, pathSegments)

      breadcrumbs.push({
        label,
        href: currentPath
      })
    })

    return breadcrumbs
  }

  // Format segment into readable label
  const formatSegmentLabel = (segment: string, index: number, allSegments: string[]): string => {
    // Special cases for service pages
    if (allSegments[0] === 'services' && index === 1) {
      const serviceLabels: Record<string, string> = {
        'water-damage': 'Water Damage Restoration',
        'fire-damage': 'Fire Damage Recovery',
        'mold-remediation': 'Mold Remediation',
        'storm-damage': 'Storm Damage Repair',
        'industrial-equipment': 'Industrial Equipment Restoration',
        'environmental-remediation': 'Environmental Remediation',
      }
      return serviceLabels[segment] || formatDefault(segment)
    }

    // Default formatting
    return formatDefault(segment)
  }

  const formatDefault = (segment: string): string => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const breadcrumbs = generateBreadcrumbs()
  const isHomePage = pathname === '/'

  // Don't show breadcrumbs on home page
  if (isHomePage) {
    return null
  }

  // Generate schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.label,
      'item': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}${crumb.href}`
    }))
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb navigation"
        className="py-3 px-4 bg-gray-50 border-b border-gray-200"
      >
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1

              return (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-gray-400" aria-hidden="true">
                      /
                    </span>
                  )}

                  {isLast ? (
                    <span
                      className="font-medium text-[#FFD700]"
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-gray-600 hover:text-[#0f3460] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </>
  )
}
