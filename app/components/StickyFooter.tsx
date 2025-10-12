'use client'

import { useState, useEffect } from 'react'

export default function StickyFooter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky footer after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#d32f2f] shadow-heavy border-t-4 border-[#FFD700]">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Message */}
            <div className="text-center sm:text-left">
              <div className="text-white font-bold text-sm sm:text-base">
                🚨 24/7 Emergency Restoration Available Now
              </div>
              <div className="text-white/90 text-xs sm:text-sm">
                &lt;60 min response time • Licensed & Insured • Serving MD, DC, VA
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <a
                href="tel:301-900-5171"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] flex items-center justify-center whitespace-nowrap"
              >
                📞 MD: 301-900-5171
              </a>
              <a
                href="tel:202-796-7422"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] flex items-center justify-center whitespace-nowrap"
              >
                📞 DC: 202-796-7422
              </a>
              <a
                href="tel:703-844-4204"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] flex items-center justify-center whitespace-nowrap"
              >
                📞 VA: 703-844-4204
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
