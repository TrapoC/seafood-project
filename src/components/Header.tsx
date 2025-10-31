import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = 2; // placeholder; wire to real cart state if available

  return (
    <header className="backdrop-blur-sm bg-white/80 border-b sticky top-0 z-50">
      <div className="container mx-auto px-3 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 lg:gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-md bg-green-00 overflow-hidden">
              {/* Placeholder image: replace /logo.png with your PNG in public/ or use an imported asset */}
              <img
                src="https://previews.dropbox.com/p/thumb/ACzFLWshn_ykf9LuBtjZ9rc_YGe6iRbZdqtPh8nS5glKqZD_RAECIa7xtNGiOtoWh0dU6yLFJpCa8-xWOunyprfZbChIFUYCumkgOs7GKh7Atg6SNqVVOPYKpxu3TcaExAZdxmYtBnCDwOThKIpwws9bhAYHECoJlmGT7qlRLtuIN6R6q4pdxuuxcawYYT3MrbHfjFBKOEyz_nUFgDeRiQk0Hq5ytwFSlKU8WyejGzSSrKbOXkXVlQZwG1KgEsXx0fEoliDcPyr9I1sIBqltrezCal8P2zliYH_-V4zkeDl6LYiwT8LSgjGeb6Nbzw3Ug3VBhhmFhMMWzdA5NJLjHz6v/p.png?is_prewarmed=true"
                alt="Shinung Square logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900 leading-tight">
                Shinung Square
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Premium Seafood & Catering
              </p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#products"
              className="hidden md:inline-block bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Shop Now
            </a>

            <button
              aria-label="Open cart"
              className="relative p-2 rounded-md hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="md:hidden mt-3">
            <div className="rounded-lg bg-white/95 shadow-lg p-4 animate-fade-in">
              <nav className="flex flex-col space-y-3">
                <a
                  onClick={() => setIsMenuOpen(false)}
                  href="#home"
                  className="text-gray-800 hover:text-green-600 font-medium"
                >
                  Home
                </a>
                <a
                  onClick={() => setIsMenuOpen(false)}
                  href="#products"
                  className="text-gray-800 hover:text-green-600 font-medium"
                >
                  Products
                </a>
                <a
                  onClick={() => setIsMenuOpen(false)}
                  href="#about"
                  className="text-gray-800 hover:text-green-600 font-medium"
                >
                  About
                </a>
                <a
                  onClick={() => setIsMenuOpen(false)}
                  href="#contact"
                  className="text-gray-800 hover:text-green-600 font-medium"
                >
                  Contact
                </a>
                <a
                  href="#products"
                  className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-md font-semibold text-center"
                >
                  Shop Now
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
