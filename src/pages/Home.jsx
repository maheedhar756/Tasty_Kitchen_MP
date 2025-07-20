import Navbar from '../components/Navbar'
import Loader from '../components/Loader'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Popular Restaurants</h1>
        {/* Carousel, Sort Dropdown, RestaurantCard List */}
      </div>
    </>
  )
}

export default Home
