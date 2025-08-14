import Navbar from '../components/Navbar'
import OffersCarousel from '../components/offerscarousel'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container m-auto px-10 py-8">
        <OffersCarousel />
        <h1 className="text-2xl font-bold text-[#183B56]">Popular Restaurants</h1>
        <p className="text-[#64748B]">Select Your favourite restaurant special dish and make your day happy...</p>
      </div>
      <Footer />
    </>
  )
}

export default Home
