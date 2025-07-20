import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import RestaurantDetails from './pages/RestaurantDetails'
import NotFound from './pages/NotFound'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
