import apiClient from './client';
import { Order, OrderFilters, OrderStatusUpdate, AssignDriverRequest } from '../types/order';

// Mock order data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      id: 'c1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1234567890',
    },
    items: [
      {
        id: 'oi1',
        productId: '2',
        productName: '5 Gallon Water Jug',
        quantity: 3,
        price: 8.99,
        subtotal: 26.97,
      },
    ],
    status: 'pending',
    totalAmount: 26.97,
    deliveryAddress: {
      street: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      coordinates: { lat: -1.2921, lng: 36.8219 },
    },
    createdAt: '2024-12-26T08:30:00Z',
    updatedAt: '2024-12-26T08:30:00Z',
    notes: 'Please deliver before 2 PM',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      id: 'c2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1234567891',
    },
    items: [
      {
        id: 'oi2',
        productId: '1',
        productName: '500ml Pure Spring Water',
        quantity: 24,
        price: 1.5,
        subtotal: 36.0,
      },
      {
        id: 'oi3',
        productId: '4',
        productName: 'Lemon Flavored Water Pack',
        quantity: 2,
        price: 12.99,
        subtotal: 25.98,
      },
    ],
    status: 'delivering',
    totalAmount: 61.98,
    deliveryAddress: {
      street: '456 Oak Avenue',
      city: 'Mombasa',
      state: 'Mombasa County',
      zipCode: '80100',
      coordinates: { lat: -4.0435, lng: 39.6682 },
    },
    driver: {
      id: 'd1',
      name: 'Michael Driver',
      phone: '+1234567892',
    },
    createdAt: '2024-12-26T07:15:00Z',
    updatedAt: '2024-12-26T09:45:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      id: 'c3',
      name: 'Robert Johnson',
      email: 'robert.j@email.com',
      phone: '+1234567893',
    },
    items: [
      {
        id: 'oi4',
        productId: '2',
        productName: '5 Gallon Water Jug',
        quantity: 5,
        price: 8.99,
        subtotal: 44.95,
      },
    ],
    status: 'delivered',
    totalAmount: 44.95,
    deliveryAddress: {
      street: '789 Pine Road',
      city: 'Kisumu',
      state: 'Kisumu County',
      zipCode: '40100',
      coordinates: { lat: -0.0917, lng: 34.7680 },
    },
    driver: {
      id: 'd2',
      name: 'Sarah Driver',
      phone: '+1234567894',
    },
    createdAt: '2024-12-25T14:20:00Z',
    updatedAt: '2024-12-25T18:30:00Z',
    deliveredAt: '2024-12-25T18:30:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: {
      id: 'c4',
      name: 'Emily Brown',
      email: 'emily.b@email.com',
      phone: '+1234567895',
    },
    items: [
      {
        id: 'oi5',
        productId: '3',
        productName: 'Sparkling Mineral Water 1L',
        quantity: 12,
        price: 2.99,
        subtotal: 35.88,
      },
    ],
    status: 'confirmed',
    totalAmount: 35.88,
    deliveryAddress: {
      street: '321 Elm Street',
      city: 'Nakuru',
      state: 'Nakuru County',
      zipCode: '20100',
    },
    createdAt: '2024-12-26T09:00:00Z',
    updatedAt: '2024-12-26T09:15:00Z',
  },
];

export const ordersApi = {
  getAll: async (filters?: OrderFilters): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    let filtered = [...mockOrders];
    
    if (filters?.status) {
      filtered = filtered.filter((o) => o.status === filters.status);
    }
    
    if (filters?.customerId) {
      filtered = filtered.filter((o) => o.customer.id === filters.customerId);
    }
    
    if (filters?.driverId) {
      filtered = filtered.filter((o) => o.driver?.id === filters.driverId);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Real implementation:
    // const response = await apiClient.get<Order[]>('/orders/', { params: filters });
    // return response.data;
  },

  getById: async (id: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const order = mockOrders.find((o) => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
    
    // Real implementation:
    // const response = await apiClient.get<Order>(`/orders/${id}/`);
    // return response.data;
  },

  updateStatus: async (data: OrderStatusUpdate): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const order = mockOrders.find((o) => o.id === data.orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    
    order.status = data.status;
    order.updatedAt = new Date().toISOString();
    if (data.notes) {
      order.notes = data.notes;
    }
    if (data.status === 'delivered') {
      order.deliveredAt = new Date().toISOString();
    }
    
    return order;
    
    // Real implementation:
    // const response = await apiClient.patch<Order>(`/orders/${data.orderId}/status/`, data);
    // return response.data;
  },

  assignDriver: async (data: AssignDriverRequest): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const order = mockOrders.find((o) => o.id === data.orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    
    // Mock driver assignment
    order.driver = {
      id: data.driverId,
      name: 'Assigned Driver',
      phone: '+1234567890',
    };
    order.status = 'assigned';
    order.updatedAt = new Date().toISOString();
    
    return order;
    
    // Real implementation:
    // const response = await apiClient.post<Order>(`/orders/${data.orderId}/assign-driver/`, data);
    // return response.data;
  },
};
