import { useQuery } from '@tanstack/react-query';
import { fetchFilterOptions } from '../services/salesService';

/**
 * Custom hook for fetching filter options
 */
export default function useFilterOptions() {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: fetchFilterOptions,
    staleTime: Infinity, // Options don't change frequently
  });
}
