import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const incrementItemQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItemQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const calculateOrderTotal = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        incrementItemQuantity,
        decrementItemQuantity,
        calculateOrderTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, incrementItemQuantity, decrementItemQuantity, calculateOrderTotal } = useCart();

  const handlePlaceOrder = () => {
    // dummy
  };

  // Dummy Navbar and Footer components for demonstration
  const Navbar = () => (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-orange-500 italic">Tasty Kitchens</h1>
      <div className="flex space-x-4">
        <button onClick={() => navigate('/')} className="text-gray-700 hover:text-orange-500">Home</button>
        <button onClick={() => navigate('/cart')} className="text-gray-700 hover:text-orange-500">Cart</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Logout</button>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white p-6 text-center mt-8">
      <p className="text-xl font-bold">Tasty Kitchens</p>
      <p className="mt-2">The only thing we are serious about is food.</p>
      <p className="mt-1">Contact us on</p>
      <div className="flex justify-center space-x-4 mt-4">
        {/* Dummy social icons */}
        <span className="text-2xl">P</span>
        <span className="text-2xl">I</span>
        <span className="text-2xl">T</span>
        <span className="text-2xl">F</span>
      </div>
    </footer>
  );

  return (
    // Wrap the entire content with CartProvider to make the context available
    <CartProvider>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty. Add some delicious food!</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-4 border-b border-dashed border-gray-300 font-bold text-gray-700">
              <div className="col-span-1">Item</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Price</div>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center py-4 border-b border-gray-200">
                <div className="col-span-1 flex items-center">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <span className="font-semibold text-gray-800">{item.name}</span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    onClick={() => decrementItemQuantity(item.id)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 border-t border-b border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementItemQuantity(item.id)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300 focus:outline-none"
                  >
                    +
                  </button>
                </div>
                <div className="col-span-1 text-right font-medium text-gray-800">₹{(item.cost * item.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div className="flex justify-end items-center mt-6">
              <span className="text-xl font-bold text-gray-900 mr-4">Order Total :</span>
              <span className="text-2xl font-bold text-orange-600">₹{calculateOrderTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePlaceOrder}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md shadow-lg focus:outline-none focus:shadow-outline"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </CartProvider>
  );
};

export default CartPage;
