# TruEstate - Retail Sales Management System

🚀 **[Live Demo](https://true-estate-abhishek-frontend.vercel.app/)** | 📊 **[Backend API](https://true-estate-abhishek.onrender.com)**

A modern, full-stack enterprise sales management dashboard with advanced filtering, search, sorting, and real-time analytics capabilities. Built for the SDE Intern Assignment.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **JOI** - Query parameter validation
- **CSV Parser** - Data ingestion from CSV files
- **In-memory Database** - Fast data access and filtering

### Frontend
- **React 18** + **Vite** - Modern UI framework with fast build tooling
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **Axios** - HTTP client
- **Lucide Icons** - Beautiful icon library

## 📋 Features

### Search Implementation
- **Full-text search** across customer name and phone number fields
- **Case-insensitive** matching with normalized text comparison
- **300ms debounce** on frontend to optimize API calls
- **Backend processing** - All search logic executed server-side
- Works seamlessly with active filters and sorting

### Filtering Implementation
The system supports comprehensive multi-dimensional filtering:
- **Customer Region** - Multi-select dropdown
- **Gender** - Single select (Male/Female)
- **Age Range** - Minimum and maximum age filters
- **Product Category** - Multi-select from available categories
- **Tags** - Multi-select tag-based filtering with auto-suggestions
- **Payment Method** - Multi-select payment type filtering
- **Date Range** - Filter transactions between specific dates

All filters are:
- Processed entirely on the backend for consistency
- Combined using AND logic (all conditions must match)
- Persisted across pagination
- Handled by a single reusable `applyQueryFilters()` utility function

### Sorting Implementation
Three sorting options available:
1. **Date (Newest First)** - Default, sorts by transaction date descending
2. **Quantity** - Sorts by product quantity
3. **Customer Name (A-Z)** - Alphabetical sorting by customer name

Sorting is:
- Applied after filtering, before pagination
- Maintained across filter changes
- Implemented server-side via `applySorting()` utility

### Pagination Implementation
- **10 items per page** - Fixed page size for consistent UX
- **Page state persistence** - Current page maintained when changing sort  
- **Reset to page 1** - When filters or search terms change
- **Smart navigation** - Previous/Next buttons with disabled states
- **Page number display** - Shows current page and total pages
- **Backend-controlled** - Pagination logic in `applyPagination()` utility

Returns metadata:
```json
{
  "totalItems": 100,
  "totalPages": 10,
  "currentPage": 1,
  "pageSize": 10
}
```

## 🎯 Unique Features

1. **Smart Insights Dashboard** - Real-time summary cards showing:
   - Total Units Sold (with filter-aware calculations)
   - Total Amount (with per-unit average)
   - Total Discount (with percentage)

2. **Optimized Architecture** - Clean separation of concerns:
   - Controllers handle HTTP requests
   - Services contain business logic
   - Utilities provide reusable functions
   - Models manage data access

3. **Professional Data Pipeline** - CSV ingestion with:
   - Schema validation
   - Field normalization
   - Error handling
   - Automatic unique value extraction for filters

4. **State Management** - Zustand for global filter state with:
   - Automatic API refetch on state changes
   - React Query caching for performance
   - Optimistic UI updates

## 📦 Project Structure

```
truestate-sales-management/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API endpoints
│   │   ├── utils/            # Helper functions
│   │   ├── models/           # Database models
│   │   └── index.js          # Server entry point
│   ├── data/
│   │   └── sales.csv         # Sales dataset
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── stores/           # Zustand stores
│   │   ├── utils/            # Utilities
│   │   ├── App.jsx           # Main component
│   │   └── main.jsx          # Entry point
│   └── package.json
├── docs/
│   └── architecture.md       # System architecture
└── README.md                 # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd True_Estate
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```

   This will install dependencies for both backend and frontend using npm workspaces.

3. **Start the backend server**
   ```bash
   npm run dev:backend
   ```
   Backend runs on `http://localhost:5000`

4. **Start the frontend development server** (in a new terminal)
   ```bash
   npm run dev:frontend
   ```
   Frontend runs on `http://localhost:3000`

5. **Or run both concurrently**
   ```bash
   npm run dev
   ```

### Environment Configuration

Backend uses environment variables (already configured in `.env`):
```
PORT=5000
NODE_ENV=development
```

## 📡 API Endpoints

### GET `/api/sales`
Fetch sales data with filtering, sorting, and pagination.

**Query Parameters:**
- `search` - Search by customer name or phone
- `regions` - Comma-separated list of regions
- `gender` - Filter by gender
- `ageMin` / `ageMax` - Age range
- `categories` - Comma-separated categories
- `tags` - Comma-separated tags
- `payment` - Comma-separated payment methods
- `dateFrom` / `dateTo` - Date range (YYYY-MM-DD)
- `sort` - Sort field (date, quantity, customerName)
- `page` - Page number

**Response:**
```json
{
  "success": true,
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

### GET `/api/sales/filter-options`
Get unique values for filter dropdowns.

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": ["East", "West", "North", "South"],
    "genders": ["Male", "Female"],
    "categories": ["Beauty", "Electronics", "Clothing"],
    "tags": ["organic", "portable", "fashion"],
    "paymentMethods": ["UPI", "Credit Card", "Cash", "Net Banking", "Wallet"]
  }
}
```

## 🏗️ Architecture

See [docs/architecture.md](./docs/architecture.md) for detailed architecture documentation including:
- System architecture diagram
- Backend module responsibilities
- Frontend component hierarchy
- Data flow
- API contracts

## 📝 Development Notes

- **CSV Data**: The system uses `backend/data/truestate_assignment_dataset.csv`.
- **Port Configuration**: Backend uses port 5000, frontend uses port 3000. Vite proxy handles API requests.
- **Hot Reload**: Both frontend and backend support hot reload during development.

## 🎨 UI Design

The frontend UI is designed to match modern enterprise dashboard standards with:
- Clean, professional aesthetic
- Responsive layout
- Loading states
- Empty states
- Error handling
- Smooth transitions

## 🚀 Deployment

For production deployment instructions, see the comprehensive [Deployment Guide](./docs/DEPLOYMENT.md).

**Quick Deploy Options:**
- **Full Stack (Easiest)**: Deploy to Vercel with one command
- **Backend**: Railway, Render, or Heroku
- **Frontend**: Vercel, Netlify, or Cloudflare Pages

**Test Production Build Locally:**
```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
npm run preview
```

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed platform-specific instructions.

---

**Built by:** Abhishek Tiwari 
**Assignment:** SDE Intern - TruEstate Sales Management System
