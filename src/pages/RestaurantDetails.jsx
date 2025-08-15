import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'

const RestaurantDetails = () => {
  const { id } = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setLoading(true)
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
      
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      try {
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        setRestaurantData(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching restaurant details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurantDetails()
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-4">Loading restaurant details...</div>
      </>
    )
  }
  
  if (!restaurantData) {
    return (
      <>
        <Navbar />
        <div className="p-4">Restaurant not found.</div>
      </>
    )
  }

  const {
    name,
    cuisine,
    location,
    rating,
    reviews_count,
    cost_for_two,
    image_url,
    food_items
  } = restaurantData

  return (
    <>
      <Link to={`/restaurant/${id}`}>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 rounded-lg p-6">
          <img src={image_url} alt={name} className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#183B56]">{name}</h1>
            <p className="text-gray-600 mt-2">{cuisine}</p>
            <p className="text-gray-600 mt-1">{location}</p>
            <p className="text-gray-600 mt-1">Cost for two: ₹{cost_for_two}</p>
            <div className="flex items-center justify-center md:justify-start mt-4 space-x-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <FaStar className="text-white bg-green-500 rounded-full p-1 h-6 w-6" />
                  <span className="ml-2 font-bold text-[#183B56]">{rating}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{reviews_count}+ Ratings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#183B56] mb-4">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {food_items.map(item => (
              <div key={item.id} className="border p-4 rounded-lg flex items-center shadow-sm">
                <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="font-bold text-[#183B56]">{item.name}</h3>
                  <p className="text-gray-600">₹{item.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </Link>
      <Footer />
    </>
  )
}

export default RestaurantDetails