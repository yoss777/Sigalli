import { Product, Store, Transaction, DashboardStats, ProductCategory } from '../types';

// ============================================================
// PRODUCTS - 3 categories from Sigalli's catalog
// Partners: Candia, Yoplait, Bel, Tampico
// ============================================================

export const products: Product[] = [
  // === PRODUITS LAITIERS (Dairy Products) ===
  { id: 'PL001', name: 'Candia Lait Entier 1L', barcode: '3533631100018', category: 'Produits Laitiers', price: 1500, unit: 'bouteille' },
  { id: 'PL002', name: 'Candia Lait Demi-Écrémé 1L', barcode: '3533631200015', category: 'Produits Laitiers', price: 1400, unit: 'bouteille' },
  { id: 'PL003', name: 'Candia Lait Écrémé 1L', barcode: '3533631300012', category: 'Produits Laitiers', price: 1350, unit: 'bouteille' },
  { id: 'PL004', name: 'Candia Candy\'Up Chocolat 20cl', barcode: '3533632000191', category: 'Produits Laitiers', price: 500, unit: 'brique' },
  { id: 'PL005', name: 'Candia Candy\'Up Fraise 20cl', barcode: '3533632000207', category: 'Produits Laitiers', price: 500, unit: 'brique' },
  { id: 'PL006', name: 'Yoplait Yaourt Nature 125g', barcode: '3329770000018', category: 'Produits Laitiers', price: 750, unit: 'pot' },
  { id: 'PL007', name: 'Yoplait Yaourt Vanille 125g', barcode: '3329770000025', category: 'Produits Laitiers', price: 800, unit: 'pot' },
  { id: 'PL008', name: 'Yoplait Yaourt Fraise 125g', barcode: '3329770000032', category: 'Produits Laitiers', price: 800, unit: 'pot' },
  { id: 'PL009', name: 'Yoplait Yop Vanille 250ml', barcode: '3329770100012', category: 'Produits Laitiers', price: 1200, unit: 'bouteille' },
  { id: 'PL010', name: 'Yoplait Yop Fraise 250ml', barcode: '3329770100029', category: 'Produits Laitiers', price: 1200, unit: 'bouteille' },
  { id: 'PL011', name: 'Candia Lait Concentré Sucré 397g', barcode: '3533633000179', category: 'Produits Laitiers', price: 2000, unit: 'boîte' },
  { id: 'PL012', name: 'Candia Crème Fraîche 20cl', barcode: '3533634000176', category: 'Produits Laitiers', price: 1800, unit: 'brique' },

  // === BOISSONS (Beverages) ===
  { id: 'BO001', name: 'Tampico Citrus Punch 1L', barcode: '0085239201039', category: 'Boissons', price: 1500, unit: 'bouteille' },
  { id: 'BO002', name: 'Tampico Tropical Punch 1L', barcode: '0085239201046', category: 'Boissons', price: 1500, unit: 'bouteille' },
  { id: 'BO003', name: 'Tampico Mango Punch 1L', barcode: '0085239201053', category: 'Boissons', price: 1500, unit: 'bouteille' },
  { id: 'BO004', name: 'Tampico Island Punch 50cl', barcode: '0085239205038', category: 'Boissons', price: 900, unit: 'bouteille' },
  { id: 'BO005', name: 'World Cola 1.5L', barcode: '6291001000015', category: 'Boissons', price: 1000, unit: 'bouteille' },
  { id: 'BO006', name: 'World Cola 50cl', barcode: '6291001000503', category: 'Boissons', price: 500, unit: 'bouteille' },
  { id: 'BO007', name: 'Djino Cocktail 1.5L', barcode: '6291002000014', category: 'Boissons', price: 1200, unit: 'bouteille' },
  { id: 'BO008', name: 'Djino Cocktail 50cl', barcode: '6291002000502', category: 'Boissons', price: 600, unit: 'bouteille' },
  { id: 'BO009', name: 'Akewa Eau Minérale 1.5L', barcode: '6291003000013', category: 'Boissons', price: 400, unit: 'bouteille' },
  { id: 'BO010', name: 'Akewa Eau Minérale 50cl', barcode: '6291003000501', category: 'Boissons', price: 250, unit: 'bouteille' },
  { id: 'BO011', name: 'Top Ananas 1L', barcode: '6291004000012', category: 'Boissons', price: 1100, unit: 'bouteille' },
  { id: 'BO012', name: 'Top Orange 1L', barcode: '6291004000029', category: 'Boissons', price: 1100, unit: 'bouteille' },
  { id: 'BO013', name: 'Sumol Ananas 33cl', barcode: '5601045000015', category: 'Boissons', price: 800, unit: 'canette' },
  { id: 'BO014', name: 'Sumol Orange 33cl', barcode: '5601045000022', category: 'Boissons', price: 800, unit: 'canette' },
  { id: 'BO015', name: 'Orangina 33cl', barcode: '3124480003003', category: 'Boissons', price: 900, unit: 'canette' },
  { id: 'BO016', name: 'Youzou Gingembre 33cl', barcode: '6291005000011', category: 'Boissons', price: 700, unit: 'bouteille' },
  { id: 'BO017', name: 'Andza Citron 1L', barcode: '6291006000010', category: 'Boissons', price: 950, unit: 'bouteille' },
  { id: 'BO018', name: 'XXL Energy Drink 25cl', barcode: '6291007000019', category: 'Boissons', price: 1000, unit: 'canette' },

  // === FROMAGES (Cheeses) ===
  { id: 'FR001', name: 'La Vache Qui Rit 8 portions', barcode: '3073780969178', category: 'Fromages', price: 2500, unit: 'boîte' },
  { id: 'FR002', name: 'La Vache Qui Rit 16 portions', barcode: '3073780969185', category: 'Fromages', price: 4200, unit: 'boîte' },
  { id: 'FR003', name: 'Kiri 6 portions', barcode: '3073780527637', category: 'Fromages', price: 2800, unit: 'boîte' },
  { id: 'FR004', name: 'Kiri 12 portions', barcode: '3073780527644', category: 'Fromages', price: 4800, unit: 'boîte' },
  { id: 'FR005', name: 'Babybel Original 5 pièces', barcode: '3073780465403', category: 'Fromages', price: 3500, unit: 'sachet' },
  { id: 'FR006', name: 'Babybel Mini 6 pièces', barcode: '3073780465410', category: 'Fromages', price: 3200, unit: 'sachet' },
  { id: 'FR007', name: 'Picon Fromage Fondu 8 portions', barcode: '3073780510019', category: 'Fromages', price: 2200, unit: 'boîte' },
  { id: 'FR008', name: 'Bel Président Camembert 250g', barcode: '3228020480015', category: 'Fromages', price: 5500, unit: 'pièce' },
  { id: 'FR009', name: 'Bel Président Emmental Râpé 200g', barcode: '3228020480022', category: 'Fromages', price: 4500, unit: 'sachet' },
  { id: 'FR010', name: 'La Vache Qui Rit Light 8 portions', barcode: '3073780969192', category: 'Fromages', price: 2700, unit: 'boîte' },
];

// ============================================================
// STORES - Magasins Sigalli au Gabon
// ============================================================

export const stores: Store[] = [
  { id: 'ST001', name: 'Sigalli Libreville Centre', location: 'Boulevard Triomphal, Libreville', city: 'Libreville', latitude: 0.3924, longitude: 9.4536, isActive: true },
  { id: 'ST002', name: 'Sigalli Oloumi', location: 'Quartier Oloumi, Libreville', city: 'Libreville', latitude: 0.3750, longitude: 9.4380, isActive: true },
  { id: 'ST003', name: 'Sigalli Owendo', location: 'Zone Industrielle, Owendo', city: 'Owendo', latitude: 0.2970, longitude: 9.5000, isActive: true },
  { id: 'ST004', name: 'Sigalli Akanda', location: 'Cap Estérias, Akanda', city: 'Akanda', latitude: 0.4810, longitude: 9.4350, isActive: true },
  { id: 'ST005', name: 'Sigalli Port-Gentil', location: 'Centre-Ville, Port-Gentil', city: 'Port-Gentil', latitude: -0.7193, longitude: 8.7815, isActive: true },
  { id: 'ST006', name: 'Sigalli Franceville', location: 'Avenue du Commerce, Franceville', city: 'Franceville', latitude: -1.6333, longitude: 13.5833, isActive: true },
  { id: 'ST007', name: 'Sigalli Lambaréné', location: 'Centre-Ville, Lambaréné', city: 'Lambaréné', latitude: -0.7000, longitude: 10.2333, isActive: true },
  { id: 'ST008', name: 'Sigalli Moanda', location: 'Quartier Commercial, Moanda', city: 'Moanda', latitude: -1.5667, longitude: 13.2000, isActive: true },
  { id: 'ST009', name: 'Sigalli Oyem', location: 'Centre-Ville, Oyem', city: 'Oyem', latitude: 1.6167, longitude: 11.5833, isActive: true },
  { id: 'ST010', name: 'Sigalli Ntoum', location: 'Route Nationale, Ntoum', city: 'Ntoum', latitude: 0.3900, longitude: 9.7600, isActive: false },
];

// ============================================================
// MOCK SALES DATA - Monthly revenue data
// ============================================================

const months = [
  'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024',
  'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025',
];

export const monthlyRevenue: { month: string; revenue: number }[] = [
  { month: 'Jul 2024', revenue: 12500000 },
  { month: 'Aug 2024', revenue: 14200000 },
  { month: 'Sep 2024', revenue: 16800000 },
  { month: 'Oct 2024', revenue: 28500000 },
  { month: 'Nov 2024', revenue: 32100000 },
  { month: 'Dec 2024', revenue: 27600000 },
  { month: 'Jan 2025', revenue: 25400000 },
  { month: 'Feb 2025', revenue: 24800000 },
  { month: 'Mar 2025', revenue: 22100000 },
  { month: 'Apr 2025', revenue: 19800000 },
  { month: 'May 2025', revenue: 17500000 },
  { month: 'Jun 2025', revenue: 15200000 },
];

export const revenueByCategory: { category: ProductCategory; revenue: number; percentage: number }[] = [
  { category: 'Boissons', revenue: 145800000, percentage: 52 },
  { category: 'Produits Laitiers', revenue: 89200000, percentage: 32 },
  { category: 'Fromages', revenue: 44600000, percentage: 16 },
];

export const topProducts = [
  { name: 'World Cola 1.5L', revenue: 28500000, quantity: 28500 },
  { name: 'Candia Lait Entier 1L', revenue: 22400000, quantity: 14933 },
  { name: 'Djino Cocktail 1.5L', revenue: 18600000, quantity: 15500 },
  { name: 'La Vache Qui Rit 16p', revenue: 16800000, quantity: 4000 },
  { name: 'Tampico Citrus 1L', revenue: 15200000, quantity: 10133 },
];

export const revenueByStore = [
  { storeName: 'Sigalli Libreville Centre', revenue: 68500000 },
  { storeName: 'Sigalli Port-Gentil', revenue: 42300000 },
  { storeName: 'Sigalli Oloumi', revenue: 38700000 },
  { storeName: 'Sigalli Owendo', revenue: 32100000 },
  { storeName: 'Sigalli Franceville', revenue: 28400000 },
  { storeName: 'Sigalli Akanda', revenue: 22800000 },
  { storeName: 'Sigalli Lambaréné', revenue: 18600000 },
  { storeName: 'Sigalli Moanda', revenue: 14200000 },
  { storeName: 'Sigalli Oyem', revenue: 10800000 },
  { storeName: 'Sigalli Ntoum', revenue: 3100000 },
];

export const dailyRevenue = [
  { day: '6 Jun', products: { WORLDCOLA: 0, DJINO: 0, AKEWA: 974100, TAMPICO: 0, YOPLAIT: 0 } },
  { day: '7 Jun', products: { WORLDCOLA: 0, DJINO: 0, AKEWA: 0, TAMPICO: 0, YOPLAIT: 0 } },
  { day: '8 Jun', products: { WORLDCOLA: 0, DJINO: 0, AKEWA: 0, TAMPICO: 0, YOPLAIT: 0 } },
  { day: '9 Jun', products: { WORLDCOLA: 1600000, DJINO: 0, AKEWA: 0, TAMPICO: 0, YOPLAIT: 0 } },
  { day: '10 Jun', products: { WORLDCOLA: 2100000, DJINO: 500000, AKEWA: 300000, TAMPICO: 200000, YOPLAIT: 0 } },
  { day: '11 Jun', products: { WORLDCOLA: 1900000, DJINO: 600000, AKEWA: 400000, TAMPICO: 350000, YOPLAIT: 250000 } },
  { day: '12 Jun', products: { WORLDCOLA: 2100000, DJINO: 800000, AKEWA: 500000, TAMPICO: 400000, YOPLAIT: 300000 } },
  { day: '13 Jun', products: { WORLDCOLA: 2100000, DJINO: 700000, AKEWA: 450000, TAMPICO: 380000, YOPLAIT: 280000 } },
  { day: '14 Jun', products: { WORLDCOLA: 0, DJINO: 0, AKEWA: 0, TAMPICO: 0, YOPLAIT: 0 } },
  { day: '15 Jun', products: { WORLDCOLA: 0, DJINO: 0, AKEWA: 0, TAMPICO: 0, YOPLAIT: 0 } },
  { day: '16 Jun', products: { WORLDCOLA: 1800000, DJINO: 400000, AKEWA: 350000, TAMPICO: 300000, YOPLAIT: 200000 } },
];

export const recentTransactions: Transaction[] = [
  { id: 'TX001', date: '2025-06-16 14:32', productName: 'World Cola 1.5L', storeName: 'Sigalli Libreville Centre', quantity: 48, amount: 48000, type: 'sale' },
  { id: 'TX002', date: '2025-06-16 14:15', productName: 'Candia Lait Entier 1L', storeName: 'Sigalli Libreville Centre', quantity: 24, amount: 36000, type: 'sale' },
  { id: 'TX003', date: '2025-06-16 13:58', productName: 'La Vache Qui Rit 16p', storeName: 'Sigalli Oloumi', quantity: 12, amount: 50400, type: 'sale' },
  { id: 'TX004', date: '2025-06-16 13:40', productName: 'Tampico Citrus 1L', storeName: 'Sigalli Port-Gentil', quantity: 36, amount: 54000, type: 'sale' },
  { id: 'TX005', date: '2025-06-16 13:22', productName: 'Djino Cocktail 1.5L', storeName: 'Sigalli Owendo', quantity: 24, amount: 28800, type: 'sale' },
  { id: 'TX006', date: '2025-06-16 12:55', productName: 'Yoplait Yaourt Vanille 125g', storeName: 'Sigalli Akanda', quantity: 60, amount: 48000, type: 'sale' },
  { id: 'TX007', date: '2025-06-16 12:30', productName: 'Babybel Original 5p', storeName: 'Sigalli Franceville', quantity: 18, amount: 63000, type: 'sale' },
  { id: 'TX008', date: '2025-06-16 12:10', productName: 'Akewa Eau Minérale 1.5L', storeName: 'Sigalli Libreville Centre', quantity: 120, amount: 48000, type: 'sale' },
  { id: 'TX009', date: '2025-06-16 11:45', productName: 'Orangina 33cl', storeName: 'Sigalli Lambaréné', quantity: 48, amount: 43200, type: 'sale' },
  { id: 'TX010', date: '2025-06-16 11:20', productName: 'Kiri 12 portions', storeName: 'Sigalli Port-Gentil', quantity: 6, amount: 28800, type: 'sale' },
  { id: 'TX011', date: '2025-06-16 10:58', productName: 'Candia Candy\'Up Chocolat', storeName: 'Sigalli Moanda', quantity: 48, amount: 24000, type: 'sale' },
  { id: 'TX012', date: '2025-06-16 10:30', productName: 'World Cola 50cl', storeName: 'Sigalli Oyem', quantity: 96, amount: 48000, type: 'sale' },
  { id: 'TX013', date: '2025-06-16 10:05', productName: 'Sumol Ananas 33cl', storeName: 'Sigalli Oloumi', quantity: 36, amount: 28800, type: 'sale' },
  { id: 'TX014', date: '2025-06-15 16:45', productName: 'Top Orange 1L', storeName: 'Sigalli Libreville Centre', quantity: 24, amount: 26400, type: 'sale' },
  { id: 'TX015', date: '2025-06-15 16:20', productName: 'Yoplait Yop Vanille 250ml', storeName: 'Sigalli Owendo', quantity: 36, amount: 43200, type: 'sale' },
];

export const dashboardStats: DashboardStats = {
  totalRevenue: 279600000,
  totalProducts: products.length,
  totalStores: stores.filter(s => s.isActive).length,
  totalOrders: 4297,
  revenueGrowth: 12.5,
  topProducts,
  revenueByMonth: monthlyRevenue,
  revenueByCategory,
  revenueByStore,
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M FCFA`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K FCFA`;
  }
  return `${amount} FCFA`;
};

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
