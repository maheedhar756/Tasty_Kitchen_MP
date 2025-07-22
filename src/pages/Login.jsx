import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ChefHat } from 'lucide-react'
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    
    const userDetails = { username, password }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const res = await fetch('https://apis.ccbp.in/login', options)
      const data = await res.json()

      if (res.ok) {
        Cookies.set('jwt_token', data.jwt_token, { expires: 7 })
        navigate('/')
      } else {
        setError('Please enter a valid Username & Password')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Food Image */}
      <div className="w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent z-20"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-sm px-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-orange-500 font-semibold text-lg">Tasty Kitchens</span>
            </div>
          </div>

          {/* Login Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Login</h1>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login