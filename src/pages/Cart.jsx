import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, incrementItemQuantity, decrementItemQuantity, calculateOrderTotal } = useCart();

  const handlePlaceOrder = () => {
    // dummy
  };

  return (
    <>
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
    </>
  );
};

export default Cart;
