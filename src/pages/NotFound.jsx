import { Link } from "react-router-dom"
export default function NotFound () {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755490812/not_found_q2yl3t.svg" alt="not found" className="mb-10" />
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found. <br /> Please check the URL or return to the homepage.</p>
      <Link to="/"><button className="mt-4 px-4 py-2 bg-[#F7931E] text-white rounded cursor-pointer">Home Page</button></Link>
    </div>
  )
}