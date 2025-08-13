import Navbar from '../components/Navbar'
import OffersCarousel from '../components/OffersCarousel'
// import Loader from '../components/Loader'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <OffersCarousel />
        <h1 className="text-2xl font-bold">Popular Restaurants</h1>
      </div>
    </>
  )
}

export default Home
