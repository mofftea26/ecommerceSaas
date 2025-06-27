import { useQuery } from '@tanstack/react-query';
import { fetchBranding } from '../services/api';

export function useBranding() {
  const { data: branding = {}, ...rest } = useQuery({
    queryKey: ['branding'],
    queryFn: fetchBranding,
  });

  return { branding, ...rest };
}
