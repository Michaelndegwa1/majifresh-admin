export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image?: string;
  sku: string;
  unit: 'bottle' | 'gallon' | 'liter' | 'pack';
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'bottled_water'
  | 'gallon_water'
  | 'sparkling_water'
  | 'flavored_water'
  | 'accessories';

export interface ProductFormData {
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image?: string;
  sku: string;
  unit: 'bottle' | 'gallon' | 'liter' | 'pack';
}

export interface ProductFilters {
  category?: ProductCategory;
  status?: 'active' | 'inactive' | 'out_of_stock';
  search?: string;
}
