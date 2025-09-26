import { useState, useEffect, useCallback } from 'react';
import { productsAPI } from '@/lib/api';

export interface Product {
  _id: string;
  name: string;
  category: 'chicken' | 'mutton' | 'natukodi' | 'other';
  price: number;
  description?: string;
  image?: string;
  isAvailable: boolean;
  isSpecialOffer: boolean;
  offerPrice?: number;
  offerValidUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceData {
  chicken: { current: number; previous: number; };
  mutton: { current: number; previous: number; };
  natukodi: { current: number; previous: number; };
  lastUpdated: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    try {
      const updatedProduct = await productsAPI.update(id, productData);
      setProducts(prev => prev.map(p => p._id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      throw err;
    }
  }, []);

  const getPriceData = useCallback((): PriceData => {
    const priceMap: { [key: string]: Product } = {};
    products.forEach(product => {
      priceMap[product.category] = product;
    });

    const getPrice = (category: string) => {
      const product = priceMap[category];
      if (!product) {
        // Default prices if product not found
        const defaults: { [key: string]: number } = {
          chicken: 300,
          mutton: 680,
          natukodi: 380
        };
        return defaults[category] || 0;
      }

      // Check if there's a special offer
      if (product.isSpecialOffer && product.offerPrice && product.offerValidUntil) {
        const validUntil = new Date(product.offerValidUntil);
        if (validUntil > new Date()) {
          return product.offerPrice;
        }
      }

      return product.price;
    };

    // For previous prices, we'll use a simple approach - subtract 10-20 rupees for demo
    const getPreviousPrice = (current: number) => {
      return Math.max(current - Math.floor(Math.random() * 20 + 10), current * 0.9);
    };

    const chickenPrice = getPrice('chicken');
    const muttonPrice = getPrice('mutton');
    const natukodiPrice = getPrice('natukodi');

    return {
      chicken: {
        current: chickenPrice,
        previous: Math.floor(getPreviousPrice(chickenPrice))
      },
      mutton: {
        current: muttonPrice,
        previous: Math.floor(getPreviousPrice(muttonPrice))
      },
      natukodi: {
        current: natukodiPrice,
        previous: Math.floor(getPreviousPrice(natukodiPrice))
      },
      lastUpdated: new Date().toLocaleDateString('en-IN')
    };
  }, [products]);

  useEffect(() => {
    fetchProducts();
    
    // Set up polling for real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchProducts();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    updateProduct,
    getPriceData
  };
};
