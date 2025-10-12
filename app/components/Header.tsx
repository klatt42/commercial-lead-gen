'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ServiceLink {
  name: string;
  href: string;
}

interface PhoneNumber {
  location: string;
  number: string;
  displayNumber: string;
}

const services: ServiceLink[] = [
  { name: 'Water Damage Restoration', href: '/services/water-damage' },
  { name: 'Fire & Smoke Damage', href: '/services/fire-damage' },
  { name: 'Mold Remediation', href: '/services/mold-remediation' },
  { name: 'Storm Damage Repair', href: '/services/storm-damage' },
  { name: 'Industrial Equipment', href: '/services/industrial-equipment' },
  { name: 'Environmental Remediation', href: '/services/environmental-remediation' },
];

const phoneNumbers: PhoneNumber[] = [
  { location: 'MD', number: '301-900-5171', displayNumber: '301-900-5171' },
  { location: 'DC', number: '202-796-7422', displayNumber: '202-796-7422' },
  { location: 'VA', number: '703-844-4204', displayNumber: '703-844-4204' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] transition-shadow duration-300 ${
        hasScrolled ? 'shadow-heavy' : ''
      }`}
    >
      <nav className="container mx-auto px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-white hover:text-[#FFD700] transition-colors duration-300"
          >
            Commercial Restoration Services
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 text-white hover:text-[#FFD700] transition-colors duration-300 font-medium ${
                  pathname.startsWith('/services') ? 'text-[#FFD700]' : ''
                }`}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div className="absolute left-0 pt-2 w-64">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="py-2">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={`block px-4 py-3 text-gray-800 hover:bg-[#FFD700] hover:text-[#1a1a2e] transition-colors duration-200 ${
                            isActiveLink(service.href) ? 'bg-[#FFD700] text-[#1a1a2e] font-semibold' : ''
                          }`}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            <Link
              href="/about"
              className={`text-white hover:text-[#FFD700] transition-colors duration-300 font-medium ${
                isActiveLink('/about') ? 'text-[#FFD700]' : ''
              }`}
            >
              About
            </Link>
            <Link
              href="/insurance"
              className={`text-white hover:text-[#FFD700] transition-colors duration-300 font-medium ${
                isActiveLink('/insurance') ? 'text-[#FFD700]' : ''
              }`}
            >
              Insurance
            </Link>
            <Link
              href="/service-areas"
              className={`text-white hover:text-[#FFD700] transition-colors duration-300 font-medium ${
                isActiveLink('/service-areas') ? 'text-[#FFD700]' : ''
              }`}
            >
              Service Areas
            </Link>
          </div>

          {/* Desktop Emergency Phone Numbers */}
          <div className="hidden lg:flex items-center space-x-3">
            {phoneNumbers.map((phone) => (
              <a
                key={phone.location}
                href={`tel:${phone.number}`}
                className="flex flex-col items-center px-4 py-2 bg-[#FFD700] text-[#1a1a2e] rounded-lg hover:bg-white transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label={`Call ${phone.location} emergency line at ${phone.displayNumber}`}
              >
                <span className="text-xs font-bold">{phone.location}</span>
                <span className="text-sm font-bold whitespace-nowrap">{phone.displayNumber}</span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded p-2"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              // Close Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleMobileMenuToggle}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Slide-in Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <span className="text-lg font-bold text-white">Menu</span>
            <button
              onClick={handleMobileMenuToggle}
              className="text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded p-2"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="overflow-y-auto h-full pb-20">
            <div className="py-4">
              {/* Services Section */}
              <div className="border-b border-gray-700">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 min-h-[44px] ${
                    pathname.startsWith('/services') ? 'text-[#FFD700] bg-white/10' : ''
                  }`}
                  aria-expanded={isMobileServicesOpen}
                >
                  <span className="text-lg font-medium">Services</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isMobileServicesOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile Services Submenu */}
                {isMobileServicesOpen && (
                  <div className="bg-white/5">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={`block px-8 py-3 text-white hover:bg-white/10 transition-colors duration-200 min-h-[44px] ${
                          isActiveLink(service.href) ? 'text-[#FFD700] bg-white/10 font-semibold' : ''
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Mobile Navigation Links */}
              <Link
                href="/about"
                className={`block px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 text-lg font-medium min-h-[44px] border-b border-gray-700 ${
                  isActiveLink('/about') ? 'text-[#FFD700] bg-white/10' : ''
                }`}
              >
                About
              </Link>
              <Link
                href="/insurance"
                className={`block px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 text-lg font-medium min-h-[44px] border-b border-gray-700 ${
                  isActiveLink('/insurance') ? 'text-[#FFD700] bg-white/10' : ''
                }`}
              >
                Insurance
              </Link>
              <Link
                href="/service-areas"
                className={`block px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 text-lg font-medium min-h-[44px] border-b border-gray-700 ${
                  isActiveLink('/service-areas') ? 'text-[#FFD700] bg-white/10' : ''
                }`}
              >
                Service Areas
              </Link>

              {/* Emergency Phone Numbers - Mobile */}
              <div className="mt-6 px-4 space-y-3">
                <p className="text-[#FFD700] font-bold text-sm uppercase tracking-wide mb-3">
                  Emergency Contact
                </p>
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone.location}
                    href={`tel:${phone.number}`}
                    className="flex items-center justify-between px-4 py-3 bg-[#FFD700] text-[#1a1a2e] rounded-lg hover:bg-white transition-colors duration-300 shadow-lg min-h-[44px]"
                    aria-label={`Call ${phone.location} emergency line at ${phone.displayNumber}`}
                  >
                    <span className="font-bold">{phone.location}</span>
                    <span className="font-bold">{phone.displayNumber}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
