import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-[#F8FAFC] p">
      <Link to="/" className="text-xl font-bold text-[#F7931E] italic flex items-center gap-3">
        <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1754365256/tasty_logo_elrolb.svg" alt="logo" />
        Tasty Kitchens
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-[#F7931E]">Home</Link>
        <Link to="/cart" className="hover:text-[#F7931E]">Cart</Link>
        <button onClick={handleLogout} className="text-white bg-[#F7931E] px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar;