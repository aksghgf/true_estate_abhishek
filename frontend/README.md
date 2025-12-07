# TruEstate - Sales Management System Frontend

Modern, responsive sales management dashboard built with React and TailwindCSS.

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Zustand (State Management)
- React Query (Server State)
- Axios
- Lucide Icons

## Features

- **Advanced Filtering**: Multi-select filters for region, gender, category, tags, and payment method
- **Smart Search**: Debounced search across customer name and phone number
- **Flexible Sorting**: Sort by date, quantity, or customer name
- **Pagination**: Efficient navigation through large datasets
- **Real-time Insights**: Dynamic summary cards showing totals based on current filters
- **Responsive Design**: Works seamlessly across all device sizes

## Setup

```bash
npm install
npm run dev
```

App runs on http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── Layout/       # Header and layout components
│   ├── Search/       # Search bar with debounce
│   ├── Filters/      # Filter dropdowns and bar
│   ├── Insights/     # Summary cards
│   ├── Table/        # Data table and related components
│   └── Pagination/   # Pagination controls
├── hooks/            # Custom React hooks
├── services/         # API service layer
├── stores/           # Zustand stores
└── utils/            # Helper functions
```

## Development

The frontend communicates with the backend API on port 5000. Make sure the backend is running before starting the frontend dev server.
