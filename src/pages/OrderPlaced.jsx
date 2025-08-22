import { Link } from "react-router-dom"
export default function OrderPlaced() {
  return (
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755839856/payment_success_ealkxe.svg" alt="" />
        <h1 className="text-[#1E293B] font-semibold text-2xl">Payment Successful</h1>
        <p className="text-[#64748B] text-base text-center">Thank you for ordering! <br /> Your payment is successfully completed.</p>
        <Link to="/" className="text-white bg-[#F7931E] font-semibold px-6 py-2 rounded-xl">Go To Home Page</Link>
      </div>
  )
}
