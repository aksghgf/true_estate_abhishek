import express from 'express';
import { getAllSales, getFilters } from '../controllers/sales.controller.js';

const router = express.Router();

// GET /api/sales - Get sales data with filters, sorting, and pagination
router.get('/sales', getAllSales);

// GET /api/sales/filter-options - Get unique values for filter dropdowns
router.get('/sales/filter-options', getFilters);

export default router;
