/**
 * Apply all query filters to the dataset
 * This is the core filtering function that handles all filter logic in one place
 */
export function applyQueryFilters(data, filters) {
  let filteredData = [...data];

  // 1. Text Search (customer name or phone number)
  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim();
    filteredData = filteredData.filter(item => {
      const name = (item.customer_name || '').toLowerCase();
      const phone = (item.phone_number || '').toString().toLowerCase();
      return name.includes(searchTerm) || phone.includes(searchTerm);
    });
  }

  // 2. Customer Region Filter (multi-select)
  if (filters.regions && filters.regions.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.regions.includes(item.customer_region)
    );
  }

  // 3. Gender Filter
  if (filters.gender && filters.gender.trim()) {
    filteredData = filteredData.filter(item =>
      item.gender?.toLowerCase() === filters.gender.toLowerCase()
    );
  }

  // 4. Age Range Filter
  if (filters.ageMin !== undefined && filters.ageMin !== null) {
    filteredData = filteredData.filter(item => item.age >= filters.ageMin);
  }
  if (filters.ageMax !== undefined && filters.ageMax !== null) {
    filteredData = filteredData.filter(item => item.age <= filters.ageMax);
  }

  // 5. Product Category Filter (multi-select)
  if (filters.categories && filters.categories.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.categories.includes(item.product_category)
    );
  }

  // 6. Tags Filter (multi-select)
  if (filters.tags && filters.tags.length > 0) {
    filteredData = filteredData.filter(item => {
      const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : [];
      return filters.tags.some(tag => itemTags.includes(tag));
    });
  }

  // 7. Payment Method Filter (multi-select)
  if (filters.payment && filters.payment.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.payment.includes(item.payment_method)
    );
  }

  // 8. Date Range Filter
  if (filters.dateFrom) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.date);
      const fromDate = new Date(filters.dateFrom);
      return itemDate >= fromDate;
    });
  }
  if (filters.dateTo) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.date);
      const toDate = new Date(filters.dateTo);
      return itemDate <= toDate;
    });
  }

  return filteredData;
}

/**
 * Apply sorting to filtered data
 */
export function applySorting(data, sortBy) {
  if (!sortBy) return data;

  const sortedData = [...data];

  switch (sortBy) {
    case 'date':
      // Date descending (newest first)
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    
    case 'quantity':
      // Quantity descending
      sortedData.sort((a, b) => b.quantity - a.quantity);
      break;
    
    case 'customerName':
      // Customer name A-Z
      sortedData.sort((a, b) =>
        (a.customer_name || '').localeCompare(b.customer_name || '')
      );
      break;
    
    default:
      // Default: date descending
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return sortedData;
}

/**
 * Apply pagination to data
 */
export function applyPagination(data, page = 1, pageSize = 10) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    paginatedData: data.slice(startIndex, endIndex),
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    currentPage: page,
    pageSize
  };
}
