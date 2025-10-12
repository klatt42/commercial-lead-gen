'use client'

/**
 * ServiceDetails Component
 *
 * Displays process steps, benefits, and certifications for service pages.
 * Features timeline-style process visualization, benefit grid with checkmarks,
 * and trust-building certification badges.
 */

interface ProcessStep {
  step: number
  title: string
  description: string
  duration?: string
}

interface ServiceDetailsProps {
  processTitle: string
  process: ProcessStep[]
  benefitsTitle: string
  benefits: string[]
  certificationsTitle: string
  certifications: string[]
}

export default function ServiceDetails({
  processTitle,
  process,
  benefitsTitle,
  benefits,
  certificationsTitle,
  certifications
}: ServiceDetailsProps) {
  return (
    <div className="bg-gray-50">
      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
              {processTitle}
            </h2>

            {/* Process Steps - Timeline Style */}
            <div className="relative">
              {/* Timeline line - Hidden on mobile, shown on larger screens */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#0f3460] via-[#16213e] to-[#0f3460]" />

              <div className="space-y-8 md:space-y-12">
                {process.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <div className="bg-gradient-to-br from-white to-blue-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                          {step.description}
                        </p>
                        {step.duration && (
                          <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {step.duration}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step Number Badge */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0f3460] to-[#16213e] flex items-center justify-center shadow-lg border-4 border-white">
                        <span className="text-2xl sm:text-3xl font-black text-[#FFD700]">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
              {benefitsTitle}
            </h2>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-100"
                >
                  {/* Checkmark Icon */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Benefit Text */}
                  <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-black mb-10 text-white">
              {certificationsTitle}
            </h2>

            {/* Certifications - Badge Style Display */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {certifications.map((certification, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border-2 border-[#FFD700] rounded-2xl px-6 sm:px-8 py-4 sm:py-5 hover:bg-white/20 transition-all hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    {/* Badge Icon */}
                    <svg
                      className="w-6 h-6 text-[#FFD700] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {/* Certification Text */}
                    <span className="text-base sm:text-lg font-bold text-white whitespace-nowrap">
                      {certification}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Message */}
            <p className="text-blue-100 text-base sm:text-lg mt-10 max-w-2xl mx-auto">
              Our certifications and industry partnerships ensure you receive the highest quality
              restoration services backed by proven expertise and professional standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
