import { ShoppingCart, Menu, X, Fish } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = 2;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-md group-hover:shadow-green-200 transition-shadow duration-300">
              <Fish className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight tracking-tight">
                Shinung Square
              </h1>
              <p className="text-[11px] text-emerald-600 font-medium tracking-wide uppercase">
                Premium Seafood & Catering
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-gray-100/80 rounded-full px-1 py-1">
              {[
                { label: "Home", href: "#home" },
                { label: "Products", href: "#products" },
                { label: "About", href: "#about" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-white rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="#products"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-green-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Now
            </a>

            <button
              aria-label="Open cart"
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-80 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col bg-gray-50 rounded-2xl p-2 shadow-inner">
            {[
              { label: "Home", href: "#home" },
              { label: "Products", href: "#products" },
              { label: "About", href: "#about" },
              { label: "Reviews", href: "#reviews" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                onClick={() => setIsMenuOpen(false)}
                href={link.href}
                className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-white font-medium rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#products"
              onClick={() => setIsMenuOpen(false)}
              className="mt-1 mx-2 mb-1 text-center bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-xl font-semibold"
            >
              Shop Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
