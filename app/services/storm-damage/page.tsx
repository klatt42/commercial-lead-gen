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

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Commercial Storm Damage Repair & Emergency Response | MD, DC, VA',
  description: 'Emergency commercial storm damage repair serving MD, DC, VA. Roof repairs, water intrusion control, structural restoration. <60min response. Licensed & insured.',
  keywords: [
    'commercial storm damage',
    'roof repair',
    'emergency tarping',
    'wind damage repair',
    'hail damage restoration',
    'commercial storm restoration Maryland',
    'DC storm damage repair',
    'Virginia commercial storm damage',
  ],
  openGraph: {
    title: 'Commercial Storm Damage Repair & Emergency Response',
    description: 'Emergency commercial storm damage repair serving MD, DC, VA. <60min response. Licensed & insured.',
    type: 'website',
  },
}

export default function StormDamagePage() {
  const serviceData = getServiceData('storm-damage')
  const relatedServices = getRelatedServicesData('storm-damage')

  if (!serviceData) {
    return <div>Service not found</div>
  }

  return (
    <>
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <ServiceHero
        emoji={serviceData.emoji}
        title={serviceData.title}
        subtitle={serviceData.subtitle}
        description={serviceData.heroDescription}
        urgencyMessage={serviceData.urgencyMessage}
      />

      {/* Problem Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900 text-center">
              {serviceData.problemTitle}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              {serviceData.problemDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900 text-center">
              {serviceData.solutionTitle}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              {serviceData.solutionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Service Details: Process, Benefits, Certifications */}
      <ServiceDetails
        processTitle={serviceData.processTitle}
        process={serviceData.process}
        benefitsTitle={serviceData.benefitsTitle}
        benefits={serviceData.benefits}
        certificationsTitle={serviceData.certificationsTitle}
        certifications={serviceData.certifications}
      />

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
                Related Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <div className="text-5xl mb-4">{service.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0f3460]">
                      {service.shortTitle}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.subtitle}
                    </p>
                    <div className="text-[#0f3460] font-semibold flex items-center gap-2">
                      Learn More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FAQSection faqs={serviceData.faqs} />

      {/* Contact Form */}
      <ContactForm />

      <Footer />
      <StickyFooter />
    </>
  )
}
