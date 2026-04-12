export interface Restaurant {
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

export const restaurants: Restaurant[] = [
  {
    id: 'crafty-chameleon',
    name: 'Crafty Chameleon Brewery',
    description: "Nairobi's premier beer garden and microbrewery. Wood-fired pizzas, juicy burgers, and craft beers brewed on-site just 5 meters from the taps.",
    location: '159 James Gichuru Road, Lavington',
    hours: 'Mon-Sun: 11AM - 11PM',
    rating: 4.6,
    reviews: '500+',
    cuisine: ['Brewery', 'Pizza', 'Burgers'],
    priceRange: 'KES 400 - 2,000',
    image: '/restaurant_frame.jpg',
    logo: '/crafty_chameleon_logo.png',
    featured: true,
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
    featured: true,
  },
];
