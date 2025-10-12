import type { Metadata } from 'next'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import StickyFooter from '../components/StickyFooter'

export const metadata: Metadata = {
  title: 'About Commercial Restoration Services | Licensed & Insured',
  description: 'Learn about our commercial restoration company. Licensed, insured, A+ BBB rated. 2,800+ commercial properties restored since 2015. Serving MD, DC, VA.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-[#FFD700]/20 px-4 py-2 rounded-full mb-6">
                <span className="text-[#FFD700] font-bold">PROFESSIONAL RESTORATION SINCE 2015</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                About Commercial Restoration Services
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100">
                Your trusted partner for emergency commercial property restoration across Maryland, Washington DC, and Virginia
              </p>
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-lg text-gray-700">
                    <p>
                      Founded in 2015, Commercial Restoration Services was built on a simple principle: commercial property owners deserve rapid, professional emergency restoration services they can trust.
                    </p>
                    <p>
                      What started as a small team responding to local emergencies has grown into a regional leader, serving hundreds of commercial clients across Maryland, Washington DC, and Virginia.
                    </p>
                    <p>
                      We specialize exclusively in commercial and industrial properties – from office buildings and warehouses to manufacturing facilities and healthcare institutions. This focused expertise allows us to understand the unique challenges business owners face when disaster strikes.
                    </p>
                    <p>
                      Today, we're proud to have restored over 2,800 commercial properties, helping businesses get back on their feet and minimize costly downtime.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Businesses Choose Us</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <strong className="text-lg block">Rapid Response</strong>
                        <span className="text-gray-600">Less than 60 minutes across our entire service area</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🏢</span>
                      <div>
                        <strong className="text-lg block">Commercial Specialists</strong>
                        <span className="text-gray-600">We only work with commercial and industrial properties</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🔧</span>
                      <div>
                        <strong className="text-lg block">Full-Service Restoration</strong>
                        <span className="text-gray-600">From emergency mitigation to complete reconstruction</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🛡️</span>
                      <div>
                        <strong className="text-lg block">Insurance Experts</strong>
                        <span className="text-gray-600">We handle all insurance documentation and coordination</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Our Mission & Values
              </h2>
              <p className="text-xl text-gray-700 mb-12">
                We believe in putting property owners first, every single time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Your Choice Matters</h3>
                  <p className="text-gray-600">
                    You choose your restoration contractor – not your insurance company. We fight for your rights as a property owner.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🚨</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Disasters don't wait for business hours. Our team is always ready to respond to your emergency, day or night.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Speed & Quality</h3>
                  <p className="text-gray-600">
                    We guarantee response times under 60 minutes without sacrificing the quality and thoroughness you deserve.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] p-8 rounded-2xl text-white">
                <p className="text-2xl font-bold italic">
                  "Every commercial property owner deserves a restoration partner who understands the urgency of getting their business back to normal."
                </p>
                <p className="mt-4 text-blue-200">– Commercial Restoration Services Team</p>
              </div>
            </div>
          </div>
        </section>

        {/* By The Numbers Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                By The Numbers
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md">
                  <div className="text-5xl font-black text-[#0f3460] mb-2">2,800+</div>
                  <div className="text-lg font-semibold text-gray-700">Commercial Properties Restored</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md">
                  <div className="text-5xl font-black text-[#0f3460] mb-2">&lt;60</div>
                  <div className="text-lg font-semibold text-gray-700">Minute Response Time</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md">
                  <div className="text-5xl font-black text-[#0f3460] mb-2">48hr</div>
                  <div className="text-lg font-semibold text-gray-700">Average Mitigation Time</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md">
                  <div className="text-5xl font-black text-[#0f3460] mb-2">3</div>
                  <div className="text-lg font-semibold text-gray-700">States Served: MD, DC, VA</div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Area Coverage</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>All of Maryland</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>Washington DC (all districts)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>Northern Virginia</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>24/7 coverage across entire region</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Property Types</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>Office Buildings & Corporate Parks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>Warehouses & Distribution Centers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>Manufacturing & Industrial</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span>
                      <span>Healthcare, Education & More</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Trust Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                Certifications & Trust
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Licensed & Insured</h3>
                  <p className="text-gray-600">
                    Fully licensed in MD, DC, and VA with all required state and local permits
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-5xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">$2M Liability Coverage</h3>
                  <p className="text-gray-600">
                    Comprehensive general liability and workers' compensation insurance
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">BBB A+ Rating</h3>
                  <p className="text-gray-600">
                    Accredited by the Better Business Bureau with A+ rating
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-5xl mb-4">📜</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">IICRC Certified</h3>
                  <p className="text-gray-600">
                    Institute of Inspection, Cleaning and Restoration Certification
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">EPA Certified</h3>
                  <p className="text-gray-600">
                    EPA Lead-Safe certified and environmental remediation specialists
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-5xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">OSHA Compliant</h3>
                  <p className="text-gray-600">
                    Full OSHA compliance for all commercial restoration work
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#FFD700]">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
                  Why Certifications Matter
                </h3>
                <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
                  Our certifications aren't just badges – they represent ongoing training, adherence to industry best practices, and a commitment to protecting your property and our team. When you hire Commercial Restoration Services, you're hiring a team that meets the highest industry standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Our Team
              </h2>
              <p className="text-xl text-gray-700 mb-12">
                Experienced professionals dedicated to restoring your property
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">👷</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Experienced Technicians</h3>
                  <p className="text-gray-600">
                    Every team member has extensive commercial restoration experience and ongoing training
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🚨</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Multiple crews on-call around the clock, ready to respond to emergencies
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Certified Specialists</h3>
                  <p className="text-gray-600">
                    IICRC certified water damage, fire damage, and mold remediation specialists
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-blue-100 mb-10">
                Whether you're facing an emergency or need to discuss a restoration project, our team is here to help 24/7.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <a
                  href="tel:301-900-5171"
                  className="bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-8 py-6 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg min-h-[80px] flex flex-col items-center justify-center"
                >
                  <div className="text-sm text-white/90 mb-1">Maryland</div>
                  <div className="text-xl">301-900-5171</div>
                </a>

                <a
                  href="tel:202-796-7422"
                  className="bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-8 py-6 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg min-h-[80px] flex flex-col items-center justify-center"
                >
                  <div className="text-sm text-white/90 mb-1">Washington DC</div>
                  <div className="text-xl">202-796-7422</div>
                </a>

                <a
                  href="tel:703-844-4204"
                  className="bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-8 py-6 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg min-h-[80px] flex flex-col items-center justify-center"
                >
                  <div className="text-sm text-white/90 mb-1">Virginia</div>
                  <div className="text-xl">703-844-4204</div>
                </a>
              </div>

              <p className="text-blue-200">
                ⚡ Response time under 60 minutes • Available 24/7/365
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyFooter />
    </>
  )
}
