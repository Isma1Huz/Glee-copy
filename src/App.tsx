import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Sections
import Hero from './sections/Hero';
import ConcertExperience from './sections/ConcertExperience';
import TrendingClubs from './sections/TrendingClubs';
import RestaurantsList from './sections/RestaurantsList';
import FestivalSpotlight from './sections/FestivalSpotlight';
import WeekendPicks from './sections/WeekendPicks';
import Membership from './sections/Membership';
import Footer from './sections/Footer';

// Modals
import TicketModal from './components/TicketModal';
import TableBookingModal from './components/TableBookingModal';
import MenuModal from './components/MenuModal';
import RestaurantBookingModal from './components/RestaurantBookingModal';
import RestaurantMenuModal from './components/RestaurantMenuModal';
import OysterBayMenuModal from './components/OysterBayMenuModal';
import OrderCheckoutModal from './components/OrderCheckoutModal';

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

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [restaurantBookingOpen, setRestaurantBookingOpen] = useState(false);
  const [craftyMenuOpen, setCraftyMenuOpen] = useState(false);
  const [oysterBayMenuOpen, setOysterBayMenuOpen] = useState(false);
  const [orderCheckoutOpen, setOrderCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [activeRestaurant, setActiveRestaurant] = useState<'crafty' | 'oysterbay'>('crafty');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const mainRef = useRef<HTMLElement>(null);
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGetTickets = (event?: Event) => {
    if (event) {
      setSelectedEvent(event);
    }
    setTicketModalOpen(true);
  };

  const handleBookTable = () => {
    setTableModalOpen(true);
  };

  const handleExploreLineup = () => {
    setTicketModalOpen(true);
  };

  const handleJoinMembership = () => {
    alert('Welcome to Glee! Membership signup coming soon.');
  };

  const handleViewPerks = () => {
    alert('Membership perks: Early access, exclusive drops, lower fees, and more!');
  };

  // Restaurant handlers
  const handleRestaurantViewMenu = (restaurantId: string) => {
    if (restaurantId === 'oyster-bay') {
      setActiveRestaurant('oysterbay');
      setOysterBayMenuOpen(true);
    } else {
      setActiveRestaurant('crafty');
      setCraftyMenuOpen(true);
    }
  };

  const handleRestaurantBookTable = (restaurantId: string) => {
    if (restaurantId === 'oyster-bay') {
      setActiveRestaurant('oysterbay');
    } else {
      setActiveRestaurant('crafty');
    }
    setRestaurantBookingOpen(true);
  };

  const handleMenuCheckout = (cartItems: CartItem[], total: number) => {
    setCart(cartItems);
    setCartTotal(total);
    setCraftyMenuOpen(false);
    setOysterBayMenuOpen(false);
    setOrderCheckoutOpen(true);
  };

  const getRestaurantName = () => {
    return activeRestaurant === 'oysterbay' ? 'Oyster Bay' : 'Crafty Chameleon Brewery';
  };

  const getRestaurantLogo = () => {
    return activeRestaurant === 'oysterbay' ? '' : '/crafty_chameleon_logo.png';
  };

  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Section 1: Hero - z-10 */}
        <Hero 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Section 2: Concert Experience - z-20 */}
        <ConcertExperience onGetTickets={() => handleGetTickets()} />

        {/* Section 3: Trending Clubs - z-30 */}
        <TrendingClubs onBookTable={handleBookTable} />

        {/* Section 4: Restaurants List - z-35 */}
        <RestaurantsList 
          onViewMenu={handleRestaurantViewMenu}
          onBookTable={handleRestaurantBookTable}
        />

        {/* Section 5: Festival Spotlight - z-40 */}
        <FestivalSpotlight onExploreLineup={handleExploreLineup} />

        {/* Section 6: Weekend Picks - z-50 (flowing) */}
        <WeekendPicks 
          selectedCategory={selectedCategory}
          onGetTickets={handleGetTickets}
        />

        {/* Section 7: Membership - z-50 (flowing) */}
        <Membership 
          onJoin={handleJoinMembership}
          onViewPerks={handleViewPerks}
        />

        {/* Section 8: Footer - z-50 (flowing) */}
        <Footer />
      </main>

      {/* Modals */}
      <TicketModal 
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        eventTitle={selectedEvent?.title || 'Concert Experience'}
        eventDate={selectedEvent?.date || 'Mar 14 • 8PM'}
        eventLocation={selectedEvent?.location || 'Stadium'}
      />

      <TableBookingModal 
        isOpen={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
        clubName="Trending Club"
      />

      <MenuModal 
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        venueName="Trending Club"
      />

      <RestaurantBookingModal 
        isOpen={restaurantBookingOpen}
        onClose={() => setRestaurantBookingOpen(false)}
        restaurantName={getRestaurantName()}
        restaurantLogo={getRestaurantLogo()}
      />

      <RestaurantMenuModal 
        isOpen={craftyMenuOpen}
        onClose={() => setCraftyMenuOpen(false)}
        restaurantName="Crafty Chameleon Brewery"
        restaurantLogo="/crafty_chameleon_logo.png"
        onCheckout={handleMenuCheckout}
      />

      <OysterBayMenuModal 
        isOpen={oysterBayMenuOpen}
        onClose={() => setOysterBayMenuOpen(false)}
        onCheckout={handleMenuCheckout}
      />

      <OrderCheckoutModal 
        isOpen={orderCheckoutOpen}
        onClose={() => setOrderCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        restaurantName={getRestaurantName()}
        restaurantLogo={getRestaurantLogo()}
      />
    </>
  );
}

export default App;
