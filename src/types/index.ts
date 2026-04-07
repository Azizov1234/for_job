export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Car {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  year: number;
  mileage: number;
  condition: 'New' | 'Used';
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  carId: string;
  carTitle: string;
  price: number;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED';
  date: string;
}
