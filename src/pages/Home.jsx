import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import OffersCarousel from "../components/OffersCarousel"
import RestaurantCards from '../components/RestaurantCards'
import Footer from '../components/Footer'
import Loader from '../components/Loaders'

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const limit = 9 // Number of restaurants per page
  const totalRestaurants = 29

  useEffect(() => {
    const fetchRestaurants = async () => {
      const offset = (activePage - 1) * limit
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
      try {
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        setRestaurants(data.restaurants)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching restaurants:', error)
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [activePage])

  const handleNextPage = () => {
    if (activePage * limit < totalRestaurants) {
      setActivePage(prevPage => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(prevPage => prevPage - 1)
    }
  }

  const renderRestaurants = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map(restaurant => (
          <RestaurantCards key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    )
  }
  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <OffersCarousel />
        <div className="flex items-center justify-between mb-4 pl-4">
          <div>
            <h1 className="text-2xl font-bold text-[#183B56]">Popular Restaurants</h1>
            <p className="text-[#64748B]">Select Your favourite restaurant special dish and make your day happy...</p>
          </div>
          {/* filter option */}
        </div>
        {renderRestaurants()}

        <div className="flex items-center justify-center mt-8 space-x-4">
          <button onClick={handlePrevPage}  className="px-2 py-2 border border-[orange] rounded-full cursor-pointer hover:bg-[orange]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="h-6 w-6 text-[orange] hover:text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="font-semibold">
            {activePage} of {Math.ceil(totalRestaurants / limit)}
          </span>
          <button onClick={handleNextPage} className="px-2 py-2 border border-[orange] rounded-full cursor-pointer hover:bg-[orange]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="h-6 w-6 text-[orange] hover:text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
