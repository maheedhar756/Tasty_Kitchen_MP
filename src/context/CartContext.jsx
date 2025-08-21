/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const incrementItemQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decrementItemQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const calculateOrderTotal = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        incrementItemQuantity,
        decrementItemQuantity,
        calculateOrderTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}