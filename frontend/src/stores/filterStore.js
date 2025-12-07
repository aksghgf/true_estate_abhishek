import { create } from 'zustand';

/**
 * Global filter store using Zustand
 * Manages all filter state for the sales data
 */
const useFilterStore = create((set) => ({
  // Filter state
  search: '',
  regions: [],
  gender: '',
  ageMin: null,
  ageMax: null,
  categories: [],
  tags: [],
  payment: [],
  dateFrom: null,
  dateTo: null,
  sort: 'date',
  page: 1,

  // Actions
  setSearch: (search) => set({ search, page: 1 }),
  
  setRegions: (regions) => set({ regions, page: 1 }),
  
  setGender: (gender) => set({ gender, page: 1 }),
  
  setAgeRange: (ageMin, ageMax) => set({ ageMin, ageMax, page: 1 }),
  
  setCategories: (categories) => set({ categories, page: 1 }),
  
  setTags: (tags) => set({ tags, page: 1 }),
  
  setPayment: (payment) => set({ payment, page: 1 }),
  
  setDateRange: (dateFrom, dateTo) => set({ dateFrom, dateTo, page: 1 }),
  
  setSort: (sort) => set({ sort, page: 1 }),
  
  setPage: (page) => set({ page }),
  
  // Remove individual filter
  removeFilter: (filterKey) => set((state) => {
    const newState = { page: 1 };
    
    if (Array.isArray(state[filterKey])) {
      newState[filterKey] = [];
    } else if (filterKey === 'ageMin' || filterKey === 'ageMax') {
      newState.ageMin = null;
      newState.ageMax = null;
    } else if (filterKey === 'dateFrom' || filterKey === 'dateTo') {
      newState.dateFrom = null;
      newState.dateTo = null;
    } else {
      newState[filterKey] = '';
    }
    
    return newState;
  }),
  
  // Clear all filters
  clearAllFilters: () => set({
    search: '',
    regions: [],
    gender: '',
    ageMin: null,
    ageMax: null,
    categories: [],
    tags: [],
    payment: [],
    dateFrom: null,
    dateTo: null,
    page: 1,
  }),
}));

export default useFilterStore;
