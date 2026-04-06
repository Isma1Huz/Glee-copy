import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MembershipProps {
  onJoin: () => void;
  onViewPerks: () => void;
}

export default function Membership({ onJoin, onViewPerks }: MembershipProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(badgeRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 85%',
          }
        }
      );

      // Circle animation with parallax
      gsap.fromTo(circleRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: circleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Parallax on circle
      gsap.fromTo(circleRef.current,
        { y: 20 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Headline + body
      gsap.fromTo([headlineRef.current, bodyRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          }
        }
      );

      // CTAs
      gsap.fromTo(ctaRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-50 bg-glee-bg-secondary py-[10vh] px-[6vw]">
      {/* Radial glow behind circle */}
      <div 
        className="absolute left-1/2 top-[15vh] -translate-x-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 45, 143, 0.15) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <p ref={badgeRef} className="mono-text text-neon-pink mb-8">
          MEMBERSHIP
        </p>

        {/* Circle Image */}
        <div 
          ref={circleRef}
          className="relative w-[34vw] h-[34vw] max-w-[420px] max-h-[420px] mb-10"
        >
          <div 
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              border: '3px solid #FF2D8F',
              boxShadow: '0 0 18px rgba(255, 45, 143, 0.35)'
            }}
          >
            <img 
              src="/membership_circle.jpg" 
              alt="Vinyl record"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="text-white font-display font-black uppercase tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', lineHeight: 1 }}
        >
          JOIN THE CIRCLE
        </h2>

        {/* Body */}
        <p ref={bodyRef} className="text-glee-text-muted text-lg mb-10 max-w-md">
          Early access. Exclusive drops. Lower fees.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={onJoin}
            className="neon-button-filled text-base"
          >
            Join Free
          </button>
          <button 
            onClick={onViewPerks}
            className="neon-button text-base"
          >
            View Perks
          </button>
        </div>
      </div>
    </section>
  );
}
