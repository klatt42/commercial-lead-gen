import type { Metadata } from 'next'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import StickyFooter from '../components/StickyFooter'
import ContactForm from '../components/ContactForm'

export const metadata: Metadata = {
  title: 'Service Areas MD, DC, VA | 24/7 Commercial Restoration',
  description: 'Commercial restoration services across Maryland, Washington DC, and Virginia. <60min response time. 24/7 emergency service for all commercial properties.',
}

export default function ServiceAreasPage() {
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
                <span className="text-[#FFD700] font-bold">SERVING MD, DC & VA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                Service Areas: Maryland, Washington DC & Virginia
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8">
                Less than 60-minute response time across our entire service area
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-[#FFD700] text-2xl">⚡</span>
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="hidden sm:block text-blue-300">•</div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-[#FFD700] text-2xl">🚨</span>
                  <span>Multiple Crews On-Call</span>
                </div>
                <div className="hidden sm:block text-blue-300">•</div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-[#FFD700] text-2xl">✅</span>
                  <span>Licensed in All Areas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Overview */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Complete Regional Coverage
              </h2>
              <p className="text-xl text-gray-700">
                We strategically position our teams across the MD-DC-VA region to ensure rapid response to any commercial property emergency. No matter where your property is located within our service area, we guarantee arrival within 60 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg text-center border-2 border-blue-100">
                <div className="text-5xl mb-4">🏢</div>
                <div className="text-4xl font-black text-[#0f3460] mb-2">2,800+</div>
                <div className="text-gray-700 font-semibold">Commercial Properties Served</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg text-center border-2 border-blue-100">
                <div className="text-5xl mb-4">⚡</div>
                <div className="text-4xl font-black text-[#0f3460] mb-2">&lt;60min</div>
                <div className="text-gray-700 font-semibold">Average Response Time</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg text-center border-2 border-blue-100">
                <div className="text-5xl mb-4">🚨</div>
                <div className="text-4xl font-black text-[#0f3460] mb-2">24/7/365</div>
                <div className="text-gray-700 font-semibold">Emergency Availability</div>
              </div>
            </div>
          </div>
        </section>

        {/* Maryland Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#FFD700]">
                <div className="bg-gradient-to-r from-[#d32f2f] to-[#dc2626] text-white p-8 sm:p-12">
                  <h2 className="text-3xl sm:text-4xl font-black mb-4">Maryland Service Area</h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <a
                      href="tel:301-900-5171"
                      className="bg-[#FFD700] hover:bg-white text-gray-900 px-8 py-4 rounded-xl font-black text-2xl transition-all hover:scale-105 shadow-lg"
                    >
                      301-900-5171
                    </a>
                    <div className="text-lg text-white/90">
                      Available 24/7 for all Maryland commercial emergencies
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Major Cities & Areas</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Baltimore</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Rockville</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Frederick</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Gaithersburg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Bowie</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Hagerstown</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Annapolis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">College Park</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Salisbury</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Laurel</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Greenbelt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Cumberland</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">County Coverage</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Montgomery County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Prince George's County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Baltimore County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Anne Arundel County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Howard County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Frederick County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Charles County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Harford County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Carroll County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">All Other MD Counties</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-3 text-gray-900">Major Commercial Districts</h4>
                    <p className="text-gray-700">
                      Baltimore Inner Harbor • Bethesda CBD • Silver Spring • White Flint • Shady Grove • BWI Airport Area • National Harbor • Columbia Town Center • Germantown Business Parks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Washington DC Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#FFD700]">
                <div className="bg-gradient-to-r from-[#d32f2f] to-[#dc2626] text-white p-8 sm:p-12">
                  <h2 className="text-3xl sm:text-4xl font-black mb-4">Washington DC Service Area</h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <a
                      href="tel:202-796-7422"
                      className="bg-[#FFD700] hover:bg-white text-gray-900 px-8 py-4 rounded-xl font-black text-2xl transition-all hover:scale-105 shadow-lg"
                    >
                      202-796-7422
                    </a>
                    <div className="text-lg text-white/90">
                      Available 24/7 for all Washington DC commercial emergencies
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">All Districts Served</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Northwest DC</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Northeast DC</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Southwest DC</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Southeast DC</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Downtown</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Georgetown</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Capitol Hill</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Dupont Circle</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Adams Morgan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Columbia Heights</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Navy Yard</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Anacostia</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Federal & Government Buildings</h3>
                      <p className="text-gray-700 mb-4">
                        We have extensive experience working with federal facilities, government contractors, and institutions requiring security clearances and specialized protocols.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Federal Office Buildings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Government Contractors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Embassies & Consulates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Museums & Institutions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Think Tanks & Nonprofits</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-3 text-gray-900">Major Commercial Zones</h4>
                    <p className="text-gray-700">
                      K Street Corridor • L'Enfant Plaza • NoMa • The Wharf • Union Market District • H Street Corridor • 14th Street • Connecticut Avenue • Wisconsin Avenue • Capitol Riverfront
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Virginia Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#FFD700]">
                <div className="bg-gradient-to-r from-[#d32f2f] to-[#dc2626] text-white p-8 sm:p-12">
                  <h2 className="text-3xl sm:text-4xl font-black mb-4">Virginia Service Area</h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <a
                      href="tel:703-844-4204"
                      className="bg-[#FFD700] hover:bg-white text-gray-900 px-8 py-4 rounded-xl font-black text-2xl transition-all hover:scale-105 shadow-lg"
                    >
                      703-844-4204
                    </a>
                    <div className="text-lg text-white/90">
                      Available 24/7 for all Virginia commercial emergencies
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Major Cities & Areas</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Alexandria</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Arlington</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Fairfax</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Reston</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Tysons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Herndon</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Manassas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Leesburg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Sterling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Centreville</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">McLean</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Ashburn</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Northern Virginia Coverage</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Fairfax County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Arlington County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Loudoun County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Prince William County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Alexandria (Independent City)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Falls Church (Independent City)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Stafford County</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span>
                          <span className="text-gray-700">Fauquier County</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-3 text-gray-900">Major Commercial Corridors</h4>
                    <p className="text-gray-700">
                      Tysons Corner • Dulles Technology Corridor • Rosslyn-Ballston Corridor • Crystal City • Pentagon City • Reston Town Center • Dulles Airport Area • Route 28 Corridor • I-66 Tech Corridor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types Served Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                Commercial Property Types We Serve
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🏢</div>
                  <h3 className="text-lg font-bold text-gray-900">Office Buildings</h3>
                  <p className="text-sm text-gray-600 mt-2">High-rises, corporate parks, coworking spaces</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="text-lg font-bold text-gray-900">Warehouses</h3>
                  <p className="text-sm text-gray-600 mt-2">Distribution centers, storage facilities</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">⚙️</div>
                  <h3 className="text-lg font-bold text-gray-900">Manufacturing</h3>
                  <p className="text-sm text-gray-600 mt-2">Industrial plants, production facilities</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🛒</div>
                  <h3 className="text-lg font-bold text-gray-900">Retail Spaces</h3>
                  <p className="text-sm text-gray-600 mt-2">Shopping centers, stores, malls</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🏥</div>
                  <h3 className="text-lg font-bold text-gray-900">Healthcare</h3>
                  <p className="text-sm text-gray-600 mt-2">Medical offices, clinics, hospitals</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="text-lg font-bold text-gray-900">Educational</h3>
                  <p className="text-sm text-gray-600 mt-2">Schools, universities, training centers</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🏘️</div>
                  <h3 className="text-lg font-bold text-gray-900">Multi-Family</h3>
                  <p className="text-sm text-gray-600 mt-2">Apartment buildings, condominiums</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🍽️</div>
                  <h3 className="text-lg font-bold text-gray-900">Hospitality</h3>
                  <p className="text-sm text-gray-600 mt-2">Hotels, restaurants, event venues</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Presence Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                Why Our Local Presence Matters
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Guaranteed Response Time</h3>
                  <p className="text-gray-600">
                    With strategically positioned teams throughout MD, DC, and VA, we guarantee arrival at your property within 60 minutes of your call – any time, day or night.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🚨</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">24/7 Regional Coverage</h3>
                  <p className="text-gray-600">
                    Multiple crews on-call across the region ensure we're always ready to respond, even during severe weather events when multiple emergencies occur simultaneously.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🏗️</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Local Building Knowledge</h3>
                  <p className="text-gray-600">
                    Our teams know the commercial properties, building types, and construction methods common to each area. This local knowledge speeds up restoration and ensures quality results.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">📜</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Regional Code Expertise</h3>
                  <p className="text-gray-600">
                    We're fully licensed and familiar with building codes and permit requirements across Maryland, Washington DC, and Virginia – ensuring compliant restoration work.
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
                Get Emergency Service In Your Area
              </h2>
              <p className="text-xl text-blue-100 mb-10">
                No matter where your commercial property is located in MD, DC, or VA, we're ready to respond within 60 minutes.
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

              <p className="text-blue-200 text-lg">
                ⚡ Less than 60-minute response time • 24/7/365 availability • All commercial property types
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
      <StickyFooter />
    </>
  )
}
