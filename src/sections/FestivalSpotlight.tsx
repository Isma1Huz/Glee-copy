import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FestivalSpotlightProps {
  onExploreLineup: () => void;
}

export default function FestivalSpotlight({ onExploreLineup }: FestivalSpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      // Background image
      scrollTl.fromTo(bgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.00, opacity: 1, ease: 'power2.out' },
        0
      );
      
      // Neon frame scales in
      scrollTl.fromTo(frameRef.current,
        { scale: 0.86, opacity: 0 },
        { scale: 1.00, opacity: 1, ease: 'power3.out' },
        0.06
      );
      
      // Top-left label
      scrollTl.fromTo(labelRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.10
      );
      
      // Bottom headline from bottom
      scrollTl.fromTo(headlineRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out' },
        0.12
      );
      
      // CTA + microcopy from right
      scrollTl.fromTo(ctaRef.current,
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.16
      );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-30vh', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(frameRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.5, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-40">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/festival_bg.jpg" 
          alt="Festival crowd"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-glee-bg/40" />
      </div>

      {/* Neon Frame (centered) */}
      <div 
        ref={frameRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          width: '86vw', 
          height: '78vh',
          border: '3px solid #FF2D8F',
          borderRadius: '26px',
          boxShadow: '0 0 18px rgba(255, 45, 143, 0.35)'
        }}
      />

      {/* Top-left Label */}
      <p 
        ref={labelRef}
        className="absolute left-[9vw] top-[14vh] mono-text text-white z-10"
      >
        FESTIVAL
      </p>

      {/* Bottom-left Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[9vw] bottom-[14vh] z-10"
      >
        <h2 
          className="text-white font-display font-black uppercase tracking-tight"
          style={{ 
            fontSize: 'clamp(3rem, 12vw, 9rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em'
          }}
        >
          SUMMER
        </h2>
        <h2 
          className="text-white font-display font-black uppercase tracking-tight mt-2"
          style={{ 
            fontSize: 'clamp(3rem, 12vw, 9rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em'
          }}
        >
          SOUND
        </h2>
      </div>

      {/* Bottom-right CTA */}
      <div 
        ref={ctaRef}
        className="absolute right-[9vw] bottom-[14vh] z-10 text-right"
      >
        <button 
          onClick={onExploreLineup}
          className="neon-button-filled text-base mb-3"
        >
          Explore Lineup
        </button>
        <p className="text-glee-text-muted text-sm">
          Passes sell out fast.
        </p>
      </div>
    </section>
  );
}
