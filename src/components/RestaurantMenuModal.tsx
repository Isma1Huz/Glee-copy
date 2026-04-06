import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ChefHat, Pizza, Beef, Salad, Coffee, Wine, Beer, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  popular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface RestaurantMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
  restaurantLogo?: string;
  onCheckout: (cart: CartItem[], total: number) => void;
}

// Crafty Chameleon Menu based on research
const menuItems: MenuItem[] = [
  // Pizzas
  { id: 1, name: 'Pollo & Funghi Pizza', description: 'BBQ chicken, mushrooms, mozzarella on thin crust', price: 1500, category: 'pizzas', popular: true },
  { id: 2, name: 'Margherita Pizza', description: 'Fresh tomato sauce, mozzarella, basil', price: 1200, category: 'pizzas' },
  { id: 3, name: 'Pepperoni Pizza', description: 'Classic pepperoni, mozzarella, tomato sauce', price: 1400, category: 'pizzas' },
  { id: 4, name: 'Nyama Choma Pizza', description: 'Kenyan-style grilled meat, kachumbari, cheese', price: 1600, category: 'pizzas', popular: true },
  
  // Burgers
  { id: 5, name: 'Chicken Burger', description: 'Grilled chicken breast, mango slaw, pineapple', price: 1400, category: 'burgers', popular: true },
  { id: 6, name: 'Beef Burger', description: 'Juicy beef patty, cheddar, caramelized onions', price: 1300, category: 'burgers' },
  { id: 7, name: 'Crafty Threesome', description: '3 mini burgers: chicken, beef & crispy mushroom', price: 1500, category: 'burgers', popular: true },
  { id: 8, name: 'Veggie Burger', description: 'Plant-based patty, avocado, vegan mayo', price: 1200, category: 'burgers' },
  
  // Main Courses
  { id: 9, name: 'Herbal Spring Chicken', description: 'Creamed spinach, mushroom sauce, mashed potatoes', price: 1800, category: 'mains', popular: true },
  { id: 10, name: 'Red Snapper Fillet', description: 'Fresh fish, seasonal vegetables, lemon butter', price: 1800, category: 'mains' },
  { id: 11, name: 'Char-Grilled BBQ Platter', description: 'Beef, chicken, mutton kebabs, mshikaki, naan', price: 1350, category: 'mains', popular: true },
  { id: 12, name: 'German Sausages', description: 'Grilled sausages, sauerkraut, mustard', price: 1100, category: 'mains' },
  
  // Tapas & Starters
  { id: 13, name: 'Vegan Zucchini Bites', description: 'Stuffed with vegan ricotta, lightly fried', price: 800, category: 'tapas' },
  { id: 14, name: 'Crispy Calamari', description: 'Tender calamari, tartar sauce, lemon', price: 950, category: 'tapas' },
  { id: 15, name: 'Loaded Nachos', description: 'Tortilla chips, cheese, jalapeños, salsa', price: 750, category: 'tapas' },
  { id: 16, name: 'Chicken Wings', description: 'Brined 48hrs, double-baked, choice of sauce', price: 900, category: 'tapas', popular: true },
  
  // Salads
  { id: 17, name: 'Garden Salad', description: 'Mixed greens, cherry tomatoes, cucumber, vinaigrette', price: 650, category: 'salads' },
  { id: 18, name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, house Caesar dressing', price: 800, category: 'salads' },
  { id: 19, name: 'Grilled Chicken Salad', description: 'Chicken breast, avocado, mixed greens', price: 950, category: 'salads' },
  
  // Desserts
  { id: 20, name: 'Churros', description: 'With salty beer chocolate sauce', price: 650, category: 'desserts' },
  { id: 21, name: 'Sticky Toffee Pudding', description: 'Warm pudding, toffee sauce, vanilla ice cream', price: 700, category: 'desserts', popular: true },
  { id: 22, name: 'Gelato Selection', description: '3 scoops of artisanal gelato', price: 550, category: 'desserts' },
  
  // Craft Beers
  { id: 23, name: 'Crafty IPA', description: 'Fruity, hoppy, 6.5% ABV', price: 450, category: 'beers' },
  { id: 24, name: 'Crafty Wheat', description: 'Light, refreshing, 4.8% ABV', price: 400, category: 'beers' },
  { id: 25, name: 'Crafty Lager', description: 'Crisp, clean, 5.0% ABV', price: 400, category: 'beers' },
  { id: 26, name: 'Crafty Stout', description: 'Coffee, chocolate notes, 6.0% ABV', price: 450, category: 'beers', popular: true },
  { id: 27, name: 'Beer Tasting Board', description: '5 x 100ml samples of all beers', price: 800, category: 'beers', popular: true },
  
  // Drinks
  { id: 28, name: 'Cold Brew Frappé', description: 'Whipped cream, caramel, biscuit bits', price: 600, category: 'drinks', popular: true },
  { id: 29, name: 'Organic Passion Soda', description: 'Homemade, naturally sweetened', price: 350, category: 'drinks' },
  { id: 30, name: 'Fresh Juice', description: 'Orange, mango, or passion', price: 400, category: 'drinks' },
];

const categories = [
  { id: 'pizzas', name: 'Pizzas', icon: <Pizza className="w-4 h-4" /> },
  { id: 'burgers', name: 'Burgers', icon: <Beef className="w-4 h-4" /> },
  { id: 'mains', name: 'Mains', icon: <ChefHat className="w-4 h-4" /> },
  { id: 'tapas', name: 'Tapas', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'salads', name: 'Salads', icon: <Salad className="w-4 h-4" /> },
  { id: 'desserts', name: 'Desserts', icon: <Coffee className="w-4 h-4" /> },
  { id: 'beers', name: 'Beers', icon: <Beer className="w-4 h-4" /> },
  { id: 'drinks', name: 'Drinks', icon: <Wine className="w-4 h-4" /> },
];

export default function RestaurantMenuModal({ 
  isOpen, 
  onClose, 
  restaurantName = 'Crafty Chameleon Brewery',
  restaurantLogo = '/crafty_chameleon_logo.png',
  onCheckout
}: RestaurantMenuModalProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('pizzas');

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const serviceFee = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + serviceFee;

  const handleCheckout = () => {
    onCheckout(cart, cartTotal);
    handleClose();
  };

  const handleClose = () => {
    setCart([]);
    setActiveCategory('pizzas');
    onClose();
  };

  const getItemQuantity = (itemId: number) => {
    return cart.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl bg-glee-bg border border-white/10 p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-glee-bg flex-shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={restaurantLogo} 
              alt={restaurantName}
              className="h-10 w-10 object-contain"
            />
            <div>
              <h3 className="text-lg font-display font-bold text-white">{restaurantName}</h3>
              <p className="text-glee-text-muted text-xs">159 James Gichuru Road, Lavington</p>
            </div>
          </div>
          
          {/* Cart Summary in Header */}
          {cartCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-pink/10 border border-neon-pink/30">
                <ShoppingBag className="w-4 h-4 text-neon-pink" />
                <span className="text-white text-sm font-medium">{cartCount} items</span>
              </div>
            </div>
          )}
          
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-glee-text-muted" />
          </button>
        </div>

        {/* Category Tabs - Horizontal */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-glee-bg-secondary/30 flex-shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all border-b-2 ${
                activeCategory === cat.id
                  ? 'border-neon-pink text-white bg-neon-pink/5'
                  : 'border-transparent text-glee-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.icon}
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto bg-glee-bg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-display font-bold text-lg">
                {categories.find(c => c.id === activeCategory)?.name}
              </h4>
              <span className="text-glee-text-muted text-sm">
                {menuItems.filter(i => i.category === activeCategory).length} items
              </span>
            </div>

            <div className="space-y-3">
              {menuItems
                .filter(item => item.category === activeCategory)
                .map((item) => {
                  const quantity = getItemQuantity(item.id);
                  return (
                    <div 
                      key={item.id}
                      className="p-4 rounded-xl bg-glee-bg-secondary/50 border border-white/5 hover:border-neon-pink/30 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-medium">{item.name}</h4>
                            {item.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-neon-pink/20 text-neon-pink text-xs">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-glee-text-muted text-sm">{item.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-neon-pink font-display font-bold block mb-2">
                            KES {item.price.toLocaleString()}
                          </span>
                          
                          {quantity > 0 ? (
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-neon-pink/20 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-white font-medium w-6 text-center">
                                {quantity}
                              </span>
                              <button 
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 rounded-lg bg-neon-pink text-white hover:bg-neon-pink/80 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addToCart(item)}
                              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-neon-pink/10 text-neon-pink hover:bg-neon-pink hover:text-white transition-all text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom Checkout Bar - Always Visible */}
        <div className="border-t border-white/10 bg-glee-bg-secondary/80 backdrop-blur-sm flex-shrink-0">
          {cart.length === 0 ? (
            <div className="p-4 flex items-center justify-center text-glee-text-muted">
              <ShoppingBag className="w-5 h-5 mr-2 opacity-50" />
              <span className="text-sm">Add items to your cart</span>
            </div>
          ) : (
            <div className="p-4">
              {/* Cart Items Preview */}
              <div className="mb-4 max-h-24 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-glee-bg border border-white/10">
                      <span className="text-white text-sm">{item.quantity}x {item.name}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-5 h-5 rounded-full bg-white/10 hover:bg-neon-pink/50 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Checkout */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-glee-text-muted text-xs">Subtotal</p>
                    <p className="text-white font-medium">KES {cartTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-glee-text-muted text-xs">Service Fee</p>
                    <p className="text-white font-medium">KES {serviceFee.toLocaleString()}</p>
                  </div>
                  <div className="pl-4 border-l border-white/20">
                    <p className="text-glee-text-muted text-xs">Total</p>
                    <p className="text-neon-pink font-display font-bold text-xl">KES {grandTotal.toLocaleString()}</p>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="neon-button-filled py-3 px-8 flex items-center gap-2"
                >
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
