import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';

export function useProducts() {
  const { data: products = [], ...rest } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return { products, ...rest };
}
