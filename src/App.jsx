import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import RestaurantDetails from './pages/RestaurantDetails'
import NotFound from './pages/NotFound'
import { CartProvider } from '../src/context/CartContext'
import OrderPlaced from './pages/OrderPlaced'
import { Analytics } from '@vercel/analytics/next'

import './App.css'

function App() {

  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/restaurant/:restrauntId" element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
          <Route path="/order-placed" element={<ProtectedRoute><OrderPlaced /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
      <Analytics />
    </>
  )
}

export default App