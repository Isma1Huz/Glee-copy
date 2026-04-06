import { useState } from 'react';
import { X, Check, Users, Utensils } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TablePackage {
  id: string;
  name: string;
  price: number;
  minGuests: number;
  maxGuests: number;
  description: string;
  includes: string[];
}

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubName?: string;
}

const tablePackages: TablePackage[] = [
  {
    id: 'standard',
    name: 'Standard Table',
    price: 300,
    minGuests: 4,
    maxGuests: 6,
    description: 'Perfect for small groups',
    includes: [
      'Reserved table for 4-6 guests',
      '1 premium bottle',
      'Mixers included',
      'Dedicated server'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Booth',
    price: 600,
    minGuests: 6,
    maxGuests: 10,
    description: 'VIP booth with best views',
    includes: [
      'Premium booth for 6-10 guests',
      '2 premium bottles',
      'Champagne service',
      'Priority entry',
      'Personal host'
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury Suite',
    price: 1500,
    minGuests: 10,
    maxGuests: 20,
    description: 'Ultimate VIP experience',
    includes: [
      'Private suite for 10-20 guests',
      '5 premium bottles',
      'Dom Perignon champagne',
      'Express entry',
      'Private security',
      'After-hours access'
    ]
  }
];

export default function TableBookingModal({ 
  isOpen, 
  onClose, 
  clubName = 'Selected Club'
}: TableBookingModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('premium');
  const [guests, setGuests] = useState(6);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [step, setStep] = useState<'select' | 'details' | 'success'>('select');

  const selectedPkgData = tablePackages.find(p => p.id === selectedPackage);

  const handleContinue = () => {
    setStep('details');
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('select');
    setGuests(6);
    setDate('');
    setTime('');
    setSelectedPackage('premium');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-glee-bg border border-white/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {step === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-pink/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-neon-pink" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Table Reserved!
            </h3>
            <p className="text-glee-text-muted mb-6">
              Confirmation sent to your email. See you tonight!
            </p>
            <button 
              onClick={handleClose}
              className="neon-button-filled"
            >
              Done
            </button>
          </div>
        ) : step === 'details' ? (
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-display font-bold text-white">
                Booking Details
              </DialogTitle>
            </DialogHeader>

            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6">
              <h4 className="text-white font-medium mb-1">{selectedPkgData?.name}</h4>
              <p className="text-glee-text-muted text-sm">{clubName}</p>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                <span className="text-glee-text-muted text-sm">Package Price</span>
                <span className="text-neon-pink font-display font-bold">${selectedPkgData?.price}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-glee-text-muted text-sm mb-2">Date</label>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  />
                </div>
                <div>
                  <label className="block text-glee-text-muted text-sm mb-2">Time</label>
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                    <option value="12:00 AM">12:00 AM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">
                  Number of Guests ({selectedPkgData?.minGuests}-{selectedPkgData?.maxGuests})
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setGuests(Math.max(selectedPkgData?.minGuests || 4, guests - 1))}
                    className="w-10 h-10 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-glee-bg-secondary border border-white/10">
                    <Users className="w-4 h-4 text-neon-pink" />
                    <span className="text-white font-medium">{guests} guests</span>
                  </div>
                  <button 
                    onClick={() => setGuests(Math.min(selectedPkgData?.maxGuests || 10, guests + 1))}
                    className="w-10 h-10 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

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

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Special Requests</label>
                <textarea 
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50 resize-none"
                  rows={3}
                  placeholder="Any special requests or dietary requirements..."
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
                Confirm Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl font-display font-bold text-white mb-1">
                    Book a Table
                  </DialogTitle>
                  <p className="text-glee-text-muted text-sm">{clubName}</p>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-glee-text-muted" />
                </button>
              </div>
            </DialogHeader>

            <p className="text-glee-text-muted text-sm mb-4">Select your table package:</p>

            <div className="space-y-3 mb-6">
              {tablePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-white/10 bg-glee-bg-secondary/50 hover:border-white/20'
                  }`}
                >
                  {selectedPackage === pkg.id && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-display font-bold">{pkg.name}</h4>
                        <span className="flex items-center gap-1 text-xs text-glee-text-muted">
                          <Users className="w-3 h-3" />
                          {pkg.minGuests}-{pkg.maxGuests}
                        </span>
                      </div>
                      <p className="text-glee-text-muted text-sm mb-2">{pkg.description}</p>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-glee-text-muted">
                            <Check className="w-3 h-3 text-neon-pink" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-neon-pink font-display font-bold text-lg">${pkg.price}</span>
                      <p className="text-glee-text-muted text-xs">min spend</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Preview */}
            <div className="bg-glee-bg-secondary/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-neon-pink/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h5 className="text-white font-medium">View Menu</h5>
                  <p className="text-glee-text-muted text-xs">Bottles, cocktails & more</p>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Champagne', 'Vodka', 'Whiskey', 'Cocktails', 'Mixers'].map((item) => (
                  <span 
                    key={item}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/5 text-glee-text-muted text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              className="w-full neon-button-filled"
            >
              Continue with {selectedPkgData?.name}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
