import { useState } from 'react';
import { X, Check, Users, Calendar, Clock, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface TableZone {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
}

interface RestaurantBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
  restaurantLogo?: string;
}

const tableZones: TableZone[] = [
  {
    id: 'beer-garden',
    name: 'Beer Garden',
    description: 'Outdoor seating with brewery views',
    capacity: '2-8 guests',
    image: '/restaurant_frame.jpg'
  },
  {
    id: 'indoor',
    name: 'Indoor Dining',
    description: 'Cozy restaurant interior with jazz',
    capacity: '2-6 guests',
    image: '/restaurant_frame.jpg'
  },
  {
    id: 'cabana',
    name: 'Garden Cabana',
    description: 'Private covered seating area',
    capacity: '6-12 guests',
    image: '/restaurant_frame.jpg'
  },
  {
    id: 'boardroom',
    name: 'Boardroom',
    description: 'Private room for corporate events',
    capacity: '8-20 guests',
    image: '/restaurant_frame.jpg'
  }
];

const timeSlots = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

export default function RestaurantBookingModal({ 
  isOpen, 
  onClose, 
  restaurantName = 'Crafty Chameleon Brewery',
  restaurantLogo = '/crafty_chameleon_logo.png'
}: RestaurantBookingModalProps) {
  const [selectedZone, setSelectedZone] = useState<string>('beer-garden');
  const [guests, setGuests] = useState(4);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [occasion, setOccasion] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [step, setStep] = useState<'zone' | 'details' | 'confirm' | 'success'>('zone');

  const selectedZoneData = tableZones.find(z => z.id === selectedZone);

  const handleContinue = () => {
    if (step === 'zone') setStep('details');
    else if (step === 'details') setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('zone');
    setGuests(4);
    setDate('');
    setTime('');
    setOccasion('');
    setSpecialRequests('');
    setSelectedZone('beer-garden');
    onClose();
  };

  const occasions = ['Casual Dining', 'Birthday', 'Anniversary', 'Business Meeting', 'Date Night', 'Group Celebration'];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-glee-bg border border-white/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header with Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={restaurantLogo} 
                alt={restaurantName}
                className="h-12 w-12 object-contain"
              />
              <div>
                <DialogTitle className="text-xl font-display font-bold text-white">
                  {step === 'success' ? 'Reservation Confirmed!' : 'Book a Table'}
                </DialogTitle>
                <p className="text-glee-text-muted text-sm">{restaurantName}</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-glee-text-muted" />
            </button>
          </div>
        </div>

        {step === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-pink/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-neon-pink" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Table Reserved!
            </h3>
            <p className="text-glee-text-muted mb-2">
              {selectedZoneData?.name} for {guests} guests
            </p>
            <p className="text-glee-text-muted mb-6">
              {date} at {time}
            </p>
            <p className="text-sm text-glee-text-muted mb-6">
              A confirmation has been sent to your email.
              <br />
              We can't wait to host you!
            </p>
            <button 
              onClick={handleClose}
              className="neon-button-filled"
            >
              Done
            </button>
          </div>
        ) : step === 'confirm' ? (
          <div className="p-6">
            <h3 className="text-lg font-display font-bold text-white mb-4">Confirm Reservation</h3>
            
            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-neon-pink" />
                <div>
                  <p className="text-white font-medium">{selectedZoneData?.name}</p>
                  <p className="text-glee-text-muted text-sm">{selectedZoneData?.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neon-pink" />
                <p className="text-white">{date}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-neon-pink" />
                <p className="text-white">{time}</p>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-neon-pink" />
                <p className="text-white">{guests} guests</p>
              </div>
              {occasion && (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-glee-text-muted text-sm">Occasion: <span className="text-white">{occasion}</span></p>
                </div>
              )}
              {specialRequests && (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-glee-text-muted text-sm">Special Requests: <span className="text-white">{specialRequests}</span></p>
                </div>
              )}
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
                  placeholder="+254 712 345 678"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep('details')}
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
        ) : step === 'details' ? (
          <div className="p-6">
            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <img 
                  src={restaurantLogo} 
                  alt=""
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h4 className="text-white font-medium">{selectedZoneData?.name}</h4>
                  <p className="text-glee-text-muted text-sm">{selectedZoneData?.capacity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Select Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                />
              </div>

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Select Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2 px-3 rounded-lg text-sm transition-all ${
                        time === slot
                          ? 'bg-neon-pink text-white'
                          : 'bg-glee-bg-secondary border border-white/10 text-white hover:border-neon-pink/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-glee-bg-secondary border border-white/10">
                    <Users className="w-4 h-4 text-neon-pink" />
                    <span className="text-white font-medium">{guests} guests</span>
                  </div>
                  <button 
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                    className="w-10 h-10 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Occasion (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setOccasion(occ === occasion ? '' : occ)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        occasion === occ
                          ? 'bg-neon-pink text-white'
                          : 'bg-glee-bg-secondary border border-white/10 text-glee-text-muted hover:border-neon-pink/50'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Special Requests (Optional)</label>
                <textarea 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50 resize-none"
                  rows={3}
                  placeholder="Any dietary requirements, seating preferences, etc."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep('zone')}
                className="flex-1 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={!date || !time}
                className="flex-1 neon-button-filled disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-glee-text-muted text-sm mb-4">Select your preferred seating area:</p>

            <div className="space-y-3 mb-6">
              {tableZones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedZone === zone.id
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-white/10 bg-glee-bg-secondary/50 hover:border-white/20'
                  }`}
                >
                  {selectedZone === zone.id && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-glee-bg overflow-hidden flex-shrink-0">
                      <img 
                        src={zone.image} 
                        alt={zone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-display font-bold">{zone.name}</h4>
                      <p className="text-glee-text-muted text-sm">{zone.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-neon-pink text-sm">
                        <Users className="w-4 h-4" />
                        <span>{zone.capacity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleContinue}
              className="w-full neon-button-filled"
            >
              Continue with {selectedZoneData?.name}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
