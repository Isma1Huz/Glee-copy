import { useRef, useLayoutEffect } from 'react';
import { MapPin, Clock, Star, Utensils, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  hours: string;
  rating: number;
  reviews: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  logo?: string;
  featured?: boolean;
}

interface RestaurantsListProps {
  onViewMenu: (restaurantId: string) => void;
  onBookTable: (restaurantId: string) => void;
}

const restaurants: Restaurant[] = [
  {
    id: 'crafty-chameleon',
    name: 'Crafty Chameleon Brewery',
    description: 'Nairobi\'s premier beer garden and microbrewery. Wood-fired pizzas, juicy burgers, and craft beers brewed on-site just 5 meters from the taps.',
    location: '159 James Gichuru Road, Lavington',
    hours: 'Mon-Sun: 11AM - 11PM',
    rating: 4.6,
    reviews: '500+',
    cuisine: ['Brewery', 'Pizza', 'Burgers'],
    priceRange: 'KES 400 - 2,000',
    image: '/restaurant_frame.jpg',
    logo: '/crafty_chameleon_logo.png',
    featured: true
  },
  {
    id: 'oyster-bay',
    name: 'Oyster Bay',
    description: 'Upscale seafood restaurant offering fresh ocean delights, premium steaks, and an extensive cocktail menu. Perfect for special occasions and fine dining.',
    location: 'Kilungu Rd, Nairobi',
    hours: 'Mon-Sun: 10AM - 11PM',
    rating: 4.5,
    reviews: '270+',
    cuisine: ['Seafood', 'Steaks', 'American'],
    priceRange: 'KES 1,100 - 7,500',
    image: '/oyster_bay.jpg',
    featured: true
  }
];

export default function RestaurantsList({ onViewMenu, onBookTable }: RestaurantsListProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.restaurant-card');
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              }
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-50 bg-glee-bg py-[8vh] px-[6vw]">
      {/* Header */}
      <div ref={headerRef} className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center">
            <Utensils className="w-6 h-6 text-neon-pink" />
          </div>
          <div>
            <p className="mono-text text-neon-pink">RESTAURANTS</p>
            <h2 
              className="text-white font-display font-black uppercase tracking-tight"
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1 }}
            >
              DINE WITH US
            </h2>
          </div>
        </div>
        <p className="text-glee-text-muted max-w-xl">
          Discover Nairobi's finest restaurants. From craft breweries to upscale seafood dining, 
          book your table and order directly through Glee.
        </p>
      </div>

      {/* Restaurant Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {restaurants.map((restaurant) => (
          <div 
            key={restaurant.id}
            className="restaurant-card group relative overflow-hidden rounded-[26px] bg-glee-bg-secondary border border-white/5 hover:border-neon-pink/30 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-glee-bg via-glee-bg/50 to-transparent" />
              
              {/* Featured Badge */}
              {restaurant.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neon-pink text-white text-xs font-medium">
                  Featured
                </div>
              )}

              {/* Logo Overlay */}
              {restaurant.logo && (
                <div className="absolute bottom-4 left-4">
                  <img 
                    src={restaurant.logo} 
                    alt={`${restaurant.name} logo`}
                    className="h-14 w-14 object-contain rounded-lg bg-white/10 backdrop-blur-sm p-1"
                  />
                </div>
              )}

              {/* Rating */}
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

              {/* Details */}
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

              {/* Cuisine Tags */}
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

              {/* Price & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <p className="text-glee-text-muted text-xs">Price Range</p>
                  <p className="text-white font-medium">{restaurant.priceRange}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onBookTable(restaurant.id)}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/5 transition-colors"
                  >
                    Book Table
                  </button>
                  <button 
                    onClick={() => onViewMenu(restaurant.id)}
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
    </section>
  );
}
