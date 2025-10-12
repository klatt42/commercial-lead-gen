'use client'

import { useState } from 'react'

/**
 * FAQSection Component
 *
 * Accordion-style FAQ section with Schema.org structured data for SEO.
 * Features smooth expand/collapse animations, single-open accordion behavior,
 * and accessibility features.
 */

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  // Track which FAQ is currently open (only one at a time)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Toggle FAQ open/closed
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate Schema.org FAQPage structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 text-base sm:text-lg mb-12">
            Get answers to common questions about our restoration services
          </p>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {/* Question Text */}
                    <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                      {faq.question}
                    </span>

                    {/* Expand/Collapse Icon */}
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-[#0f3460] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Answer - Expandable */}
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-blue-100 text-base sm:text-lg mb-6">
              Our team is available 24/7 to answer your questions and provide expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:301-900-5171"
                className="bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg min-h-[56px] flex items-center justify-center w-full sm:w-auto"
              >
                Call Now: 301-900-5171
              </a>
              <button
                onClick={() => {
                  const form = document.getElementById('contact-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg min-h-[56px] flex items-center justify-center w-full sm:w-auto"
              >
                Request Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org FAQPage structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </section>
  )
}
