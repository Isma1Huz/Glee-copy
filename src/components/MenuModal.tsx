import { useState } from 'react';
import { X, Wine, Beer, Coffee, GlassWater } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueName?: string;
}

const menuData: MenuCategory[] = [
  {
    id: 'champagne',
    name: 'Champagne',
    icon: <GlassWater className="w-4 h-4" />,
    items: [
      { id: 1, name: 'Moët & Chandon Imperial', description: 'Brut, 750ml', price: 120 },
      { id: 2, name: 'Veuve Clicquot Yellow Label', description: 'Brut, 750ml', price: 140 },
      { id: 3, name: 'Dom Pérignon Vintage', description: 'Brut, 750ml', price: 350 },
      { id: 4, name: 'Armand de Brignac Gold', description: 'Brut, 750ml', price: 450 },
    ]
  },
  {
    id: 'vodka',
    name: 'Vodka',
    icon: <Wine className="w-4 h-4" />,
    items: [
      { id: 5, name: 'Grey Goose', description: 'Premium, 1L', price: 180 },
      { id: 6, name: 'Belvedere', description: 'Polish rye, 1L', price: 190 },
      { id: 7, name: 'Cîroc', description: 'Grape-based, 1L', price: 170 },
      { id: 8, name: 'Absolut Elyx',description: 'Single estate, 1L', price: 220 },
    ]
  },
  {
    id: 'whiskey',
    name: 'Whiskey',
    icon: <Beer className="w-4 h-4" />,
    items: [
      { id: 9, name: 'Johnnie Walker Blue Label', description: 'Blended scotch, 750ml', price: 280 },
      { id: 10, name: 'Macallan 18', description: 'Single malt, 750ml', price: 350 },
      { id: 11, name: 'Jack Daniel\'s Single Barrel', description: 'Tennessee whiskey, 750ml', price: 120 },
      { id: 12, name: 'Hibiki Harmony', description: 'Japanese whisky, 750ml', price: 180 },
    ]
  },
  {
    id: 'cocktails',
    name: 'Cocktails',
    icon: <Coffee className="w-4 h-4" />,
    items: [
      { id: 13, name: 'Neon Margarita', description: 'Tequila, lime, neon syrup', price: 18 },
      { id: 14, name: 'Electric Mule', description: 'Vodka, ginger beer, lime', price: 16 },
      { id: 15, name: 'Midnight Martini', description: 'Espresso vodka, coffee liqueur', price: 20 },
      { id: 16, name: 'Glow Punch', description: 'Rum, tropical fruits, glow stick', price: 22 },
    ]
  }
];

export default function MenuModal({ 
  isOpen, 
  onClose, 
  venueName = 'Selected Venue'
}: MenuModalProps) {
  const [activeTab, setActiveTab] = useState('champagne');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-glee-bg border border-white/10 p-0 overflow-hidden max-h-[90vh]">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-display font-bold text-white mb-1">
                  Menu
                </DialogTitle>
                <p className="text-glee-text-muted text-sm">{venueName}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-glee-text-muted" />
              </button>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-glee-bg-secondary/50 mb-6">
              {menuData.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-neon-pink data-[state=active]:text-white text-glee-text-muted"
                >
                  {category.icon}
                  <span className="hidden sm:inline text-xs">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {menuData.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                  {category.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-glee-bg-secondary/30 border border-white/5 hover:border-neon-pink/30 transition-colors"
                    >
                      <div>
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-glee-text-muted text-sm">{item.description}</p>
                      </div>
                      <span className="text-neon-pink font-display font-bold">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Note */}
          <div className="mt-6 p-4 rounded-xl bg-neon-pink/5 border border-neon-pink/20">
            <p className="text-glee-text-muted text-sm text-center">
              All bottles include mixers and standard garnishes. 
              <br />
              Premium mixers available at additional cost.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
