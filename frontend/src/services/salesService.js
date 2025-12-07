import api from './api';

/**
 * Fetch sales data with filters
 */
export async function fetchSalesData(filters) {
  const params = new URLSearchParams();
  
  // Add non-empty filters to params
  if (filters.search) params.append('search', filters.search);
  if (filters.regions?.length) params.append('regions', filters.regions.join(','));
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.ageMin !== null && filters.ageMin !== undefined) params.append('ageMin', filters.ageMin);
  if (filters.ageMax !== null && filters.ageMax !== undefined) params.append('ageMax', filters.ageMax);
  if (filters.categories?.length) params.append('categories', filters.categories.join(','));
  if (filters.tags?.length) params.append('tags', filters.tags.join(','));
  if (filters.payment?.length) params.append('payment', filters.payment.join(','));
  if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.append('dateTo', filters.dateTo);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page) params.append('page', filters.page);
  
  const response = await api.get(`/sales?${params.toString()}`);
  return response;
}

/**
 * Fetch filter options (unique values for dropdowns)
 */
export async function fetchFilterOptions() {
  const response = await api.get('/sales/filter-options');
  return response.data;
}
