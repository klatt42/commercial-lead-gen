import type { Metadata } from 'next'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import StickyFooter from '../components/StickyFooter'
import ContactForm from '../components/ContactForm'
import FAQSection from '../components/FAQSection'

export const metadata: Metadata = {
  title: 'Insurance Claims Assistance | Commercial Restoration',
  description: 'We work with all insurance carriers. Direct billing, claims documentation, pre-approval assistance. Your right to choose your restoration contractor.',
}

const insuranceFAQs = [
  {
    question: "Can my insurance company force me to use a specific restoration contractor?",
    answer: "No. You have the legal right to choose your own restoration contractor. While your insurance company may recommend contractors, they cannot require you to use them. This is known as your 'right to choose' and is protected by law in most states."
  },
  {
    question: "Will you bill my insurance company directly?",
    answer: "Yes. We handle direct billing with all major insurance carriers. We'll submit all documentation, estimates, and invoices directly to your insurance company, making the process seamless for you."
  },
  {
    question: "What documentation do you provide for insurance claims?",
    answer: "We provide comprehensive documentation including detailed photo and video evidence, moisture mapping reports, equipment logs, daily progress reports, and itemized estimates. Our documentation is designed to meet insurance company requirements and support your claim."
  },
  {
    question: "Do I need insurance approval before you start work?",
    answer: "For emergency mitigation work, we typically start immediately to prevent further damage – which is almost always covered by insurance. For reconstruction work, we'll help you get pre-approval from your insurance company before beginning."
  },
  {
    question: "What if my insurance claim is denied?",
    answer: "We have extensive experience working with insurance companies and can help you understand why a claim was denied. We'll provide additional documentation and work with your adjuster to resolve issues. We can also recommend public adjusters if needed."
  },
  {
    question: "How long does the insurance claims process take?",
    answer: "The timeline varies, but most commercial claims are processed within 2-4 weeks. Emergency mitigation is typically pre-approved within 24-48 hours. We expedite the process by providing thorough documentation upfront and maintaining constant communication with adjusters."
  },
  {
    question: "What insurance carriers do you work with?",
    answer: "We work with all major commercial insurance carriers including Liberty Mutual, Travelers, The Hartford, Zurich, Chubb, AIG, CNA, and many others. We're experienced with both regional and national carriers, as well as specialized commercial policies."
  }
]

export default function InsurancePage() {
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
                <span className="text-[#FFD700] font-bold">INSURANCE CLAIMS EXPERTS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                Insurance Claims Assistance
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100">
                We work with all major commercial insurance carriers to make your claim process smooth and stress-free
              </p>
            </div>
          </div>
        </section>

        {/* Your Right To Choose Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-[#d32f2f] to-[#dc2626] text-white p-8 sm:p-12 rounded-2xl shadow-2xl mb-12">
                <h2 className="text-3xl sm:text-4xl font-black mb-6 text-center">
                  🛡️ Know Your Rights: You Choose Your Contractor
                </h2>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl mb-6">
                    <strong>Important:</strong> Your insurance company cannot legally force you to use a specific restoration contractor. You have the right to choose who works on your property.
                  </p>
                  <div className="bg-white/10 p-6 rounded-xl">
                    <p className="text-lg">
                      Many insurance companies have "preferred vendor" programs and may pressure you to use their contractors. While these contractors may be competent, remember that they work closely with the insurance company – not exclusively for you. As the property owner, you have the legal right to select a contractor who represents your interests first.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">⚖️</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Protected By Law</h3>
                  <p className="text-gray-600">
                    State laws protect your right to choose your restoration contractor. Insurance companies cannot condition payment on using their preferred vendors.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">We Work For You</h3>
                  <p className="text-gray-600">
                    When you hire us, we represent your interests. We ensure you get the full restoration your property needs, not the minimum the insurance will pay.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Your Business First</h3>
                  <p className="text-gray-600">
                    We understand that your priority is getting your business operational again. We fight for the comprehensive restoration you deserve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                How We Help With Your Insurance Claim
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">💳</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">Direct Insurance Billing</h3>
                      <p className="text-gray-600">
                        We bill your insurance company directly, so you don't have to worry about upfront costs or reimbursement paperwork. We handle all financial communications with your carrier.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">📸</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">Photo & Video Documentation</h3>
                      <p className="text-gray-600">
                        Comprehensive visual documentation of all damage, starting from our initial arrival. This evidence is crucial for supporting your insurance claim and preventing disputes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">📊</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">Detailed Reporting</h3>
                      <p className="text-gray-600">
                        Moisture mapping reports, thermal imaging, equipment logs, and daily progress reports that meet insurance company documentation requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">📋</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">Comprehensive Estimates</h3>
                      <p className="text-gray-600">
                        Detailed, itemized estimates using Xactimate software – the industry standard that insurance companies use for claims processing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">🤝</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">Adjuster Communication</h3>
                      <p className="text-gray-600">
                        We communicate directly with insurance adjusters, providing all requested information and answering questions to expedite your claim.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">✅</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">Pre-Approval Assistance</h3>
                      <p className="text-gray-600">
                        For reconstruction work, we help obtain pre-approval from your insurance company before starting, ensuring there are no surprises.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Coverage Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-6">
                What Commercial Policies Typically Cover
              </h2>
              <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                Coverage varies by policy, but most commercial property insurance includes these restoration services:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <span className="text-3xl">🚨</span> Emergency Mitigation
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Water extraction and removal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Structural drying and dehumidification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Board-up and security services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Temporary power and utilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Emergency tarping and protection</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <span className="text-3xl">🏗️</span> Structural Repairs
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Drywall and ceiling repair/replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Flooring restoration or replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Roof repair and restoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Structural framing and foundation work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>HVAC and mechanical systems</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <span className="text-3xl">📦</span> Contents Restoration
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Document drying and recovery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Electronics and equipment restoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Furniture and fixture cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Inventory cleaning and restoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Pack-out and storage services</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <span className="text-3xl">💼</span> Business Interruption
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Lost income during closure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Ongoing expenses (rent, payroll)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Temporary relocation costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Extra expenses to minimize interruption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">✓</span>
                      <span>Extended business income coverage</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">⚠️</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Important Note About Coverage</h3>
                    <p className="text-gray-700">
                      Every commercial policy is different. The coverage listed above represents common inclusions, but your specific policy may have different limits, exclusions, and requirements. We'll review your policy with you and help you understand exactly what's covered. We work with your insurance company to maximize your legitimate claim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claims Process Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-12">
                The Insurance Claims Process
              </h2>

              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Contact Us Immediately</h3>
                      <p className="text-gray-600">
                        Call us first – even before calling your insurance company. We'll begin emergency mitigation to prevent further damage and document everything from the start. You can call your insurance company while we're en route.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Report the Claim</h3>
                      <p className="text-gray-600">
                        Contact your insurance company to report the claim. Get your claim number and adjuster contact information. We can help you with this call if needed and ensure you provide the right information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Emergency Mitigation</h3>
                      <p className="text-gray-600">
                        We begin emergency work to prevent further damage. This is almost always covered by insurance and doesn't require pre-approval. We document everything with photos, videos, and detailed reports.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Adjuster Inspection</h3>
                      <p className="text-gray-600">
                        An insurance adjuster will inspect the damage. We'll be present during this inspection to ensure all damage is documented and to provide technical information about the restoration process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Estimate & Approval</h3>
                      <p className="text-gray-600">
                        We prepare a detailed estimate and submit it to the insurance company. We work with the adjuster to negotiate any differences and obtain approval for the full scope of restoration work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">6</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Restoration Work</h3>
                      <p className="text-gray-600">
                        Once approved, we complete all restoration work according to the agreed scope. We provide regular updates to both you and the insurance company throughout the process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-[#0f3460]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0f3460] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">7</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Final Payment</h3>
                      <p className="text-gray-600">
                        After work is complete, we submit final invoices to the insurance company. We handle all payment collection directly with the carrier, though you're responsible for your deductible and any non-covered items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                  <span>⏱️</span> Typical Timeline
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Emergency Response:</strong> Within 60 minutes</li>
                  <li><strong>Initial Adjuster Visit:</strong> 24-48 hours</li>
                  <li><strong>Estimate Approval:</strong> 5-10 business days</li>
                  <li><strong>Restoration Work:</strong> Varies by scope (1-6 weeks typical)</li>
                  <li><strong>Final Payment:</strong> 2-3 weeks after completion</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={insuranceFAQs} />

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Need Help With Your Insurance Claim?
              </h2>
              <p className="text-xl text-blue-100 mb-10">
                Our insurance specialists are available 24/7 to answer your questions and guide you through the claims process.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
