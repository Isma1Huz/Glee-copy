import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Pizza,
  Beef,
  Salad,
  Coffee,
  Wine,
  Beer,
  Fish,
  Soup,
  IceCream,
  Utensils,
  MapPin,
  Clock,
  Star,
} from 'lucide-react';
import { restaurants } from '@/data/restaurants';
import OrderCheckoutModal from '@/components/OrderCheckoutModal';

// ─── Shared types ────────────────────────────────────────────────────────────

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

interface MenuCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// ─── Crafty Chameleon data ────────────────────────────────────────────────────

const craftyMenuItems: MenuItem[] = [
  { id: 1, name: 'Pollo & Funghi Pizza', description: 'BBQ chicken, mushrooms, mozzarella on thin crust', price: 1500, category: 'pizzas', popular: true },
  { id: 2, name: 'Margherita Pizza', description: 'Fresh tomato sauce, mozzarella, basil', price: 1200, category: 'pizzas' },
  { id: 3, name: 'Pepperoni Pizza', description: 'Classic pepperoni, mozzarella, tomato sauce', price: 1400, category: 'pizzas' },
  { id: 4, name: 'Nyama Choma Pizza', description: 'Kenyan-style grilled meat, kachumbari, cheese', price: 1600, category: 'pizzas', popular: true },
  { id: 5, name: 'Chicken Burger', description: 'Grilled chicken breast, mango slaw, pineapple', price: 1400, category: 'burgers', popular: true },
  { id: 6, name: 'Beef Burger', description: 'Juicy beef patty, cheddar, caramelized onions', price: 1300, category: 'burgers' },
  { id: 7, name: 'Crafty Threesome', description: '3 mini burgers: chicken, beef & crispy mushroom', price: 1500, category: 'burgers', popular: true },
  { id: 8, name: 'Veggie Burger', description: 'Plant-based patty, avocado, vegan mayo', price: 1200, category: 'burgers' },
  { id: 9, name: 'Herbal Spring Chicken', description: 'Creamed spinach, mushroom sauce, mashed potatoes', price: 1800, category: 'mains', popular: true },
  { id: 10, name: 'Red Snapper Fillet', description: 'Fresh fish, seasonal vegetables, lemon butter', price: 1800, category: 'mains' },
  { id: 11, name: 'Char-Grilled BBQ Platter', description: 'Beef, chicken, mutton kebabs, mshikaki, naan', price: 1350, category: 'mains', popular: true },
  { id: 12, name: 'German Sausages', description: 'Grilled sausages, sauerkraut, mustard', price: 1100, category: 'mains' },
  { id: 13, name: 'Vegan Zucchini Bites', description: 'Stuffed with vegan ricotta, lightly fried', price: 800, category: 'tapas' },
  { id: 14, name: 'Crispy Calamari', description: 'Tender calamari, tartar sauce, lemon', price: 950, category: 'tapas' },
  { id: 15, name: 'Loaded Nachos', description: 'Tortilla chips, cheese, jalapeños, salsa', price: 750, category: 'tapas' },
  { id: 16, name: 'Chicken Wings', description: 'Brined 48hrs, double-baked, choice of sauce', price: 900, category: 'tapas', popular: true },
  { id: 17, name: 'Garden Salad', description: 'Mixed greens, cherry tomatoes, cucumber, vinaigrette', price: 650, category: 'salads' },
  { id: 18, name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, house Caesar dressing', price: 800, category: 'salads' },
  { id: 19, name: 'Grilled Chicken Salad', description: 'Chicken breast, avocado, mixed greens', price: 950, category: 'salads' },
  { id: 20, name: 'Churros', description: 'With salty beer chocolate sauce', price: 650, category: 'desserts' },
  { id: 21, name: 'Sticky Toffee Pudding', description: 'Warm pudding, toffee sauce, vanilla ice cream', price: 700, category: 'desserts', popular: true },
  { id: 22, name: 'Gelato Selection', description: '3 scoops of artisanal gelato', price: 550, category: 'desserts' },
  { id: 23, name: 'Crafty IPA', description: 'Fruity, hoppy, 6.5% ABV', price: 450, category: 'beers' },
  { id: 24, name: 'Crafty Wheat', description: 'Light, refreshing, 4.8% ABV', price: 400, category: 'beers' },
  { id: 25, name: 'Crafty Lager', description: 'Crisp, clean, 5.0% ABV', price: 400, category: 'beers' },
  { id: 26, name: 'Crafty Stout', description: 'Coffee, chocolate notes, 6.0% ABV', price: 450, category: 'beers', popular: true },
  { id: 27, name: 'Beer Tasting Board', description: '5 x 100ml samples of all beers', price: 800, category: 'beers', popular: true },
  { id: 28, name: 'Cold Brew Frappé', description: 'Whipped cream, caramel, biscuit bits', price: 600, category: 'drinks', popular: true },
  { id: 29, name: 'Organic Passion Soda', description: 'Homemade, naturally sweetened', price: 350, category: 'drinks' },
  { id: 30, name: 'Fresh Juice', description: 'Orange, mango, or passion', price: 400, category: 'drinks' },
];

const craftyCategories: MenuCategory[] = [
  { id: 'pizzas', name: 'Pizzas', icon: <Pizza className="w-4 h-4" /> },
  { id: 'burgers', name: 'Burgers', icon: <Beef className="w-4 h-4" /> },
  { id: 'mains', name: 'Mains', icon: <ChefHat className="w-4 h-4" /> },
  { id: 'tapas', name: 'Tapas', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'salads', name: 'Salads', icon: <Salad className="w-4 h-4" /> },
  { id: 'desserts', name: 'Desserts', icon: <Coffee className="w-4 h-4" /> },
  { id: 'beers', name: 'Beers', icon: <Beer className="w-4 h-4" /> },
  { id: 'drinks', name: 'Drinks', icon: <Wine className="w-4 h-4" /> },
];

// ─── Oyster Bay data ──────────────────────────────────────────────────────────

const oysterMenuItems: MenuItem[] = [
  { id: 1, name: 'Mushroom Chicken Soup', description: 'Tender chicken and mushrooms in a rich, savory broth', price: 1100, category: 'soups' },
  { id: 2, name: 'Prawns and Sweetcorn Soup', description: 'Fresh prawns and sweetcorn blended in a delicious soup', price: 1500, category: 'soups' },
  { id: 3, name: 'Turkey Chowder Soup', description: 'Hearty soup made with turkey and creamy broth', price: 1200, category: 'soups' },
  { id: 4, name: 'Pumpkin Peanut Butter Soup', description: 'Creamy soup blending pumpkin and peanut butter flavours', price: 1350, category: 'soups' },
  { id: 5, name: 'Oyster Bay Samosa', description: 'Beef samosa mixed with Mozzarella and Cheddar cheese with margarita sauce', price: 950, category: 'tapas', popular: true },
  { id: 6, name: 'Ratatouille Avocado Shell', description: 'Stir fried mixed capsicum, carrots, eggplants, zucchini and sweet corn stuffed in avocado', price: 950, category: 'tapas' },
  { id: 7, name: 'Calamari Milanese', description: 'Marinated calamari coated with bread crumbs with tartar sauce', price: 1500, category: 'tapas' },
  { id: 8, name: 'Oyster Bay Classic Nacho', description: 'Tortilla chips, guacamole, pico de gallo, black olives, jalapeño and cilantros', price: 1500, category: 'tapas' },
  { id: 9, name: 'Dynamite Prawn', description: 'Crispy fried prawns served with spicy dynamite sauce', price: 1500, category: 'tapas', popular: true },
  { id: 10, name: 'Oyster Bay Nacho', description: 'Tortilla chips with beef or chicken, guacamole, pico de gallo, jalapeno', price: 1750, category: 'tapas' },
  { id: 11, name: 'Fish Fingers', description: 'Oblong fish fingers coated in breadcrumbs with tartar sauce', price: 1300, category: 'tapas' },
  { id: 12, name: 'Jasmine Lasagna', description: 'Eggplant, Mozzarella cheese, parmesan cheese seasoned with salt and pepper', price: 980, category: 'tapas' },
  { id: 13, name: 'Mexican Roasted Sweet Corn', description: 'Grilled sweet corn with sriracha mayo and crumbled Feta', price: 950, category: 'tapas', popular: true },
  { id: 14, name: 'The Coopers Pork Spare Rib', description: 'Slow cooked pork ribs in a dash of sticky sauce', price: 1400, category: 'tapas' },
  { id: 15, name: 'Chicken and Cheese Ball', description: 'Minced chicken mixed with cheddar, Parmesan cheese, crumbled and deep fried', price: 1300, category: 'tapas' },
  { id: 16, name: 'Mango Habanero Chili Wing', description: 'Coated chicken wings tossed in spicy mango habanero sauce', price: 1450, category: 'tapas' },
  { id: 17, name: 'Oyster Bay Chicken Wing', description: 'Sautéed chicken wings tossed with tomato ketchup, cayenne, mustard and dark sauce', price: 1450, category: 'tapas' },
  { id: 18, name: 'Chicken Gyoza', description: 'Delicate dumplings filled with seasoned chicken', price: 1800, category: 'tapas' },
  { id: 19, name: 'Braised Lamb Ribs', description: 'Braised lamb ribs, slow-cooked until tender with rich, savoury flavour', price: 1550, category: 'tapas' },
  { id: 20, name: 'Eggs Benedict', description: 'Poached eggs, bacon and hollandaise sauce on english muffin with sautéed potatoes', price: 1200, category: 'brunches' },
  { id: 21, name: 'Eggs Florentine', description: 'Poached eggs on a bed of spinach, topped with hollandaise sauce', price: 1200, category: 'brunches' },
  { id: 22, name: 'Shakshuka', description: 'Poached eggs in Mediterranean sauce of peppers, paprika, nutmeg, cayenne and garlic tomatoes', price: 1200, category: 'brunches' },
  { id: 23, name: "Oyster's Vegan Brunch", description: 'Sauteed mushroom, spinach and fruit bowl', price: 1200, category: 'brunches' },
  { id: 24, name: 'Breakfast by the Bay', description: 'Scrambled, fried, boiled or poached eggs, sausages, spinach and mushrooms with toast', price: 1200, category: 'brunches' },
  { id: 25, name: 'Cheesy Egg Venezuela', description: 'Toasted garlic bread, scrambled eggs, Cheddar cheese, guacamole and tomato salsa', price: 1200, category: 'brunches' },
  { id: 26, name: 'Chicken Masala Pasta', description: 'Penne pasta and chicken toasted in creamy masala sauce topped with Parmesan', price: 2500, category: 'pastas' },
  { id: 27, name: 'Mac and Cheese Pasta', description: 'Macaroni pasta, chicken strips, creamy white sauce, cherry tomato and Parmesan', price: 1600, category: 'pastas', popular: true },
  { id: 28, name: 'Prosciutto Pasta', description: 'Ham sauce topped with Parmesan with choice of penne, spaghetti or tagliatelle', price: 1900, category: 'pastas' },
  { id: 29, name: "Oyster Bay's Trio Seafood", description: 'Ranchero sauce with prawn, red snapper and calamari with choice of pasta', price: 2950, category: 'pastas' },
  { id: 30, name: 'Prawns Tagliatelle', description: 'Queen prawns marinated in red sauce with tagliatelle', price: 2550, category: 'pastas' },
  { id: 31, name: 'Penne Arabiata', description: 'Penne pasta, garlic, chilli, basil and tomato sauce', price: 1500, category: 'pastas' },
  { id: 32, name: 'Penne Al Forno', description: 'Minced beef, Parmesan and Mozzarella', price: 1950, category: 'pastas' },
  { id: 33, name: 'Bacon Mushroom Carbonara', description: 'Bacon, fried mushroom, carbonara sauce, Parmesan cheese', price: 2200, category: 'pastas' },
  { id: 34, name: 'The New Orleans Burger', description: 'Marinated chicken breast, sweet mayo, honey Cheddar cheese, coleslaw and lettuce', price: 1900, category: 'burgers' },
  { id: 35, name: 'The Golden Spur', description: 'Sweet mayo seasoning chicken breast with lettuce and baby spinach', price: 1900, category: 'burgers', popular: true },
  { id: 36, name: 'Burger by the Bay', description: 'Cheddar cheese, beef patty, sweet potato puree, hot sauce, bacon and baby spinach', price: 2200, category: 'burgers' },
  { id: 37, name: 'The Chili Chicken Peanut Burger', description: 'Breadcrumbed chicken breast in sweet rich peanut sauce, topped with cheese', price: 2050, category: 'burgers' },
  { id: 38, name: 'Sea Breeze Burger', description: 'Coastal flavours combining seafood elements with classic burger', price: 2500, category: 'burgers' },
  { id: 39, name: 'Honey Mustard Sweet Corn Chicken Salad', description: 'Sweet corn, grilled chicken, roasted cashew nuts, boiled egg and lettuce', price: 1700, category: 'salads' },
  { id: 40, name: 'Mediterranean Poached Pears Salad', description: 'Poached pears, beetroots, apples, red onion, tomatoes and olives with Feta', price: 1700, category: 'salads' },
  { id: 41, name: 'Avocado Chicken Salad', description: 'Lettuce, peppers, onion, deep fried chicken breast, nuts, avocado in lemon dressing', price: 1850, category: 'salads' },
  { id: 42, name: 'Corn Salad', description: 'Refreshing mix featuring sweet corn and crisp vegetables', price: 1750, category: 'salads' },
  { id: 43, name: 'The Perch Puttanesca', description: 'Grilled perch fillet served with creamy mash potato and veggies', price: 2250, category: 'mains' },
  { id: 44, name: 'Roasted Crispy Chicken Leg', description: 'Marinated with 16 secret herbs and spices, served with fries', price: 2250, category: 'mains', popular: true },
  { id: 45, name: 'The Bays Red Snapper', description: 'Herbed marinated red snapper grilled with spanish paprika on mash potato', price: 2400, category: 'mains', popular: true },
  { id: 46, name: 'Beer Butter Fish and Chip', description: 'Marinated fish fillet dipped in beer butter sauce, served with chips and coleslaw', price: 2000, category: 'mains' },
  { id: 47, name: 'A.T.L Rack of Pork Rib', description: 'Tender juicy slow cooked rib rack in sticky honey BBQ sauce', price: 2400, category: 'mains', popular: true },
  { id: 48, name: 'Carne Asada Lasagne', description: 'Oven baked beef chili carne asada topped with cheese', price: 1900, category: 'mains' },
  { id: 49, name: 'Lobster Thermidor', description: 'Baked lobster flesh on shell with Mozzarella, mushroom, olives and white sauce', price: 4550, category: 'mains' },
  { id: 50, name: 'Bacon Pollo Ripieno', description: 'Chicken sous vide, sautéed mushroom and bacon wrap', price: 1950, category: 'mains' },
  { id: 51, name: "Oyster Bay's Chicken Parmigiano", description: 'Finest chicken breast coated, topped with Parmesan and Mozzarella cheese', price: 2500, category: 'mains' },
  { id: 52, name: 'Ratatouille Veggie Lasagna', description: 'Sauteed mixed veggies in tomato and white sauce with Parmesan and Mozzarella', price: 1650, category: 'mains' },
  { id: 53, name: 'Polo Chicken Porschen', description: 'Marinated grilled chicken breast in white mushroom sauce', price: 2200, category: 'mains' },
  { id: 54, name: 'Lamb Shank Confit', description: 'Marinated in cabernet sauvignon and slow cooked for 6 hours with bordelaise sauce', price: 2800, category: 'mains', popular: true },
  { id: 55, name: 'Oysters Mixed Verduras', description: 'Grilled eggplant, baby marrow, onions, tomatoes, carrot, olives basil and Parmesan', price: 1200, category: 'mains' },
  { id: 56, name: 'King Prawns', description: 'Marinated grilled prawns served with mixed veggies and puttanesca sauce', price: 3250, category: 'mains' },
  { id: 57, name: 'The Bay Seafood Platter', description: 'Selection of assorted seafood offering variety of tastes from the ocean', price: 7500, category: 'mains' },
  { id: 58, name: 'Jollof Rice Chicken', description: 'Rice cooked with tomato and spices, served with chicken pieces', price: 2100, category: 'mains' },
  { id: 59, name: 'Flamed Grilled Chilli Chicken', description: 'Chicken cooked with chilli for bold, smoky taste', price: 2450, category: 'mains' },
  { id: 60, name: 'Thai Breeze Salmon', description: 'Salmon with blend of Thai-inspired herbs and spices', price: 3400, category: 'mains' },
  { id: 61, name: "Oyster Bay's Fillet Mignon", description: 'Marinated grilled beef fillet mignon topped with gramaleta, served with mixed veggies', price: 2700, category: 'steaks' },
  { id: 62, name: 'The Texan Chilli Kachota', description: 'Beef loin topped with grilled tomatoes gratinated with Mozzarella, served with herbed rice', price: 2950, category: 'steaks' },
  { id: 63, name: "The Oyster's Pepper Steak", description: 'Grilled marinated beef tenderloin in creamy pepper sauce with mash and veggies', price: 2500, category: 'steaks', popular: true },
  { id: 64, name: 'Surf and Turf', description: 'Fillet mignon, king prawns topped with gramaleta, puttanesca sauce and mixed veggies', price: 3750, category: 'steaks' },
  { id: 65, name: 'Grilled Lamb Chops', description: 'Tender cuts of lamb seasoned and cooked to highlight natural taste', price: 2650, category: 'steaks' },
  { id: 66, name: 'Coconut Rice', description: 'Flavourful rice infused with coconut', price: 490, category: 'sides' },
  { id: 67, name: 'Mashed Potato', description: 'Smooth, creamy potatoes', price: 500, category: 'sides' },
  { id: 68, name: 'Greek Potato Wedges', description: 'Crispy potato wedges with Greek flair', price: 500, category: 'sides' },
  { id: 69, name: 'Cassava Fries', description: 'Crispy cassava strips', price: 450, category: 'sides' },
  { id: 70, name: 'Garden Salad', description: 'Fresh mix of greens', price: 430, category: 'sides' },
  { id: 71, name: 'Oysters Fries', description: 'Crispy fries topped with oysters', price: 450, category: 'sides' },
  { id: 72, name: 'Creamed Sauteed Spinach', description: 'Fresh spinach in rich and creamy sauce', price: 450, category: 'sides', popular: true },
  { id: 73, name: 'Salsa', description: 'Fresh and tangy condiment with ripe tomatoes', price: 300, category: 'sides' },
  { id: 74, name: 'Plantain', description: 'Ripe plantain served as side dish', price: 400, category: 'sides' },
  { id: 75, name: 'Mixed Veggies', description: 'Assorted vegetables', price: 450, category: 'sides' },
  { id: 76, name: 'Masala Fries', description: 'Spicy fries infused with aromatic Indian spices', price: 650, category: 'sides', popular: true },
  { id: 77, name: 'Sausages (2 pieces)', description: 'Juicy sausages', price: 300, category: 'sides' },
  { id: 78, name: 'Vanilla Blueberry Cake', description: 'Moist vanilla cake infused with sweet blueberry flavour', price: 900, category: 'desserts' },
  { id: 79, name: 'Banana Split', description: 'Classic dessert with split banana, ice cream and toppings', price: 750, category: 'desserts' },
  { id: 80, name: 'Chocolate Fudge with Icecream', description: 'Rich creamy chocolate fudge paired with scoops of ice cream', price: 1150, category: 'desserts' },
  { id: 81, name: 'Lemon Cake', description: 'Moist and tangy sweet treat', price: 900, category: 'desserts', popular: true },
  { id: 82, name: 'Assorted Icecream Scoop', description: 'Selection of creamy ice cream flavours', price: 750, category: 'desserts' },
  { id: 83, name: 'Caramel Banana Bliss', description: 'Smooth blend of caramel and banana', price: 1200, category: 'desserts' },
  { id: 84, name: 'Tahitian Twinset', description: 'Cherries, bubble gum, strawberry, pomegranate, vodka, bacardi with confetti', price: 850, category: 'drinks' },
  { id: 85, name: 'Passion Sour', description: 'Jack daniels, passion nectar, lime and egg white', price: 900, category: 'drinks' },
  { id: 86, name: 'Basil Twister', description: 'London dry gin, blue citrus liqueur, lime juice and soda', price: 850, category: 'drinks' },
  { id: 87, name: 'Black Panther', description: 'French citrus liqueur, scotch, passion juice and cherry', price: 950, category: 'drinks' },
  { id: 88, name: 'Ginger Navigator', description: 'Dry gin, orange, passion, mango, lime and ginger beer', price: 850, category: 'drinks' },
  { id: 89, name: 'Poseidon', description: 'Russian vodka, orange liqueur, homemade sour and club soda', price: 850, category: 'drinks' },
  { id: 90, name: 'Dance Monkey', description: 'London dry gin, mint liqueur, pineapple juice and sour', price: 850, category: 'drinks' },
  { id: 91, name: 'Long Island Iced Tea', description: '5 white spirits, sweet and sour syrup topped with cola', price: 1000, category: 'drinks', popular: true },
  { id: 92, name: 'House Coffee', description: 'Rich and smooth coffee blend', price: 180, category: 'coffees' },
  { id: 93, name: 'Macchiato', description: 'Rich intense coffee with shot of espresso', price: 180, category: 'coffees' },
  { id: 94, name: 'Cappuccino', description: 'Rich smooth coffee with velvety texture', price: 270, category: 'coffees' },
  { id: 95, name: 'Latte Macchiato (double)', description: 'Velvety steamed milk marked with double espresso', price: 300, category: 'coffees' },
  { id: 96, name: 'Cafe Latte (double)', description: 'Velvety espresso-style coffee with steamed milk', price: 350, category: 'coffees' },
  { id: 97, name: 'Flavoured Latte (double)', description: 'Velvety coffee with hint of flavour', price: 400, category: 'coffees' },
  { id: 98, name: 'Tea Mug', description: 'Hot brewed tea served in mug', price: 250, category: 'teas' },
  { id: 99, name: 'Dawa', description: 'Traditional Kenyan tea blend', price: 300, category: 'teas' },
  { id: 100, name: 'Masala Tea', description: 'Spiced black tea, Indian-inspired brew', price: 350, category: 'teas' },
  { id: 101, name: 'Herbal Tea', description: 'Soothing blend of herbs in warm brew', price: 350, category: 'teas' },
  { id: 102, name: 'Hot Chocolate', description: 'Rich and creamy beverage', price: 290, category: 'teas' },
  { id: 103, name: 'Cafe Mocha', description: 'Rich smooth coffee with mocha flavour', price: 350, category: 'teas' },
  { id: 104, name: 'Vanilla Shake', description: 'Smooth creamy milkshake with vanilla flavour', price: 480, category: 'shakes', popular: true },
  { id: 105, name: 'Strawberry Shake', description: 'Sweet refreshing blend of strawberries', price: 480, category: 'shakes' },
  { id: 106, name: 'Chocolate Shake', description: 'Rich creamy blend of chocolate', price: 480, category: 'shakes' },
  { id: 107, name: 'Espresso Shake', description: 'Rich creamy blend of espresso and milk', price: 490, category: 'shakes' },
  { id: 108, name: 'Oreo Shake', description: 'Rich creamy blend of Oreo cookies', price: 490, category: 'shakes' },
  { id: 109, name: 'Blueberry Banana Smoothie', description: 'Smooth blend of blueberries and banana', price: 490, category: 'shakes' },
  { id: 110, name: 'Sodas', description: 'Refreshing carbonated soft drinks', price: 200, category: 'softdrinks' },
  { id: 111, name: 'Fresh Juices', description: 'Refreshing selection of fresh juices', price: 400, category: 'softdrinks' },
  { id: 112, name: 'Red Bull', description: 'Energy drink', price: 350, category: 'softdrinks' },
  { id: 113, name: 'Still Water', description: 'Pure refreshing still water', price: 400, category: 'softdrinks' },
  { id: 114, name: 'Sparkling Water', description: 'Fresh bubbly water', price: 450, category: 'softdrinks' },
  { id: 115, name: 'Virgin Mojitos', description: 'Refreshing drink with mint and lime', price: 490, category: 'softdrinks' },
  { id: 116, name: 'Lychee Poppers', description: 'Sweet tangy lychee filling in crispy exterior', price: 490, category: 'softdrinks' },
];

const oysterCategories: MenuCategory[] = [
  { id: 'soups', name: 'Soups', icon: <Soup className="w-4 h-4" /> },
  { id: 'tapas', name: 'Tapas & Starters', icon: <Utensils className="w-4 h-4" /> },
  { id: 'brunches', name: 'Brunches', icon: <Coffee className="w-4 h-4" /> },
  { id: 'pastas', name: 'Pastas', icon: <Utensils className="w-4 h-4" /> },
  { id: 'burgers', name: 'Burgers', icon: <Beef className="w-4 h-4" /> },
  { id: 'salads', name: 'Salads', icon: <Salad className="w-4 h-4" /> },
  { id: 'mains', name: 'Mains', icon: <Fish className="w-4 h-4" /> },
  { id: 'steaks', name: 'Steaks', icon: <Beef className="w-4 h-4" /> },
  { id: 'sides', name: 'Sides', icon: <Utensils className="w-4 h-4" /> },
  { id: 'desserts', name: 'Desserts', icon: <IceCream className="w-4 h-4" /> },
  { id: 'drinks', name: 'Cocktails', icon: <Wine className="w-4 h-4" /> },
  { id: 'coffees', name: 'Coffees', icon: <Coffee className="w-4 h-4" /> },
  { id: 'teas', name: 'Teas', icon: <Coffee className="w-4 h-4" /> },
  { id: 'shakes', name: 'Shakes', icon: <IceCream className="w-4 h-4" /> },
  { id: 'softdrinks', name: 'Soft Drinks', icon: <Wine className="w-4 h-4" /> },
];

// ─── Main page component ──────────────────────────────────────────────────────

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const restaurant = restaurants.find((r) => r.id === id);

  // Determine which menu data to use
  const isOysterBay = id === 'oyster-bay';
  const menuItems = isOysterBay ? oysterMenuItems : craftyMenuItems;
  const categories = isOysterBay ? oysterCategories : craftyCategories;
  const defaultCategory = isOysterBay ? 'tapas' : 'pizzas';

  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-glee-bg flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl font-display">Restaurant not found.</p>
        <Link to="/restaurants" className="text-neon-pink hover:underline text-sm">
          ← Browse all restaurants
        </Link>
      </div>
    );
  }

  // Cart helpers
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1)
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: number) => cart.find((i) => i.id === itemId)?.quantity || 0;

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const serviceFee = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + serviceFee;

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCart([]);
    setActiveCategory(defaultCategory);
    setCheckoutOpen(false);
    navigate('/restaurants');
  };

  return (
    <div className="min-h-screen bg-glee-bg flex flex-col">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* ── Top header ── */}
      <header className="sticky top-0 z-50 bg-glee-bg/90 backdrop-blur-md border-b border-white/10 flex-shrink-0">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Left: back + restaurant info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-glee-text-muted" />
            </button>

            {restaurant.logo ? (
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Fish className="w-6 h-6 text-blue-400" />
              </div>
            )}

            <div>
              <h1 className="text-base md:text-lg font-display font-bold text-white leading-tight">
                {restaurant.name}
              </h1>
              <p className="text-glee-text-muted text-xs">{restaurant.location}</p>
            </div>
          </div>

          {/* Right: meta badges */}
          <div className="hidden md:flex items-center gap-3 text-sm text-glee-text-muted">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {restaurant.rating} ({restaurant.reviews})
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-neon-pink" />
              {restaurant.hours}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-neon-pink" />
              {restaurant.location}
            </span>
            {cartCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-pink/10 border border-neon-pink/30 ml-2">
                <ShoppingBag className="w-4 h-4 text-neon-pink" />
                <span className="text-white font-medium">{cartCount} items</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex overflow-x-auto border-t border-white/10 bg-glee-bg-secondary/30">
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
      </header>

      {/* ── Menu items ── */}
      <main className="flex-1 overflow-y-auto bg-glee-bg">
        <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-display font-bold text-xl">
              {categories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <span className="text-glee-text-muted text-sm">
              {menuItems.filter((i) => i.category === activeCategory).length} items
            </span>
          </div>

          <div className="space-y-3">
            {menuItems
              .filter((item) => item.category === activeCategory)
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
                          <h3 className="text-white font-medium">{item.name}</h3>
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
                            <span className="text-white font-medium w-6 text-center">{quantity}</span>
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
      </main>

      {/* ── Bottom checkout bar ── */}
      <div className="sticky bottom-0 z-40 border-t border-white/10 bg-glee-bg-secondary/90 backdrop-blur-sm flex-shrink-0">
        {cart.length === 0 ? (
          <div className="px-4 py-4 flex items-center justify-center text-glee-text-muted">
            <ShoppingBag className="w-5 h-5 mr-2 opacity-50" />
            <span className="text-sm">Add items to your cart</span>
          </div>
        ) : (
          <div className="px-4 md:px-8 py-4 max-w-4xl mx-auto">
            {/* Cart items preview */}
            <div className="mb-3 max-h-20 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-glee-bg border border-white/10"
                  >
                    <span className="text-white text-sm">
                      {item.quantity}x {item.name}
                    </span>
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

            {/* Totals + checkout button */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 md:gap-6">
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
                  <p className="text-neon-pink font-display font-bold text-xl">
                    KES {grandTotal.toLocaleString()}
                  </p>
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

      {/* ── Order checkout modal ── */}
      <OrderCheckoutModal
        isOpen={checkoutOpen}
        onClose={handleCheckoutClose}
        cart={cart}
        total={cartTotal}
        restaurantName={restaurant.name}
        restaurantLogo={restaurant.logo ?? ''}
      />
    </div>
  );
}
