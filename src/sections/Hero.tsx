import { useEffect, useRef, useLayoutEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onSearch?: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Hero({ onSearch, selectedCategory, onCategoryChange }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      // Background entrance
      tl.fromTo(bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );
      
      // Headline entrance (split by words)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
          '-=0.8'
        );
      }
      
      // Search bar entrance
      tl.fromTo(searchRef.current,
        { y: 18, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        '-=0.4'
      );
      
      // Chips entrance
      if (chipsRef.current) {
        const chips = chipsRef.current.querySelectorAll('.chip');
        tl.fromTo(chips,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, searchRef.current, chipsRef.current], {
              opacity: 1, y: 0, x: 0
            });
            gsap.set(bgRef.current, { opacity: 1, scale: 1 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      // Headline exits upward
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-22vh', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      // Search + chips exit downward
      scrollTl.fromTo([searchRef.current, chipsRef.current],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      // Background scales and fades
      scrollTl.fromTo(bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0.6, ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const categories = ['All', 'Clubs', 'Concerts', 'Festivals', 'Restaurants'];

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img 
          src="/hero_crowd.jpg" 
          alt="Concert crowd"
          className="w-full h-full object-cover"
        />
        <div className="gradient-overlay" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-[4vw] py-[4vh]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink to-orange-500 flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">G</span>
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-tight">GLEE</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-white font-medium hover:text-neon-pink transition-colors">
            Menu
          </button>
          <button className="pill-outline text-sm">
            Get App
          </button>
        </div>
      </header>

      {/* Location indicator */}
      <div className="absolute top-[12vh] left-[4vw] z-20 flex items-center gap-2 text-glee-text-muted">
        <MapPin className="w-4 h-4 text-neon-pink" />
        <span className="text-sm">Nairobi, Kenya</span>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-center text-white font-display font-black uppercase tracking-tight"
          style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
            lineHeight: 0.9,
            maxWidth: '92vw'
          }}
        >
          <span className="word inline-block">FIND</span>{' '}
          <span className="word inline-block">YOUR</span>{' '}
          <span className="word inline-block text-neon-pink" style={{ textShadow: '0 0 18px rgba(255, 45, 143, 0.35)' }}>VIBE</span>{' '}
          <span className="word inline-block">TONIGHT</span>
        </h1>

        {/* Search Bar */}
        <div 
          ref={searchRef}
          className="mt-10 w-full max-w-[860px] px-4"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-glee-text-muted" />
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              className="w-full py-4 pl-14 pr-12 rounded-[18px] bg-glee-bg/85 border-2 border-neon-pink text-white placeholder:text-glee-text-muted focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all"
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <button className="absolute right-4 p-2 hover:bg-white/5 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-glee-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Chips */}
        <div ref={chipsRef} className="mt-6 flex flex-wrap justify-center gap-3 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`chip px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-neon-pink text-white shadow-neon'
                  : 'border-2 border-neon-pink text-white hover:bg-neon-pink/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
