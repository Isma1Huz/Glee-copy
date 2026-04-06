import { useState } from 'react';
import { X, Check, Star, Crown, Gem } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
}

const ticketTiers: TicketTier[] = [
  {
    id: 'regular',
    name: 'Regular',
    price: 25,
    description: 'Standard entry access',
    features: [
      'General admission',
      'Access to main floor',
      'Standard bar access',
      'Digital ticket'
    ],
    icon: <Star className="w-5 h-5" />,
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 75,
    description: 'Enhanced experience',
    features: [
      'Priority entry',
      'VIP lounge access',
      'Dedicated bar',
      'Complimentary welcome drink',
      'Digital ticket + QR pass'
    ],
    icon: <Crown className="w-5 h-5" />,
    color: 'from-neon-pink to-pink-600'
  },
  {
    id: 'vvip',
    name: 'VVIP',
    price: 200,
    description: 'Ultimate luxury',
    features: [
      'Express entry',
      'Exclusive VVIP section',
      'Private bottle service',
      'Personal host',
      'Complimentary drinks all night',
      'Premium digital pass',
      'After-party access'
    ],
    icon: <Gem className="w-5 h-5" />,
    color: 'from-amber-400 to-orange-500'
  }
];

export default function TicketModal({ 
  isOpen, 
  onClose, 
  eventTitle = 'Selected Event',
  eventDate = 'Mar 14 • 8PM',
  eventLocation = 'Stadium'
}: TicketModalProps) {
  const [selectedTier, setSelectedTier] = useState<string>('vip');
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<'select' | 'checkout' | 'success'>('select');

  const selectedTierData = ticketTiers.find(t => t.id === selectedTier);
  const totalPrice = (selectedTierData?.price || 0) * quantity;

  const handleCheckout = () => {
    setStep('checkout');
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('select');
    setQuantity(1);
    setSelectedTier('vip');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-glee-bg border border-white/10 p-0 overflow-hidden">
        {step === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-pink/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-neon-pink" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Tickets Confirmed!
            </h3>
            <p className="text-glee-text-muted mb-6">
              Your tickets have been sent to your email.
            </p>
            <button 
              onClick={handleClose}
              className="neon-button-filled"
            >
              Done
            </button>
          </div>
        ) : step === 'checkout' ? (
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-display font-bold text-white">
                Checkout
              </DialogTitle>
            </DialogHeader>

            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-medium">{eventTitle}</h4>
                  <p className="text-glee-text-muted text-sm">{eventDate} • {eventLocation}</p>
                </div>
                <span className="text-neon-pink font-display font-bold">
                  ${totalPrice}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-glee-text-muted">
                  {selectedTierData?.name} × {quantity}
                </span>
                <span className="text-white">${selectedTierData?.price} each</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Full Name</label>
                <input 
                  type="text"
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Phone</label>
                <input 
                  type="tel"
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep('select')}
                className="flex-1 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 neon-button-filled"
              >
                Pay ${totalPrice}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl font-display font-bold text-white mb-1">
                    {eventTitle}
                  </DialogTitle>
                  <p className="text-glee-text-muted text-sm">{eventDate} • {eventLocation}</p>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-glee-text-muted" />
                </button>
              </div>
            </DialogHeader>

            <p className="text-glee-text-muted text-sm mb-4">Select your ticket tier:</p>

            <div className="space-y-3 mb-6">
              {ticketTiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTier === tier.id
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-white/10 bg-glee-bg-secondary/50 hover:border-white/20'
                  }`}
                >
                  {selectedTier === tier.id && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                      {tier.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-display font-bold">{tier.name}</h4>
                        <span className="text-neon-pink font-display font-bold">${tier.price}</span>
                      </div>
                      <p className="text-glee-text-muted text-sm mb-2">{tier.description}</p>
                      <ul className="space-y-1">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-glee-text-muted">
                            <Check className="w-3 h-3 text-neon-pink" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-glee-text-muted">Quantity</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-white font-medium w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-8 h-8 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total + CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-glee-text-muted text-sm">Total</span>
                <p className="text-2xl font-display font-bold text-white">${totalPrice}</p>
              </div>
              <button 
                onClick={handleCheckout}
                className="neon-button-filled px-8"
              >
                Get Tickets
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
