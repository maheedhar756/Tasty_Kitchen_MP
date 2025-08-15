import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"

export default function RestaurantCard({ restaurant }) {
  const { id, name, cuisine, user_rating, image_url } = restaurant
  const { rating, total_reviews } = user_rating

  return (
    <Link to={`/restaurant/${id}`} className="block">
      <div className="flex bg-white rounded-lg overflow-hidden p-3">
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden mr-4">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-bold text-[#183B56] truncate">{name}</h3>
          <p className="text-[#64748B] text-sm md:text-base">{cuisine}</p>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-[#183B56] font-semibold text-sm">{rating}</span>
            <span className="text-[#64748B] text-xs ml-1">({total_reviews} ratings)</span>
          </div>
        </div>
      </div>
    </Link>
  )
}