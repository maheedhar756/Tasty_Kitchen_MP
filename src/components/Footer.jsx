export default function Footer() {
  return (
    <footer class="bg-[#0F172A] text-white py-12 px-4 md:px-0">
      <div class="container mx-auto flex flex-col items-center">
        <div class="text-center mb-6">
          <div className="flex"><img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755146277/Frame_275_og5xn3.svg" alt="logo" classname="h-12 mb-2" />
          <h3 class="text-2xl font-bold mt-2 italic pl-3">Tasty Kitchens</h3></div>
          <p class="mt-2 text-sm text-white">The only thing we are serious about is food.</p>
          <p class="mt-1 text-sm text-white">Contact us on</p>
        </div>

        <div class="flex space-x-5">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755165704/pinterest_ngqceq.svg" alt="pinterest" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755165704/insta_msz2ro.svg" alt="instagram" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755165704/twitter_yimxq7.svg" alt="twitter" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <img src="https://res.cloudinary.com/dzyaesd9l/image/upload/v1755165704/fb_bt09pi.svg" alt="facebook" />
          </a>
        </div>
      </div>
    </footer>
  )
}