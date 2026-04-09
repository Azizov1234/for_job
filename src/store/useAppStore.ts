import { create } from 'zustand';
import type { Car, Order, Review, InstallmentPlan, DiscountCampaign, AdminActionLogEntry } from '../types';

const INITIAL_CARS: Car[] = [
  { id: 'c1', title: 'Tesla Model S Plaid', brand: 'Tesla', price: 89990, discount: 5, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop', description: 'Electric sedan with 1,020 hp and up to 396 miles of range. Experience the future today.', year: 2023, mileage: 1200, condition: 'Used', category: 'Sedan', engine: 'Electric', transmission: 'Automatic', color: 'Red' },
  { id: 'c2', title: 'Porsche 911 GT3', brand: 'Porsche', price: 169700, image: 'https://images.unsplash.com/photo-1503376713356-ea125afec113?q=80&w=800&auto=format&fit=crop', description: 'The pinnacle of Porsche naturally aspirated models. Track-ready excellence.', year: 2024, mileage: 0, condition: 'New', category: 'Sports', engine: '4.0L Flat-6', transmission: 'PDK', color: 'Silver' },
  { id: 'c3', title: 'Audi RS6 Avant', brand: 'Audi', price: 121900, image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop', description: 'Practicality meets supercar performance in this wagon masterpiece.', year: 2023, mileage: 8500, condition: 'Used', category: 'Wagon', engine: '4.0L V8', transmission: 'Automatic' },
  { id: 'c4', title: 'BMW M3 Competition', brand: 'BMW', price: 84300, discount: 8, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop', description: 'Aggressive styling and a potent inline-six engine for the ultimate driver.', year: 2024, mileage: 150, condition: 'New', category: 'Sedan', engine: '3.0L I-6 TwinTurbo', transmission: 'Automatic' },
  { id: 'c5', title: 'Mercedes G-Class', brand: 'Mercedes', price: 139900, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop', description: 'Iconic luxury SUV with unparalleled off-road capabilities and opulent interior.', year: 2022, mileage: 14000, condition: 'Used', category: 'SUV', engine: '4.0L V8 BiTurbo', transmission: 'Automatic' },
  { id: 'c6', title: 'Ford Mustang Dark Horse', brand: 'Ford', price: 60900, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=800&auto=format&fit=crop', description: 'V8 power and track-ready performance for the modern American muscle enthusiast.', year: 2024, mileage: 0, condition: 'New', category: 'Coupe', engine: '5.0L V8', transmission: 'Manual' },
  { id: 'c7', title: 'Lexus LC 500', brand: 'Lexus', price: 99400, image: 'https://images.unsplash.com/photo-1620882814836-92fc9c3a3b50?q=80&w=800&auto=format&fit=crop', description: 'Stunning grand tourer with a naturally aspirated V8 and exquisite craftsmanship.', year: 2023, mileage: 5000, condition: 'Used', category: 'Coupe', engine: '5.0L V8', transmission: 'Automatic' },
  { id: 'c8', title: 'Chevrolet Corvette Z06', brand: 'Chevrolet', price: 112700, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', description: 'Mid-engine supercar dominating the track with 670 hp naturally aspirated V8.', year: 2024, mileage: 50, condition: 'New', category: 'Sports', engine: '5.5L V8', transmission: 'Automatic' },
  { id: 'c9', title: 'Range Rover SV', brand: 'Land Rover', price: 184000, image: 'https://images.unsplash.com/photo-1606016159991-d17b6dc0ff6c?q=80&w=800&auto=format&fit=crop', description: 'The peak of refined British luxury SUVs combining elegance with off-road mastery.', year: 2024, mileage: 200, condition: 'New', category: 'SUV', engine: '4.4L V8', transmission: 'Automatic' },
  { id: 'c10', title: 'Toyota GR Supra', brand: 'Toyota', price: 55400, discount: 3, image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?q=80&w=800&auto=format&fit=crop', description: 'Exciting dynamics and a striking design reviving the legendary sports car lineage.', year: 2023, mileage: 12000, condition: 'Used', category: 'Sports', engine: '3.0L I-6 TwinTurbo', transmission: 'Automatic' },
  { id: 'c11', title: 'Ferrari Roma', brand: 'Ferrari', price: 243000, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop', description: 'Italian elegance combined with a twin-turbo V8 delivering breathtaking performance.', year: 2024, mileage: 10, condition: 'New', category: 'Coupe', engine: '3.9L V8 TwinTurbo', transmission: 'Automatic' },
  { id: 'c12', title: 'Lamborghini Urus', brand: 'Lamborghini', price: 235000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop', description: "The world's first Super Sport Utility Vehicle redefining what an SUV can be.", year: 2023, mileage: 3500, condition: 'Used', category: 'SUV', engine: '4.0L V8 BiTurbo', transmission: 'Automatic' },
  { id: 'c13', title: 'Porsche Cayenne Turbo', brand: 'Porsche', price: 149000, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop', description: 'The ultimate sports car SUV with 650 hp and Porsche DNA in every detail.', year: 2024, mileage: 3000, condition: 'New', category: 'SUV', engine: '4.0L V8 TwinTurbo', transmission: 'Automatic' },
  { id: 'c14', title: 'Aston Martin DB12', brand: 'Aston Martin', price: 245000, image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=800&auto=format&fit=crop', description: 'The world\'s first super tourer combining breathtaking GT performance with peerless luxury.', year: 2024, mileage: 100, condition: 'New', category: 'Coupe', engine: '4.0L V8 TwinTurbo', transmission: 'Automatic' },
];

const INITIAL_ORDERS: Order[] = [
  { id: 'o1', userId: 'u2', userName: 'Alice Smith', carId: 'c1', carTitle: 'Tesla Model S Plaid', price: 89990, status: 'DELIVERED', date: '2024-01-15', installmentMonths: 36, monthlyPayment: 2499 },
  { id: 'o2', userId: 'u3', userName: 'Bob Johnson', carId: 'c8', carTitle: 'Chevrolet Corvette Z06', price: 112700, status: 'CONFIRMED', date: '2024-02-10', installmentMonths: 24, monthlyPayment: 4695 },
  { id: 'o3', userId: 'u4', userName: 'Charlie Brown', carId: 'c10', carTitle: 'Toyota GR Supra', price: 55400, status: 'PENDING', date: '2024-03-05' },
  { id: 'o4', userId: 'u5', userName: 'Diana Prince', carId: 'c11', carTitle: 'Ferrari Roma', price: 243000, status: 'CONFIRMED', date: '2024-03-15', installmentMonths: 60, monthlyPayment: 4050 },
  { id: 'o5', userId: 'u6', userName: 'Edward Blake', carId: 'c4', carTitle: 'BMW M3 Competition', price: 84300, status: 'DELIVERED', date: '2024-01-22' },
  { id: 'o6', userId: 'u7', userName: 'Fiona Green', carId: 'c9', carTitle: 'Range Rover SV', price: 184000, status: 'PENDING', date: '2024-04-01', installmentMonths: 48, monthlyPayment: 3833 },
];

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', userId: 'u2', userName: 'Alice Smith', userAvatar: 'https://ui-avatars.com/api/?name=Alice+Smith&background=6366f1&color=fff', carId: 'c1', carTitle: 'Tesla Model S Plaid', rating: 5, comment: 'Absolutely mind-blowing performance! The acceleration is unreal and the tech is truly next-level. Best car I have ever owned.', date: '2024-01-20' },
  { id: 'r2', userId: 'u3', userName: 'Bob Johnson', userAvatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=10b981&color=fff', carId: 'c8', carTitle: 'Chevrolet Corvette Z06', rating: 5, comment: 'Track performance is extraordinary. The naturally aspirated V8 sounds incredible and the handling is razor-sharp.', date: '2024-02-15' },
  { id: 'r3', userId: 'u5', userName: 'Edward Blake', userAvatar: 'https://ui-avatars.com/api/?name=Edward+Blake&background=f59e0b&color=fff', carId: 'c4', carTitle: 'BMW M3 Competition', rating: 4, comment: 'Incredible daily driver. The M-specific tuning makes every drive special. Interior quality could be a touch higher for the price.', date: '2024-01-28' },
];

const INITIAL_INSTALLMENT_PLANS: InstallmentPlan[] = [
  { id: 'ip1', months: 12, interest: 0, tag: '0% APR', isActive: true },
  { id: 'ip2', months: 24, interest: 5, tag: 'Low Interest', isActive: true },
  { id: 'ip3', months: 36, interest: 8, tag: '', isActive: true },
  { id: 'ip4', months: 48, interest: 10, tag: 'Popular', isActive: true },
  { id: 'ip5', months: 60, interest: 12, tag: '', isActive: false },
];

const INITIAL_CAMPAIGNS: DiscountCampaign[] = [
  { id: 'dc1', name: 'Spring Clearance Sale', discount: 8, startDate: '2024-03-01', endDate: '2024-04-30', isActive: true, carIds: ['c1', 'c3', 'c5'], description: 'Special spring discounts on selected pre-owned vehicles.' },
  { id: 'dc2', name: 'New Year New Car', discount: 5, startDate: '2024-01-01', endDate: '2024-01-31', isActive: false, carIds: ['c2', 'c4', 'c6'], description: 'Kickstart the new year with exclusive savings on new arrivals.' },
  { id: 'dc3', name: 'Summer Luxury Event', discount: 10, startDate: '2024-06-01', endDate: '2024-08-31', isActive: true, carIds: ['c11', 'c12', 'c9'], description: 'Premium discounts on our ultra-luxury lineup this summer.' },
];

const INITIAL_LOGS: AdminActionLogEntry[] = [
  { id: 'al1', adminId: 'admin_1', adminName: 'Super Admin', action: 'CREATED', targetType: 'Car', targetId: 'c14', timestamp: '2024-04-09T10:30:00Z', details: 'Added Aston Martin DB12 listing' },
  { id: 'al2', adminId: 'admin_1', adminName: 'Super Admin', action: 'UPDATED', targetType: 'Order', targetId: 'o2', timestamp: '2024-04-09T09:15:00Z', details: 'Updated order status to CONFIRMED' },
  { id: 'al3', adminId: 'admin_1', adminName: 'Super Admin', action: 'CREATED', targetType: 'Campaign', targetId: 'dc3', timestamp: '2024-04-08T14:00:00Z', details: 'Created Summer Luxury Event campaign' },
  { id: 'al4', adminId: 'admin_1', adminName: 'Super Admin', action: 'DELETED', targetType: 'Car', targetId: 'c_old', timestamp: '2024-04-07T11:45:00Z', details: 'Removed outdated 2019 Honda Civic listing' },
  { id: 'al5', adminId: 'admin_1', adminName: 'Super Admin', action: 'UPDATED', targetType: 'Plan', targetId: 'ip5', timestamp: '2024-04-07T09:00:00Z', details: 'Disabled 60-month installment plan' },
  { id: 'al6', adminId: 'admin_1', adminName: 'Super Admin', action: 'UPDATED', targetType: 'User', targetId: 'u3', timestamp: '2024-04-06T16:20:00Z', details: 'Promoted user Bob Johnson to admin role' },
];

interface AppState {
  cars: Car[];
  orders: Order[];
  reviews: Review[];
  installmentPlans: InstallmentPlan[];
  campaigns: DiscountCampaign[];
  actionLogs: AdminActionLogEntry[];
  // Car actions
  addCar: (car: Car) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  // Order actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  // Review actions
  addReview: (review: Review) => void;
  // Installment plan actions
  addInstallmentPlan: (plan: InstallmentPlan) => void;
  updateInstallmentPlan: (id: string, plan: Partial<InstallmentPlan>) => void;
  deleteInstallmentPlan: (id: string) => void;
  // Campaign actions
  addCampaign: (campaign: DiscountCampaign) => void;
  updateCampaign: (id: string, campaign: Partial<DiscountCampaign>) => void;
  deleteCampaign: (id: string) => void;
  // Log actions
  addLog: (log: AdminActionLogEntry) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cars: INITIAL_CARS,
  orders: INITIAL_ORDERS,
  reviews: INITIAL_REVIEWS,
  installmentPlans: INITIAL_INSTALLMENT_PLANS,
  campaigns: INITIAL_CAMPAIGNS,
  actionLogs: INITIAL_LOGS,
  // Car actions
  addCar: (car) => set((state) => ({ cars: [car, ...state.cars] })),
  updateCar: (id, updatedData) => set((state) => ({
    cars: state.cars.map(c => c.id === id ? { ...c, ...updatedData } : c)
  })),
  deleteCar: (id) => set((state) => ({ cars: state.cars.filter(c => c.id !== id) })),
  // Order actions
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  })),
  // Review actions
  addReview: (review) => set((state) => ({ reviews: [review, ...state.reviews] })),
  // Installment plan actions
  addInstallmentPlan: (plan) => set((state) => ({ installmentPlans: [...state.installmentPlans, plan] })),
  updateInstallmentPlan: (id, data) => set((state) => ({
    installmentPlans: state.installmentPlans.map(p => p.id === id ? { ...p, ...data } : p)
  })),
  deleteInstallmentPlan: (id) => set((state) => ({
    installmentPlans: state.installmentPlans.filter(p => p.id !== id)
  })),
  // Campaign actions
  addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
  updateCampaign: (id, data) => set((state) => ({
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...data } : c)
  })),
  deleteCampaign: (id) => set((state) => ({ campaigns: state.campaigns.filter(c => c.id !== id) })),
  // Log actions
  addLog: (log) => set((state) => ({ actionLogs: [log, ...state.actionLogs] })),
}));
