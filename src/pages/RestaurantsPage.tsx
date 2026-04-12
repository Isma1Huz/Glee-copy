import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Utensils, ChevronRight, ArrowLeft } from 'lucide-react';
import { restaurants } from '@/data/restaurants';
import RestaurantBookingModal from '@/components/RestaurantBookingModal';
import OrderCheckoutModal from '@/components/OrderCheckoutModal';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// Derive all unique cuisine tags from the data
const allCuisines = Array.from(
  new Set(restaurants.flatMap((r) => r.cuisine))
);
const filterTabs = ['All', ...allCuisines];

export default function RestaurantsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookingRestaurantId, setBookingRestaurantId] = useState<string | null>(null);
  const [orderCheckoutOpen, setOrderCheckoutOpen] = useState(false);
  const [cart] = useState<CartItem[]>([]);
  const [cartTotal] = useState(0);

  const filtered =
    activeFilter === 'All'
      ? restaurants
      : restaurants.filter((r) => r.cuisine.includes(activeFilter));

  const bookingRestaurant = restaurants.find((r) => r.id === bookingRestaurantId);

  return (
    <div className="min-h-screen bg-glee-bg">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Top Nav Bar */}
      <nav className="sticky top-0 z-50 bg-glee-bg/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-glee-text-muted hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <span className="text-white/20">|</span>
        <p className="mono-text text-neon-pink text-xs">RESTAURANTS</p>
      </nav>

      <main className="relative px-6 md:px-[6vw] py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center">
              <Utensils className="w-6 h-6 text-neon-pink" />
            </div>
            <div>
              <p className="mono-text text-neon-pink">ALL RESTAURANTS</p>
              <h1
                className="text-white font-display font-black uppercase tracking-tight"
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1 }}
              >
                DINE WITH US
              </h1>
            </div>
          </div>
          <p className="text-glee-text-muted max-w-xl">
            Browse Nairobi's finest restaurants. Filter by cuisine and book your table or order
            directly through Glee.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all border ${
                activeFilter === tab
                  ? 'bg-neon-pink border-neon-pink text-white'
                  : 'border-white/15 text-glee-text-muted hover:border-neon-pink/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group relative overflow-hidden rounded-[26px] bg-glee-bg-secondary border border-white/5 hover:border-neon-pink/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-glee-bg via-glee-bg/50 to-transparent" />

                {restaurant.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neon-pink text-white text-xs font-medium">
                    Featured
                  </div>
                )}

                {restaurant.logo && (
                  <div className="absolute bottom-4 left-4">
                    <img
                      src={restaurant.logo}
                      alt={`${restaurant.name} logo`}
                      className="h-14 w-14 object-contain rounded-lg bg-white/10 backdrop-blur-sm p-1"
                    />
                  </div>
                )}

                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-glee-bg/80 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium text-sm">{restaurant.rating}</span>
                  <span className="text-glee-text-muted text-xs">({restaurant.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-display font-bold text-xl mb-2 group-hover:text-neon-pink transition-colors">
                  {restaurant.name}
                </h3>

                <p className="text-glee-text-muted text-sm mb-4 line-clamp-2">
                  {restaurant.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-glee-text-muted mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neon-pink" />
                    {restaurant.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-neon-pink" />
                    {restaurant.hours}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.cuisine.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="px-3 py-1 rounded-full bg-neon-pink/10 text-neon-pink text-xs font-medium"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-glee-text-muted text-xs">Price Range</p>
                    <p className="text-white font-medium">{restaurant.priceRange}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setBookingRestaurantId(restaurant.id)}
                      className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/5 transition-colors"
                    >
                      Book Table
                    </button>
                    <button
                      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-pink text-white text-sm hover:bg-neon-pink/80 transition-colors"
                    >
                      View Menu
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Book Table Modal */}
      <RestaurantBookingModal
        isOpen={!!bookingRestaurantId}
        onClose={() => setBookingRestaurantId(null)}
        restaurantName={bookingRestaurant?.name ?? ''}
        restaurantLogo={bookingRestaurant?.logo ?? ''}
      />

      {/* Checkout Modal (if navigated from details page) */}
      <OrderCheckoutModal
        isOpen={orderCheckoutOpen}
        onClose={() => setOrderCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        restaurantName={bookingRestaurant?.name ?? ''}
        restaurantLogo={bookingRestaurant?.logo ?? ''}
      />
    </div>
  );
}
