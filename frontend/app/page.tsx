import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ContentFeatures from "@/components/content-features"
import Testimonies from "@/components/testimonies"
import Events from "@/components/events"
import Bookings from "@/components/bookings"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ContentFeatures />
      <Testimonies />
      <Events />
      <Bookings />
      <About />
      <Footer />
    </main>
  )
}
