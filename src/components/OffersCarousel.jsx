import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OffersCarousel = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        console.log('Fetching offers...')
        const response = await fetch('https://apis.ccbp.in/restaurants-list/offers')
        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('API Response:', data)
        setOffers(data.offers || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching offers:', error)
        setLoading(false)
      }
    }
    

    fetchOffers()
  }, [])

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

  console.log('Current offers state:', offers)
  console.log('Loading state:', loading)

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-8 flex items-center justify-center">
        <div className="text-gray-500">Loading offers...</div>
      </div>
    )
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-gray-500">No offers available</div>
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