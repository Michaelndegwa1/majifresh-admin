export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  vehicle: {
    type: string;
    plateNumber: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
  };
  completedDeliveries: number;
  rating: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrderAt?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeDrivers: number;
  lowStockItems: number;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}
