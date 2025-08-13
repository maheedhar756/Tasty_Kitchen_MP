import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OffersCarousel = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const jwtToken = Cookies.get('jwt_token')
        console.log('JWT Token:', jwtToken ? 'Token exists' : 'No token found')
        
        if (!jwtToken) {
          console.log('No JWT token found, redirecting to login')
          navigate('/login')
          return
        }

        const jwtToken = Cookies.get('jwt_token')
        const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', {
          headers:{
            Authorization: `Bearer ${jwtToken}`
          },
        })
        const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        
        
        if (response.status === 401) {
          console.log('Token expired or invalid, redirecting to login')
          Cookies.remove('jwt_token')
          navigate('/login')
          return
        }
        
        const data = await response.json()
        setOffers(data.offers || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching offers:', error)
        setError('Failed to load offers')
        setLoading(false)
      }
    }
    fetchOffers()
  }, [navigate])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-8 flex items-center justify-center">
        <div className="text-gray-500">Loading offers...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-red-50 border border-red-200 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }
  return (
    <div className="w-full mb-8 px-4">
      <Slider {...settings}>
        {offers.map((offer) => (
          <div key={offer.id} className="outline-none">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <img
                src={offer.image_url}
                alt={`Offer ${offer.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2">Special Offer</h3>
                  <p className="text-lg md:text-xl">Don't miss out on our amazing deals!</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default OffersCarousel
      <div className="w-full h-64 bg-gray-50 border border-gray-200 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-gray-600">No offers available at the moment</div>
      </div>