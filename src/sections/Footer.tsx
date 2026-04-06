import { useRef, useLayoutEffect, useState } from 'react';
import { Instagram, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Newsletter animation
      gsap.fromTo(newsletterRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 85%',
          }
        }
      );

      // Links animation
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('a');
        gsap.fromTo(links,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 90%',
            }
          }
        );
      }

      // Bottom row animation
      gsap.fromTo(bottomRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const footerLinks = ['About', 'Support', 'Terms', 'Privacy', 'Partners', 'Careers'];

  return (
    <footer ref={sectionRef} className="relative z-50 bg-glee-bg py-[8vh] px-[6vw]">
      {/* Newsletter */}
      <div ref={newsletterRef} className="max-w-[720px] mx-auto text-center mb-16">
        <h3 
          className="text-white font-display font-black uppercase tracking-tight mb-3"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', lineHeight: 1 }}
        >
          STAY IN THE LOOP
        </h3>
        <p className="text-glee-text-muted mb-6">
          One email a week. No spam. Unsubscribe anytime.
        </p>
        
        {subscribed ? (
          <div className="py-4 px-6 rounded-[18px] bg-neon-pink/10 border border-neon-pink/30">
            <p className="text-neon-pink font-medium">Thanks for subscribing! 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 py-3 px-5 rounded-full bg-glee-bg-secondary border-2 border-white/10 text-white placeholder:text-glee-text-muted focus:outline-none focus:border-neon-pink/50 transition-colors"
              required
            />
            <button 
              type="submit"
              className="neon-button-filled whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* Footer Links */}
      <div 
        ref={linksRef}
        className="flex flex-wrap justify-center gap-6 mb-10"
      >
        {footerLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-glee-text-muted hover:text-white transition-colors text-sm"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Bottom Row */}
      <div 
        ref={bottomRef}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-orange-500 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">G</span>
          </div>
          <span className="text-lg font-display font-bold text-white tracking-tight">GLEE</span>
        </div>

        {/* Copyright */}
        <p className="text-glee-text-muted text-sm">
          © Glee
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-glee-text-muted hover:text-neon-pink transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="text-glee-text-muted hover:text-neon-pink transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="text-glee-text-muted hover:text-neon-pink transition-colors text-sm font-medium"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
