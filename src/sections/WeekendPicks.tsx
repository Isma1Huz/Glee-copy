import { useRef, useLayoutEffect, useState } from 'react';
import { MapPin, Clock, Tag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  tags: string[];
  category: string;
}

interface WeekendPicksProps {
  selectedCategory: string;
  onGetTickets: (event: Event) => void;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Neon Nights Rooftop',
    date: 'Fri, Mar 14',
    time: '9PM',
    location: 'Downtown',
    price: 'From $25',
    image: '/event_thumb_1.jpg',
    tags: ['Club', 'Rooftop'],
    category: 'Clubs'
  },
  {
    id: 2,
    title: 'Underground Groove',
    date: 'Sat, Mar 15',
    time: '10PM',
    location: 'Warehouse District',
    price: 'From $15',
    image: '/event_thumb_2.jpg',
    tags: ['Techno'],
    category: 'Clubs'
  },
  {
    id: 3,
    title: 'Sunset Sessions',
    date: 'Sat, Mar 15',
    time: '6PM',
    location: 'Beach Club',
    price: 'Free',
    image: '/event_thumb_3.jpg',
    tags: ['Chill'],
    category: 'Festivals'
  },
  {
    id: 4,
    title: 'Bass Arena',
    date: 'Sun, Mar 16',
    time: '8PM',
    location: 'Arena Hall',
    price: 'From $40',
    image: '/event_thumb_4.jpg',
    tags: ['Bass', 'Live'],
    category: 'Concerts'
  },
  {
    id: 5,
    title: 'Jazz & Neons',
    date: 'Sun, Mar 16',
    time: '7PM',
    location: 'Lounge 88',
    price: 'From $20',
    image: '/event_thumb_5.jpg',
    tags: ['Jazz'],
    category: 'Concerts'
  },
  {
    id: 6,
    title: 'Crafty Chameleon Brewery',
    date: 'Daily',
    time: '11AM - 11PM',
    location: 'Lavington, Nairobi',
    price: 'From KES 400',
    image: '/restaurant_frame.jpg',
    tags: ['Brewery', 'Restaurant', 'Craft Beer'],
    category: 'Restaurants'
  },
  {
    id: 7,
    title: 'Neon Bistro - Dinner & Drinks',
    date: 'Thu - Sun',
    time: '6PM - 2AM',
    location: 'Westlands',
    price: 'From KES 1,200',
    image: '/event_thumb_5.jpg',
    tags: ['Fine Dining', 'Cocktails'],
    category: 'Restaurants'
  },
  {
    id: 8,
    title: 'Rooftop Grill House',
    date: 'Daily',
    time: '12PM - 11PM',
    location: 'Kilimani',
    price: 'From KES 1,500',
    image: '/event_thumb_1.jpg',
    tags: ['Steakhouse', 'Views'],
    category: 'Restaurants'
  }
];

const filters = ['All', 'Clubs', 'Concerts', 'Festivals', 'Restaurants', 'Free'];

export default function WeekendPicks({ selectedCategory, onGetTickets }: WeekendPicksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState(selectedCategory);

  const filteredEvents = activeFilter === 'All' 
    ? events 
    : activeFilter === 'Free'
      ? events.filter(e => e.price === 'Free')
      : events.filter(e => e.category === activeFilter);

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

      // Filters animation
      if (filtersRef.current) {
        const filterChips = filtersRef.current.querySelectorAll('.filter-chip');
        gsap.fromTo(filterChips,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.event-card');
        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
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
  }, [filteredEvents]);

  return (
    <section ref={sectionRef} className="relative z-50 bg-glee-bg py-[8vh] px-[6vw]">
      {/* Header */}
      <div ref={headerRef} className="mb-8">
        <h2 
          className="text-white font-display font-black uppercase tracking-tight mb-2"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1 }}
        >
          WEEKEND PICKS
        </h2>
        <p className="text-glee-text-muted">
          Handpicked events near you.
        </p>
      </div>

      {/* Filter Chips */}
      <div ref={filtersRef} className="flex flex-wrap gap-3 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`filter-chip px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-neon-pink text-white shadow-neon'
                : 'border-2 border-neon-pink text-white hover:bg-neon-pink/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div ref={cardsRef} className="space-y-6">
        {filteredEvents.map((event) => (
          <div 
            key={event.id}
            className="event-card group flex gap-5 p-4 rounded-[18px] bg-glee-bg-secondary/50 border border-white/5 hover:border-neon-pink/30 transition-all duration-300 cursor-pointer"
            onClick={() => onGetTickets(event)}
          >
            {/* Thumbnail */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-[14px] overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 py-1">
              <h3 className="text-white font-display font-bold text-lg sm:text-xl mb-2 truncate group-hover:text-neon-pink transition-colors">
                {event.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-glee-text-muted mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neon-pink" />
                  {event.date} • {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-neon-pink" />
                  {event.location}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon-pink/10 text-neon-pink text-xs font-medium"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-white font-display font-bold text-neon-pink">
                  {event.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
