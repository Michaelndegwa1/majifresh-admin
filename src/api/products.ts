import apiClient from './client';
import { Product, ProductFormData, ProductFilters } from '../types/product';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: '500ml Pure Spring Water',
    description: 'Fresh spring water in convenient 500ml bottles',
    category: 'bottled_water',
    price: 1.5,
    stock: 450,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop',
    sku: 'MSW-500ML-001',
    unit: 'bottle',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: '5 Gallon Water Jug',
    description: 'Large 5-gallon water jug for home and office',
    category: 'gallon_water',
    price: 8.99,
    stock: 120,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1550677584-06d71c18dc5e?w=400&h=400&fit=crop',
    sku: 'MSW-5GAL-001',
    unit: 'gallon',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-22T11:15:00Z',
  },
  {
    id: '3',
    name: 'Sparkling Mineral Water 1L',
    description: 'Refreshing sparkling mineral water',
    category: 'sparkling_water',
    price: 2.99,
    stock: 8,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop',
    sku: 'MSW-SPARK-1L',
    unit: 'liter',
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-23T16:45:00Z',
  },
  {
    id: '4',
    name: 'Lemon Flavored Water Pack',
    description: '12-pack of lemon flavored water bottles',
    category: 'flavored_water',
    price: 12.99,
    stock: 65,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    sku: 'MSW-LEMON-12PK',
    unit: 'pack',
    createdAt: '2024-01-18T13:20:00Z',
    updatedAt: '2024-01-24T09:10:00Z',
  },
  {
    id: '5',
    name: 'Water Dispenser Pump',
    description: 'Manual pump for 5-gallon water jugs',
    category: 'accessories',
    price: 15.99,
    stock: 2,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop',
    sku: 'MSW-ACC-PUMP',
    unit: 'pack',
    createdAt: '2024-01-20T07:45:00Z',
    updatedAt: '2024-01-25T12:00:00Z',
  },
];

export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    let filtered = [...mockProducts];
    
    if (filters?.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    
    if (filters?.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search)
      );
    }
    
    return filtered;
    
    // Real implementation:
    // const response = await apiClient.get<Product[]>('/products/', { params: filters });
    // return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
    
    // Real implementation:
    // const response = await apiClient.get<Product>(`/products/${id}/`);
    // return response.data;
  },

  create: async (data: ProductFormData): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const newProduct: Product = {
      ...data,
      id: String(mockProducts.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockProducts.push(newProduct);
    return newProduct;
    
    // Real implementation:
    // const response = await apiClient.post<Product>('/products/', data);
    // return response.data;
  },

  update: async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return mockProducts[index];
    
    // Real implementation:
    // const response = await apiClient.patch<Product>(`/products/${id}/`, data);
    // return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
    
    // Real implementation:
    // await apiClient.delete(`/products/${id}/`);
  },
};
