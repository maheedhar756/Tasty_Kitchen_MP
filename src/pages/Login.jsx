import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    const userDetails = { username, password }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const res = await fetch('https://apis.ccbp.in/login', options)
    const data = await res.json()

    if (res.ok) {
      Cookies.set('jwt_token', data.jwt_token, { expires: 7 })
      navigate('/')
    } else {
      alert(data.error_msg)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <img src="logo.png" alt="website logo" className="mb-4" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border mb-2 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border mb-4 p-2 rounded"
        />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login
