# TruEstate Sales Management System - Backend

Backend API for TruEstate Retail Sales Management System.

## Tech Stack

- Node.js + Express.js
- JOI for validation
- CSV Parser for data ingestion
- In-memory database

## API Endpoints

### GET `/api/sales`

Query Parameters:
- `search` - Search by customer name or phone
- `regions` - Filter by customer regions (comma-separated)
- `gender` - Filter by gender (Male, Female)
- `ageMin` - Minimum age filter
- `ageMax` - Maximum age filter
- `categories` - Filter by product categories (comma-separated)
- `tags` - Filter by tags (comma-separated)
- `payment` - Filter by payment method (comma-separated)
- `dateFrom` - Start date filter (YYYY-MM-DD)
- `dateTo` - End date filter (YYYY-MM-DD)
- `sort` - Sort field (date, quantity, customerName)
- `page` - Page number (default: 1)

Response:
```json
{
  "data": [...],
  "meta": {
    "totalItems": 100,
    "totalPages": 10,
    "currentPage": 1,
    "pageSize": 10
  },
  "insights": {
    "totalUnits": 500,
    "totalAmount": 250000,
    "totalDiscount": 15000
  }
}
```

## Setup

```bash
npm install
npm run dev
```

Server runs on http://localhost:5000
