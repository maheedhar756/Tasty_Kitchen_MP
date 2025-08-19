import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OffersCarousel = () => {
  const [offers, setOffers] = useState([])
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const jwtToken = Cookies.get('jwt_token')
        const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        const data = await response.json()
        // console.log('API Response:', data)
        setOffers(data.offers || [])
        // setLoading(false)
      } catch (error) {
        console.error('Error fetching offers:', error)
        // setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
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
