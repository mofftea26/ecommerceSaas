import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../services/api';

export function useProduct(id: number) {
  const { data: product, ...rest } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  return { product, ...rest };
}
