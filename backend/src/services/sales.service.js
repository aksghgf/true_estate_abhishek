import { db } from '../models/database.js';
import { applyQueryFilters, applySorting, applyPagination } from '../utils/queryFilters.js';

/**
 * Get sales data with filters, sorting, and pagination
 */
export function getSalesData(filters) {
  // Get all sales data from database
  let data = db.getAllSales();

  // Parse comma-separated multi-select filters
  const parsedFilters = {
    ...filters,
    regions: filters.regions ? filters.regions.split(',').filter(Boolean) : [],
    categories: filters.categories ? filters.categories.split(',').filter(Boolean) : [],
    tags: filters.tags ? filters.tags.split(',').filter(Boolean) : [],
    payment: filters.payment ? filters.payment.split(',').filter(Boolean) : [],
  };

  // Apply filters
  data = applyQueryFilters(data, parsedFilters);

  // Apply sorting
  data = applySorting(data, filters.sort || 'date');

  // Calculate insights for filtered data
  const insights = calculateInsights(data);

  // Apply pagination
  const { paginatedData, totalItems, totalPages, currentPage, pageSize } = 
    applyPagination(data, filters.page, 10);

  return {
    data: paginatedData,
    meta: {
      totalItems,
      totalPages,
      currentPage,
      pageSize
    },
    insights
  };
}

/**
 * Calculate summary insights from data
 */
export function calculateInsights(data) {
  const totalUnits = data.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalAmount = data.reduce((sum, item) => sum + (item.total_amount || 0), 0);
  const totalDiscount = data.reduce((sum, item) => sum + (item.discount || 0), 0);

  return {
    totalUnits,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    totalDiscount: parseFloat(totalDiscount.toFixed(2))
  };
}

/**
 * Get filter options (unique values for dropdowns)
 */
export function getFilterOptions() {
  return {
    regions: db.getUniqueValues('regions'),
    genders: db.getUniqueValues('genders'),
    categories: db.getUniqueValues('categories'),
    tags: db.getUniqueValues('tags'),
    paymentMethods: db.getUniqueValues('paymentMethods'),
  };
}
