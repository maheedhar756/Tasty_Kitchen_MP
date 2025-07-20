import Navbar from '../components/Navbar'
import Loader from '../components/Loader'

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {/* Render Cart Items from localStorage */}
      </div>
    </>
  )
}

export default Cart
