import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calculator } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';
import { useLanguageStore } from '../store/useLanguageStore';
import type { Car } from '../types';
import toast from 'react-hot-toast';

interface OrderFormProps {
  car: Car;
  onClose: () => void;
}

const mockPlans = [
  { id: '1', months: 12, interest: 0, tag: '0% APR' },
  { id: '2', months: 24, interest: 5, tag: 'Low Interest' },
  { id: '3', months: 36, interest: 8, tag: '' },
];

export function OrderForm({ car, onClose }: OrderFormProps) {
  const { user } = useAuthStore();
  const { addOrder } = useAppStore();
  const { t } = useLanguageStore();
  const [selectedPlan, setSelectedPlan] = useState<typeof mockPlans[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalPrice = selectedPlan 
    ? car.price * (1 + selectedPlan.interest / 100) 
    : car.price;
  
  const monthlyPayment = selectedPlan 
    ? finalPrice / selectedPlan.months 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to place an order.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call (POST /orders)
    setTimeout(() => {
      addOrder({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        userName: user.name,
        carId: car.id,
        carTitle: car.title,
        price: finalPrice,
        status: 'PENDING',
        date: new Date().toISOString().split('T')[0]
      });
      setIsSubmitting(false);
      toast.success('Order placed successfully!');
      onClose();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white md:bg-transparent">
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{car.title}</h2>
            <p className="text-gray-500">{car.brand} • {car.year}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">${car.price.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator size={20} className="text-primary" /> {t('selectPlan') || 'Select Installment Plan'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
               onClick={() => setSelectedPlan(null)}
               className={`glass-card p-4 cursor-pointer relative btn-hover-scale overflow-hidden transition-all ${!selectedPlan ? 'border-primary ring-2 ring-primary/20 bg-indigo-50/50' : 'border-gray-200'}`}
             >
                <div className="font-bold text-gray-900 mb-1">{t('payFull') || 'Pay in Full'}</div>
                <div className="text-sm text-gray-500">{t('noInterest') || 'No extra interest'}</div>
                {!selectedPlan && (
                  <motion.div layoutId="plan-outline" className="absolute inset-0 border-2 border-primary rounded-xl" />
                )}
             </div>
            {mockPlans.map((plan, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`glass-card p-4 cursor-pointer relative btn-hover-scale overflow-hidden transition-all ${selectedPlan?.id === plan.id ? 'border-primary ring-2 ring-primary/20 bg-indigo-50/50' : 'border-gray-200'}`}
              >
                {plan.tag && (
                  <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm">
                    {plan.tag}
                  </span>
                )}
                <div className="font-bold text-gray-900 mb-1">{plan.months} {t('months') || 'Months'}</div>
                <div className="text-sm text-gray-500">{plan.interest}% {t('interest') || 'Interest'}</div>
                
                {selectedPlan?.id === plan.id && (
                  <motion.div layoutId="plan-outline" className="absolute inset-0 border-2 border-primary rounded-xl" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:p-8 bg-white border-t border-gray-100 flex flex-col gap-4">
        {/* Sticky Summary inside Action Area */}
        <AnimatePresence mode="wait">
          {selectedPlan && (
            <motion.div 
              key="order-summary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-2"
            >
              <h4 className="font-semibold text-gray-900 mb-1 uppercase text-[10px] tracking-wider">{t('summary')}</h4>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{t('basePrice')}</span>
                <span className="font-medium text-gray-900">${car.price.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{t('interest')} ({selectedPlan.interest}%)</span>
                <span className="font-medium text-gray-900">+${(car.price * (selectedPlan.interest / 100)).toLocaleString()}</span>
              </div>

              <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-sm">{t('total')}</span>
                <span className="font-bold text-lg text-primary">${finalPrice.toLocaleString()}</span>
              </div>

              <div className="bg-indigo-100/50 p-3 rounded-xl border border-indigo-100 mt-1">
                 <div className="flex justify-between items-center">
                   <span className="text-xs font-semibold text-indigo-900">{t('monthlyPayment')}</span>
                   <span className="font-bold text-lg text-indigo-700">${Math.round(monthlyPayment).toLocaleString()}/mo</span>
                 </div>
                 <div className="text-[10px] text-indigo-500 text-right mt-0.5">{selectedPlan.months} {t('months')}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 btn-hover-scale disabled:opacity-50"
          >
            {t('cancel') || 'Cancel'}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-primary btn-hover-scale shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 size={18} /> {t('confirmOrder') || 'Confirm Order'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
