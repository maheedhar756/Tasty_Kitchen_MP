import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between p-4 shadow-md">
      <Link to="/" className="text-xl font-bold text-red-500">TASTY KITCHENS</Link>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <Link to="/cart" className="hover:text-red-500">Cart</Link>
        <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar;