import { useState } from 'react';
import { X, Check, MapPin, Clock, Phone, CreditCard, Truck, Utensils } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  restaurantName?: string;
  restaurantLogo?: string;
}

type OrderType = 'delivery' | 'pickup' | 'dine-in';

export default function OrderCheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  total,
  restaurantName = 'Crafty Chameleon Brewery',
  restaurantLogo = '/crafty_chameleon_logo.png'
}: OrderCheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');

  const serviceFee = Math.round(total * 0.05);
  const finalTotal = total + serviceFee;

  const handleContinue = () => {
    setStep('payment');
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('details');
    setOrderType('dine-in');
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setNotes('');
    setPaymentMethod('mpesa');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-glee-bg border border-white/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={restaurantLogo} 
                alt={restaurantName}
                className="h-10 w-10 object-contain"
              />
              <div>
                <DialogTitle className="text-xl font-display font-bold text-white">
                  {step === 'success' ? 'Order Confirmed!' : 'Checkout'}
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
              Order Placed!
            </h3>
            <p className="text-glee-text-muted mb-2">
              Your order has been received
            </p>
            <p className="text-neon-pink font-display font-bold text-xl mb-6">
              KES {finalTotal.toLocaleString()}
            </p>
            
            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6 text-left">
              <p className="text-glee-text-muted text-sm mb-2">Order Summary:</p>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-1">
                  <span className="text-white">{item.quantity}x {item.name}</span>
                  <span className="text-glee-text-muted">KES {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-glee-text-muted">Service Fee</span>
                  <span className="text-glee-text-muted">KES {serviceFee.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-glee-text-muted mb-6">
              {orderType === 'dine-in' && 'Your table is reserved. Present this confirmation when you arrive.'}
              {orderType === 'pickup' && 'Your order will be ready in 25-35 minutes.'}
              {orderType === 'delivery' && 'Your order will be delivered in 45-60 minutes.'}
            </p>
            
            <button 
              onClick={handleClose}
              className="neon-button-filled"
            >
              Done
            </button>
          </div>
        ) : step === 'payment' ? (
          <div className="p-6">
            <h3 className="text-lg font-display font-bold text-white mb-4">Payment</h3>
            
            {/* Order Summary */}
            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6">
              <p className="text-glee-text-muted text-sm mb-3">Order Summary</p>
              <div className="space-y-2 mb-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white">{item.quantity}x {item.name}</span>
                    <span className="text-glee-text-muted">KES {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-glee-text-muted">Subtotal</span>
                  <span className="text-white">KES {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-glee-text-muted">Service Fee (5%)</span>
                  <span className="text-white">KES {serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-neon-pink">KES {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mb-6">
              <p className="text-glee-text-muted text-sm">Select Payment Method</p>
              
              <button
                onClick={() => setPaymentMethod('mpesa')}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                  paymentMethod === 'mpesa'
                    ? 'border-neon-pink bg-neon-pink/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-bold text-xs">M-PESA</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">M-Pesa</p>
                  <p className="text-glee-text-muted text-sm">Pay with mobile money</p>
                </div>
                {paymentMethod === 'mpesa' && (
                  <div className="w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-neon-pink bg-neon-pink/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">Card Payment</p>
                  <p className="text-glee-text-muted text-sm">Credit or debit card</p>
                </div>
                {paymentMethod === 'card' && (
                  <div className="w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            </div>

            {paymentMethod === 'mpesa' && (
              <div className="mb-6">
                <label className="block text-glee-text-muted text-sm mb-2">M-Pesa Phone Number</label>
                <input 
                  type="tel"
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  placeholder="254712345678"
                  defaultValue={phone}
                />
                <p className="text-glee-text-muted text-xs mt-2">
                  You will receive an STK push to complete payment
                </p>
              </div>
            )}

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
                Pay KES {finalTotal.toLocaleString()}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Order Type Selection */}
            <div className="mb-6">
              <p className="text-glee-text-muted text-sm mb-3">How would you like to receive your order?</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    orderType === 'dine-in'
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Utensils className={`w-6 h-6 ${orderType === 'dine-in' ? 'text-neon-pink' : 'text-glee-text-muted'}`} />
                  <span className={`text-sm ${orderType === 'dine-in' ? 'text-white' : 'text-glee-text-muted'}`}>Dine In</span>
                </button>

                <button
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    orderType === 'pickup'
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Clock className={`w-6 h-6 ${orderType === 'pickup' ? 'text-neon-pink' : 'text-glee-text-muted'}`} />
                  <span className={`text-sm ${orderType === 'pickup' ? 'text-white' : 'text-glee-text-muted'}`}>Pickup</span>
                </button>

                <button
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    orderType === 'delivery'
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Truck className={`w-6 h-6 ${orderType === 'delivery' ? 'text-neon-pink' : 'text-glee-text-muted'}`} />
                  <span className={`text-sm ${orderType === 'delivery' ? 'text-white' : 'text-glee-text-muted'}`}>Delivery</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-glee-bg-secondary/50 rounded-xl p-4 mb-6">
              <p className="text-glee-text-muted text-sm mb-2">Order Summary ({cart.length} items)</p>
              <p className="text-white font-display font-bold text-xl">
                KES {total.toLocaleString()}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Full Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-pink" />
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-3 pl-11 pr-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Email (Optional)</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50"
                  placeholder="john@example.com"
                />
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-glee-text-muted text-sm mb-2">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 w-4 h-4 text-neon-pink" />
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full py-3 pl-11 pr-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50 resize-none"
                      rows={2}
                      placeholder="Enter your delivery address"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-glee-text-muted text-sm mb-2">Order Notes (Optional)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-glee-bg-secondary border border-white/10 text-white focus:outline-none focus:border-neon-pink/50 resize-none"
                  rows={2}
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            <button 
              onClick={handleContinue}
              disabled={!name || !phone || (orderType === 'delivery' && !address)}
              className="w-full neon-button-filled disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Payment
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
