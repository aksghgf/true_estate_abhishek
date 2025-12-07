import AppHeader from './components/Layout/AppHeader';
import SearchBar from './components/Search/SearchBar';
import FilterBar from './components/Filters/FilterBar';
import InsightsCards from './components/Insights/InsightsCards';
import DataTable from './components/Table/DataTable';
import TableSkeleton from './components/Table/TableSkeleton';
import EmptyState from './components/Table/EmptyState';
import Pagination from './components/Pagination/Pagination';
import useSalesData from './hooks/useSalesData';
import { AlertCircle } from 'lucide-react';

function App() {
  const { data, isLoading, error } = useSalesData();

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Filters & Sort */}
        <FilterBar />

        {/* Error State */}
        {error && (
          <div className="card p-6 mb-6 border-red-200 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-900 mb-1">
                  Error loading data
                </h3>
                <p className="text-sm text-red-700">
                  {error.message || 'Something went wrong. Please try again.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Insights Cards */}
        {!isLoading && data?.insights && (
          <InsightsCards insights={data.insights} />
        )}

        {/* Data Table */}
        {isLoading ? (
          <TableSkeleton />
        ) : data?.data && data.data.length > 0 ? (
          <>
            <DataTable data={data.data} />
            <Pagination meta={data.meta} />
          </>
        ) : (
          <div className="card">
            <EmptyState />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
