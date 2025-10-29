export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // WhatsApp expects numbers in international format without + or dashes
    const phoneNumber = "2348079869704"; // Replace with your WhatsApp number (no +)
    const message = encodeURIComponent(
      "Hello! I am interested in your products and services at Shinung Square."
    );
    // Use window.open with noopener for security
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
      title="Chat with us on WhatsApp"
    >
      {/* Floating button */}
      <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl transform-gpu transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300">
        {/* WhatsApp SVG - uses currentColor for easy theming */}
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          aria-hidden
        >
          <path d="M12.04 2C6.49 2 2 6.48 2 12.02c0 2.12.63 4.08 1.72 5.73L2 22l4.38-1.43A10.01 10.01 0 0012.04 22c5.55 0 10.04-4.48 10.04-9.98C22.08 6.48 17.59 2 12.04 2zm5.28 14.1c-.25.7-1.44 1.35-1.98 1.44-.52.09-1.16.12-2.07-.24-2.19-.9-3.59-3.12-3.7-3.27-.11-.15-.9-1.21-.9-2.31 0-1.1.59-1.6.8-1.82.21-.21.46-.26.62-.26.16 0 .35 0 .53 0 .18.01.41-.06.63.48.22.54.73 1.86.8 2 .07.13.11.28.02.45-.09.17-.13.28-.26.43-.13.16-.26.35-.37.48-.12.13-.24.27-.06.53.18.26.8 1.31 1.72 2.12 1.17 1.05 2.14 1.26 2.41 1.4.27.14.44.12.6-.07.16-.19.7-.82.9-1.11.2-.29.4-.24.68-.14.28.1 1.78.84 2.09.99.31.16.52.24.6.37.08.13.08.75-.17 1.45z" />
        </svg>

        {/* Optional pulse ring */}
        <span
          className="absolute -inset-0.5 rounded-full opacity-60 blur-lg bg-green-500/40 animate-pulse hidden sm:block"
          aria-hidden
        />
      </span>

      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </button>
  );
}
