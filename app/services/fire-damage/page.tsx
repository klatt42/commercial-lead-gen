import { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ServiceHero from '@/app/components/ServiceHero'
import ServiceDetails from '@/app/components/ServiceDetails'
import FAQSection from '@/app/components/FAQSection'
import ContactForm from '@/app/components/ContactForm'
import StickyFooter from '@/app/components/StickyFooter'
import { getServiceData, getRelatedServicesData } from '@/lib/serviceData'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Commercial Fire & Smoke Damage Restoration | 24/7 Emergency MD, DC, VA',
  description: 'Commercial fire damage restoration serving MD, DC, VA. Complete fire recovery, smoke odor removal, soot cleaning, structural repairs. <60min emergency response. IICRC certified.',
  keywords: [
    'commercial fire damage restoration',
    'smoke damage cleanup',
    'fire damage repair',
    'commercial smoke odor removal',
    'office fire restoration',
    'warehouse fire damage',
    'Maryland fire damage restoration',
    'DC fire restoration services',
  ],
  openGraph: {
    title: 'Commercial Fire & Smoke Damage Restoration | 24/7 Emergency MD, DC, VA',
    description: 'Commercial fire damage restoration serving MD, DC, VA. Complete fire recovery, smoke odor removal, soot cleaning, structural repairs. <60min emergency response.',
    url: 'https://commercial-lead-gen.vercel.app/services/fire-damage',
  },
}

export default function FireDamagePage() {
  const serviceData = getServiceData('fire-damage')

  if (!serviceData) {
    return <div>Service not found</div>
  }

  const relatedServices = getRelatedServicesData('fire-damage')

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Fire & Smoke Damage', href: '/services/fire-damage' },
  ]

  return (
    <>
      <Header />

      <Breadcrumbs />

      <ServiceHero
        emoji={serviceData.emoji}
        title={serviceData.title}
        subtitle={serviceData.subtitle}
        description={serviceData.heroDescription}
        urgencyMessage={serviceData.urgencyMessage}
      />

      {/* Problem Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900 text-center">
              {serviceData.problemTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg sm:text-xl">
                {serviceData.problemDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900 text-center">
              {serviceData.solutionTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg sm:text-xl">
                {serviceData.solutionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceDetails
        processTitle={serviceData.processTitle}
        process={serviceData.process}
        benefitsTitle={serviceData.benefitsTitle}
        benefits={serviceData.benefits}
        certificationsTitle={serviceData.certificationsTitle}
        certifications={serviceData.certifications}
      />

      {/* Related Services Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedServices.slice(0, 2).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-blue-100 hover:border-blue-300"
                >
                  <div className="text-5xl mb-4">{service.emoji}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#0f3460] transition-colors">
                    {service.shortTitle}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {service.metaDescription.substring(0, 150)}...
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#0f3460] font-bold group-hover:gap-3 transition-all">
                    Learn More
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={serviceData.faqs} />

      <ContactForm />

      <Footer />
      <StickyFooter />
    </>
  )
}
