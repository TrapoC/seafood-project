import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md bg-green-00 flex items-center justify-center overflow-hidden">
                {/* Placeholder image: replace /logo.png with your PNG in public/ or use an imported asset */}
                <img
                  src="https://photos.fife.usercontent.google.com/pw/AP1GczPtvuGLkZkORkEeCfaLY2A1hmfoSaVIzmWDfbCr1EpKtpy1xc-OX9rtkA=w731-h731-s-no-gm?authuser=1"
                  alt="Shinung Square logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">Shinung Square</h3>
                <p className="text-sm text-gray-400">
                  Premium Seafood & Catering
                </p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 max-w-sm">
              Your one-stop shop for premium seafood, natural spices, and
              professional catering services — delivered fresh and handled with
              care.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center hover:bg-white/12 transition"
              >
                {/* Instagram SVG */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 11.37A3 3 0 1112.63 9 3 3 0 0115 11.37z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 6.5h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center hover:bg-white/12 transition"
              >
                {/* Twitter SVG */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-gray-400">
              <a href="#home" className="hover:text-green-400 transition">
                Home
              </a>
              <a href="#products" className="hover:text-green-400 transition">
                Products
              </a>
              <a href="#about" className="hover:text-green-400 transition">
                About
              </a>
              <a href="#contact" className="hover:text-green-400 transition">
                Contact
              </a>
            </div>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Stay in the loop</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates, specials and seasonal
              offers.
            </p>

            <form
              className="flex gap-2 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-md bg-white/5 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 text-gray-400">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span>+234 807 986 9704</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Mail className="w-5 h-5 text-green-400" />
                <span>shiningsquare@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-gray-400">
                <MapPin className="w-5 h-5 text-green-400" />
                <span>Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-400">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Shinung Square. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm hover:text-green-400 transition">
              Privacy
            </a>
            <a href="#" className="text-sm hover:text-green-400 transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
