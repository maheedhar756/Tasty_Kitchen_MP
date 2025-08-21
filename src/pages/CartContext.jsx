import { createContext, useState } from 'react'

const CartContext = createContext()

export default function CartProvider({ children }){
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (item) => {
    setCartItems(prevItem => {
      const existingItem = prevItem.find(cartItem => cartItem.id === item.id)
      if(existingItem){
        return prevItem.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      } else {
        return [...prevItem, { ...item, quantity: 1 }]
      }
    })
  }

  const incrementItemQuantity = (item) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    )
  }

  const decrementItemQuantity = (item) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return(
    <CartContext.Provider
      value = {{
        cartItems,
        addItemToCart,
        incrementItemQuantity,
        decrementItemQuantity,
        clearCart,
        cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}