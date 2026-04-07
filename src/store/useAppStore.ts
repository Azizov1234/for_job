import { create } from 'zustand';
import type { Car, Order } from '../types';

const INITIAL_CARS: Car[] = [
  { id: 'c1', title: 'Tesla Model S Plaid', brand: 'Tesla', price: 89990, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop', description: 'Electric sedan with 1,020 hp and up to 396 miles of range.', year: 2023, mileage: 1200, condition: 'Used' },
  { id: 'c2', title: 'Porsche 911 GT3', brand: 'Porsche', price: 169700, image: 'https://images.unsplash.com/photo-1503376713356-ea125afec113?q=80&w=800&auto=format&fit=crop', description: 'The pinnacle of Porsche naturally aspirated models.', year: 2024, mileage: 0, condition: 'New' },
  { id: 'c3', title: 'Audi RS6 Avant', brand: 'Audi', price: 121900, image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop', description: 'Practicality meets supercar performance.', year: 2023, mileage: 8500, condition: 'Used' },
  { id: 'c4', title: 'BMW M3 Competition', brand: 'BMW', price: 84300, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop', description: 'Aggressive styling and a potent inline-six engine.', year: 2024, mileage: 150, condition: 'New' },
  { id: 'c5', title: 'Mercedes-Benz G-Class', brand: 'Mercedes', price: 139900, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop', description: 'Iconic luxury SUV with unparalleled off-road capabilities.', year: 2022, mileage: 14000, condition: 'Used' },
  { id: 'c6', title: 'Ford Mustang Dark Horse', brand: 'Ford', price: 60900, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=800&auto=format&fit=crop', description: 'V8 power and track-ready performance.', year: 2024, mileage: 0, condition: 'New' },
  { id: 'c7', title: 'Lexus LC 500', brand: 'Lexus', price: 99400, image: 'https://images.unsplash.com/photo-1620882814836-92fc9c3a3b50?q=80&w=800&auto=format&fit=crop', description: 'Stunning grand tourer with a naturally aspirated V8.', year: 2023, mileage: 5000, condition: 'Used' },
  { id: 'c8', title: 'Chevrolet Corvette Z06', brand: 'Chevrolet', price: 112700, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', description: 'Mid-engine supercar dominating the track.', year: 2024, mileage: 50, condition: 'New' },
  { id: 'c9', title: 'Range Rover SV', brand: 'Land Rover', price: 184000, image: 'https://images.unsplash.com/photo-1606016159991-d17b6dc0ff6c?q=80&w=800&auto=format&fit=crop', description: 'The peak of refined British luxury SUVs.', year: 2024, mileage: 200, condition: 'New' },
  { id: 'c10', title: 'Toyota GR Supra', brand: 'Toyota', price: 55400, image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?q=80&w=800&auto=format&fit=crop', description: 'Exciting dynamics and a striking design.', year: 2023, mileage: 12000, condition: 'Used' },
];

const INITIAL_ORDERS: Order[] = [
  { id: 'o1', userId: 'u2', userName: 'Alice Smith', carId: 'c1', carTitle: 'Tesla Model S Plaid', price: 89990, status: 'DELIVERED', date: '2024-01-15' },
  { id: 'o2', userId: 'u3', userName: 'Bob Johnson', carId: 'c8', carTitle: 'Chevrolet Corvette Z06', price: 112700, status: 'CONFIRMED', date: '2024-02-10' },
  { id: 'o3', userId: 'u4', userName: 'Charlie Brown', carId: 'c10', carTitle: 'Toyota GR Supra', price: 55400, status: 'PENDING', date: '2024-03-05' },
];

interface AppState {
  cars: Car[];
  orders: Order[];
  addCar: (car: Car) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cars: INITIAL_CARS,
  orders: INITIAL_ORDERS,
  addCar: (car) => set((state) => ({ cars: [car, ...state.cars] })),
  updateCar: (id, updatedData) => set((state) => ({
    cars: state.cars.map(c => c.id === id ? { ...c, ...updatedData } : c)
  })),
  deleteCar: (id) => set((state) => ({ cars: state.cars.filter(c => c.id !== id) })),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  })),
}));
