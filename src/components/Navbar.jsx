import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="bg-[#F8FAFC] shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-[#F7931E]"
          >
            <img
              src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1754365256/tasty_logo_elrolb.svg"
              alt="logo"
              className="h-8"
            />
            <span className="italic">Tasty Kitchens</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-[#F7931E]"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-lg font-semibold hover:text-[#F7931E]"
            >
              Cart
            </Link>
            <button className="bg-[#F7931E] text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-500 cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-[#1e293b] focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="bg-white md:hidden border-t border-gray-200">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-[#1e293b] hover:text-[#F7931E]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-[#F7931E]"
              >
                Cart
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-[#F7931E] text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}