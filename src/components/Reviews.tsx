import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Adaeze Okonkwo",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "The quality of seafood from Shinung Square is unmatched. The crayfish is always fresh and perfectly dried. I have been a loyal customer for over a year now and they never disappoint!",
    date: "Feb 2026",
  },
  {
    id: 2,
    name: "Emmanuel Bassey",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "Their catfish and mangala are always top-notch. The packaging is excellent and delivery is prompt. Best seafood supplier I have found online. Highly recommended!",
    date: "Jan 2026",
  },
  {
    id: 3,
    name: "Chioma Eze",
    location: "Port Harcourt, Nigeria",
    rating: 4,
    text: "Amazing spice collection! The uziza and ehuru seeds are very aromatic and fresh. It gives my soups an authentic taste. Customer service is also very friendly and responsive.",
    date: "Jan 2026",
  },
  {
    id: 4,
    name: "Tunde Adeyemi",
    location: "Ibadan, Nigeria",
    rating: 5,
    text: "I ordered their catering service for my wedding and it was phenomenal. The seafood platters were a hit with all our guests. Professional service from start to finish.",
    date: "Dec 2025",
  },
  {
    id: 5,
    name: "Blessing Nwosu",
    location: "Enugu, Nigeria",
    rating: 5,
    text: "Shinung Square has the best prawns and periwinkles! Always fresh, always clean, and the prices are very fair. WhatsApp ordering makes it so convenient.",
    date: "Nov 2025",
  },
  {
    id: 6,
    name: "Fatima Ibrahim",
    location: "Kano, Nigeria",
    rating: 4,
    text: "Their natural spices are incredible. The ginger and turmeric are very potent and fresh. I also love their zobo leaves. Great quality products!",
    date: "Nov 2025",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-gray-200 fill-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
            Trusted by hundreds of satisfied customers across Nigeria
          </p>

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-3">
            <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-green-100 mb-3" />

              {/* Rating */}
              <StarRating rating={review.rating} />

              {/* Review text */}
              <p className="mt-4 text-gray-600 leading-relaxed text-sm">
                "{review.text}"
              </p>

              {/* Reviewer info */}
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.location} &middot; {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
