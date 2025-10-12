import Header from './components/Header'
import Hero from './components/Hero'
import ServiceShowcase from './components/ServiceShowcase'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import StickyFooter from './components/StickyFooter'

export default function Home() {
  return (
    <>
      {/* Site Navigation */}
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Service Showcase */}
        <ServiceShowcase />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Form */}
        <ContactForm />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyFooter />
    </>
  )
}
