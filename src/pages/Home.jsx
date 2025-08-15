import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import OffersCarousel from '../components/offerscarousel'
import RestaurantCards from '../components/RestaurantCards'
import Footer from '../components/Footer'

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  // const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const limit = 9 // Number of restaurants per page
  const totalRestaurants = 30

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
      } catch (error) {
        console.error('Error fetching restaurants:', error)
      }
    }
    fetchRestaurants()
  }, [activePage])

  const handleNextPage = () => {
    if (activePage * limit < totalRestaurants) {
      setActivePage((prevPage) => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1)
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
          {/* Sorting functionality can be added here */}
          {/* <select> ... </select> */}
        </div>
        {renderRestaurants()}

        <div className="flex items-center justify-center mt-8 space-x-4">
          <button onClick={handlePrevPage} disabled={activePage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
            &lt;
          </button>
          <span className="font-semibold">
            {activePage} of {Math.ceil(totalRestaurants / limit)}
          </span>
          <button onClick={handleNextPage} disabled={activePage * limit >= totalRestaurants} className="px-3 py-1 border rounded disabled:opacity-50">
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
