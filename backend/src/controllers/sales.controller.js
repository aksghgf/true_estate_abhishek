import { getSalesData, getFilterOptions } from '../services/sales.service.js';
import { validateQuery } from '../utils/validation.js';

/**
 * Controller for GET /api/sales
 */
export async function getAllSales(req, res) {
  try {
    // Validate query parameters
    const validatedQuery = validateQuery(req.query);

    // Get sales data with filters
    const result = getSalesData(validatedQuery);

    // Return response
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error in getAllSales:', error);
    
    // Handle validation errors
    if (error.message.includes('Validation Error')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

/**
 * Controller for GET /api/sales/filter-options
 */
export async function getFilters(req, res) {
  try {
    const options = getFilterOptions();
    
    res.status(200).json({
      success: true,
      data: options
    });
  } catch (error) {
    console.error('Error in getFilters:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
