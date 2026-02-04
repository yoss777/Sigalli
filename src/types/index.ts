export type ProductCategory = 'Produits Laitiers' | 'Boissons' | 'Fromages';

export interface Product {
  id: string;
  name: string;
  barcode: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image?: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface SalesData {
  date: string;
  revenue: number;
  quantity: number;
}

export interface ProductSales {
  productId: string;
  productName: string;
  totalRevenue: number;
  totalQuantity: number;
  monthlySales: SalesData[];
}

export interface StoreSales {
  storeId: string;
  storeName: string;
  totalRevenue: number;
  totalQuantity: number;
  monthlySales: SalesData[];
}

export interface DashboardStats {
  totalRevenue: number;
  totalProducts: number;
  totalStores: number;
  totalOrders: number;
  revenueGrowth: number;
  topProducts: { name: string; revenue: number; quantity: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  revenueByCategory: { category: ProductCategory; revenue: number; percentage: number }[];
  revenueByStore: { storeName: string; revenue: number }[];
}

export interface Transaction {
  id: string;
  date: string;
  productName: string;
  storeName: string;
  quantity: number;
  amount: number;
  type: 'sale' | 'return';
}
