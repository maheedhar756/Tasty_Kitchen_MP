import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import { FaStar } from "react-icons/fa"
import Footer from '../components/Footer'


const RestaurantDetails = () => {
  const { restrauntId } = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setLoading(true)
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
      
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
  }, [restrauntId])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
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

  const {name, cuisine, location, rating, reviews_count, cost_for_two, image_url, food_items} = restaurantData

  return (
    <>
      <Navbar />
      <div className=" md:p-8">
        <div className="bg-[url(https://res.cloudinary.com/dzyaesd9l/image/upload/v1755492611/restarBG_ugomzo.svg)] flex flex-col md:flex-row items-center md:items-start rounded-lg p-6">
          <img src={image_url} alt={name} className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
          <div className="text-center pt-6 md:text-left">
            <h1 className="text-3xl font-bold text-white">{name}</h1>
            <p className="text-white mt-2">{cuisine}</p>
            <p className="text-white mt-1">{location}</p>
            <p className="text-white mt-1">Cost for two: ₹{cost_for_two}</p>
            <div className="flex items-center justify-center md:justify-start mt-4 space-x-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <FaStar className="text-white rounded-full h-6 w-6" />
                  <span className="ml-2 font-bold text-white">{rating}</span>
                </div>
                <p className="text-sm text-white mt-1">{reviews_count}+ Ratings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {food_items.map(item => (
              <div key={item.id} className="p-4 rounded-lg flex items-center shadow-md">
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
      <Footer />
    </>
  )
}

export default RestaurantDetails