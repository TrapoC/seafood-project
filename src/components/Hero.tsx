import { useEffect, useRef, useState } from "react";

export function Hero(): JSX.Element {
  // Five curated seafood images (external URLs). Replace with local assets if preferred.
  const images = [
    {
      src: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374",
      alt: "Fresh shrimp on ice",
    },
    {
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
      alt: "Assortment of fresh fish",
    },
    {
      src: "https://images.unsplash.com/photo-1660120447916-123439b05c40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
      alt: "Grilled seafood platter",
    },
    {
      src: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=823",
      alt: "Oysters on the half shell",
    },
    {
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      alt: "Lobster and lemon garnish",
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Advance every 2 seconds when not paused
    if (!paused) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paused, images.length]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black text-white min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[95vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images (absolute) */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out transform-gpu ${
            i === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110 pointer-events-none"
          }`}
        />
      ))}

      {/* Overlay to improve text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      <div className="relative container mx-auto px-4 py-20 md:py-36 lg:py-44">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
            Premium Seafood, Natural Spices &{" "}
            <span className="text-green-300">Catering Services</span>
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-6 leading-relaxed">
            Experience the finest selection of fresh seafood, authentic natural
            spices, and traditional ingredients delivered right to your
            doorstep. We also offer professional catering services for all your
            events.
          </p>
          <a
            href="#products"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-green-600 transition-colors shadow-lg"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Dots (bottom center) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              i === index ? "bg-white/90" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
