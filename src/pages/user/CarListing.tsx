import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import type { Car } from '../../types';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function CarListing() {
  const { cars, addOrder } = useAppStore();
  const { user } = useAuthStore();
  const { t } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  
  const filteredCars = cars.filter(car => 
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleConfirmOrder = () => {
    if (!user) return;
    setIsOrdering(true);
    
    setTimeout(() => {
      addOrder({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        userName: user.name,
        carId: selectedCar!.id,
        carTitle: selectedCar!.title,
        price: selectedCar!.price,
        status: 'PENDING',
        date: new Date().toISOString().split('T')[0]
      });
      setIsOrdering(false);
      setSelectedCar(null);
      toast.success('Order placed successfully! We will contact you soon.');
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t('discover')}</h1>
          <p className="text-gray-500 mt-2">{t('browse')}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-smooth shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <SlidersHorizontal size={18} /> {t('filters')}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 w-full" />
              <div className="p-5 flex flex-col flex-1">
                <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-5 bg-gray-200 rounded w-full mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-10" />
                    <div className="h-6 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="text-center py-20 bg-white border border-border rounded-2xl shadow-sm">
          <p className="text-gray-500 text-lg">{t('noVehicles')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all-smooth group flex flex-col cubed-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-md text-gray-900 shadow-sm">
                  {car.condition}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">{car.brand}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{car.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{car.description}</p>
                
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Price</div>
                    <div className="text-xl font-bold text-gray-900">${car.price.toLocaleString()}</div>
                  </div>
                  <button 
                    onClick={() => handleBuyClick(car)}
                    className="flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity text-xs font-semibold"
                  >
                    {t('buyNow')} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={selectedCar.image} alt={selectedCar.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors backdrop-blur-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCar.title}</h2>
                    <p className="text-gray-500">{selectedCar.brand} • {selectedCar.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">${selectedCar.price.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">{t('mileage')}</div>
                      <div className="font-medium text-gray-900">{selectedCar.mileage.toLocaleString()} mi</div>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">{t('condition')}</div>
                      <div className="font-medium text-gray-900">{selectedCar.condition}</div>
                   </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedCar(null)}
                    disabled={isOrdering}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {t('cancel')}
                  </button>
                  <button 
                    onClick={handleConfirmOrder}
                    disabled={isOrdering}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
                  >
                    {isOrdering ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 size={18} /> {t('confirmOrder')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
