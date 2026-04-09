export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

export interface Car {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  year: number;
  mileage: number;
  condition: 'New' | 'Used';
  discount?: number;
  category?: string;
  engine?: string;
  transmission?: string;
  color?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  carId: string;
  carTitle: string;
  price: number;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';
  date: string;
  installmentMonths?: number;
  installmentInterest?: number;
  monthlyPayment?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  carId: string;
  carTitle: string;
  rating: number;
  comment: string;
  date: string;
}

export interface InstallmentPlan {
  id: string;
  months: number;
  interest: number;
  tag?: string;
  isActive: boolean;
}

export interface DiscountCampaign {
  id: string;
  name: string;
  discount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  carIds: string[];
  description?: string;
}

export interface AdminActionLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: 'Car' | 'Order' | 'User' | 'Campaign' | 'Plan';
  targetId: string;
  timestamp: string;
  details?: string;
}
