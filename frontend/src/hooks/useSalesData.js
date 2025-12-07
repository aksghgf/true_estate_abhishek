import { useQuery } from '@tanstack/react-query';
import { fetchSalesData } from '../services/salesService';
import useFilterStore from '../stores/filterStore';

/**
 * Custom hook for fetching sales data with React Query
 */
export default function useSalesData() {
  const filters = useFilterStore((state) => ({
    search: state.search,
    regions: state.regions,
    gender: state.gender,
    ageMin: state.ageMin,
    ageMax: state.ageMax,
    categories: state.categories,
    tags: state.tags,
    payment: state.payment,
    dateFrom: state.dateFrom,
    dateTo: state.dateTo,
    sort: state.sort,
    page: state.page,
  }));

  return useQuery({
    queryKey: ['sales', filters],
    queryFn: () => fetchSalesData(filters),
    staleTime: 30000, // 30 seconds
    keepPreviousData: true,
  });
}
