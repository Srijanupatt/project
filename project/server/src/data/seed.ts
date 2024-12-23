import { Product } from '../types/product'

export const seedProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Camera',
    description: 'High-end digital camera for professional photography',
    price: 999.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    category: 'electronics',
    rating: 4.5,
    ratingsCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'electronics',
    rating: 4.3,
    ratingsCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'sports',
    rating: 4.7,
    ratingsCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]