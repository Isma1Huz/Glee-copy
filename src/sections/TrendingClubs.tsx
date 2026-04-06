import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TrendingClubsProps {
  onBookTable: () => void;
}

export default function TrendingClubs({ onBookTable }: TrendingClubsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      // Left frame from left
      scrollTl.fromTo(frameRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power3.out' },
        0
      );
      
      // Image inside frame
      scrollTl.fromTo(imageRef.current,
        { scale: 1.10, opacity: 0 },
        { scale: 1.00, opacity: 1, ease: 'power2.out' },
        0.10
      );
      
      // Right title from right
      scrollTl.fromTo(titleRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out' },
        0.06
      );
      
      // Meta + CTA from right
      scrollTl.fromTo(metaRef.current,
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.14
      );
      
      // Caption
      scrollTl.fromTo(captionRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(titleRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(frameRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(imageRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0.5, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo([metaRef.current, captionRef.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: '4vh', ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-30 bg-glee-bg">
      {/* Vignette overlay */}
      <div className="vignette" />
      
      {/* Left Neon Frame */}
      <div 
        ref={frameRef}
        className="absolute left-[6vw] top-[16vh] overflow-hidden"
        style={{ 
          width: '38vw', 
          height: '68vh',
          border: '3px solid #FF2D8F',
          borderRadius: '26px',
          boxShadow: '0 0 18px rgba(255, 45, 143, 0.35)'
        }}
      >
        <img 
          ref={imageRef}
          src="/club_frame.jpg" 
          alt="Club interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Typography Block */}
      <div 
        ref={titleRef}
        className="absolute left-[52vw] top-[18vh] z-10"
        style={{ width: '42vw' }}
      >
        <h2 
          className="text-white font-display font-black uppercase tracking-tight"
          style={{ 
            fontSize: 'clamp(3rem, 12vw, 9rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em'
          }}
        >
          TRENDING
        </h2>
        <h2 
          className="text-white font-display font-black uppercase tracking-tight mt-2"
          style={{ 
            fontSize: 'clamp(3rem, 12vw, 9rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em'
          }}
        >
          CLUBS
        </h2>
      </div>

      {/* Meta + CTA */}
      <div ref={metaRef} className="absolute left-[52vw] top-[52vh] z-10">
        <p className="mono-text text-glee-text-muted mb-6">
          TABLES • GUESTLIST • DJS
        </p>
        <button 
          onClick={onBookTable}
          className="neon-button-filled text-base"
        >
          Book a Table
        </button>
      </div>

      {/* Caption */}
      <p 
        ref={captionRef}
        className="absolute left-[52vw] top-[70vh] text-glee-text-muted text-sm"
      >
        Curated nightlife. Zero hassle.
      </p>
    </section>
  );
}
