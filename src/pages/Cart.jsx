import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import OrderPlaced from './OrderPlaced';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, incrementItemQuantity, decrementItemQuantity, calculateOrderTotal } = useCart();

  const handlePlaceOrder = () => {
    <OrderPlaced />
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 min-h-screen">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755840602/empty_Cart_ouoizt.svg" alt="" className="w-60 h-60"/>
            <h1 className="text-[#1E293B] font-semibold text-2xl">No Orders Yet!</h1>
            <p className="text-[#64748B] text-base text-center">Your cart is empty. Add something from the menu.</p>
            <Link to="/" className="text-white bg-[#F7931E] font-medium px-6 py-2 rounded-lg">Order Now</Link>
          </div>
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
                    className="bg-white text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white border rounded-full"
                  >
                    -
                  </button>
                  <span className="mx-4">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementItemQuantity(item.id)}
                    className="bg-white text-green-500 px-3 py-1 hover:bg-green-500 hover:text-white border rounded-full"
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
                <Link to="/order-placed">Place Order</Link>
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
