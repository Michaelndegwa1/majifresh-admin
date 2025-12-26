import apiClient from './client';
import { Driver, Customer, DashboardStats, SalesData } from '../types/user';

// Mock driver data
const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'Michael Driver',
    email: 'michael.d@majifreshi.com',
    phone: '+1234567892',
    status: 'busy',
    vehicle: {
      type: 'Van',
      plateNumber: 'KAA 123X',
    },
    currentLocation: { lat: -1.2921, lng: 36.8219 },
    completedDeliveries: 142,
    rating: 4.8,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'd2',
    name: 'Sarah Driver',
    email: 'sarah.d@majifreshi.com',
    phone: '+1234567894',
    status: 'available',
    vehicle: {
      type: 'Truck',
      plateNumber: 'KBB 456Y',
    },
    currentLocation: { lat: -1.3028, lng: 36.7073 },
    completedDeliveries: 98,
    rating: 4.9,
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'd3',
    name: 'David Wilson',
    email: 'david.w@majifreshi.com',
    phone: '+1234567896',
    status: 'available',
    vehicle: {
      type: 'Van',
      plateNumber: 'KCC 789Z',
    },
    completedDeliveries: 76,
    rating: 4.7,
    createdAt: '2024-03-20T00:00:00Z',
  },
];

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    addresses: [
      {
        id: 'a1',
        street: '123 Main St',
        city: 'Nairobi',
        state: 'Nairobi County',
        zipCode: '00100',
        isDefault: true,
      },
    ],
    totalOrders: 24,
    totalSpent: 645.32,
    createdAt: '2024-01-05T00:00:00Z',
    lastOrderAt: '2024-12-26T08:30:00Z',
  },
  {
    id: 'c2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1234567891',
    addresses: [
      {
        id: 'a2',
        street: '456 Oak Avenue',
        city: 'Mombasa',
        state: 'Mombasa County',
        zipCode: '80100',
        isDefault: true,
      },
    ],
    totalOrders: 18,
    totalSpent: 487.50,
    createdAt: '2024-02-12T00:00:00Z',
    lastOrderAt: '2024-12-26T07:15:00Z',
  },
];

export const usersApi = {
  getDrivers: async (): Promise<Driver[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockDrivers;
    
    // Real implementation:
    // const response = await apiClient.get<Driver[]>('/users/drivers/');
    // return response.data;
  },

  getCustomers: async (): Promise<Customer[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockCustomers;
    
    // Real implementation:
    // const response = await apiClient.get<Customer[]>('/users/customers/');
    // return response.data;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return {
      totalOrders: 156,
      totalRevenue: 12450.75,
      activeDrivers: 2,
      lowStockItems: 2,
      todayOrders: 12,
      todayRevenue: 856.32,
      pendingOrders: 5,
    };
    
    // Real implementation:
    // const response = await apiClient.get<DashboardStats>('/dashboard/stats/');
    // return response.data;
  },

  getSalesData: async (days: number = 7): Promise<SalesData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Generate mock sales data for the last N days
    const data: SalesData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.random() * 2000 + 500,
        orders: Math.floor(Math.random() * 20) + 5,
      });
    }
    
    return data;
    
    // Real implementation:
    // const response = await apiClient.get<SalesData[]>('/dashboard/sales/', {
    //   params: { days },
    // });
    // return response.data;
  },
};
