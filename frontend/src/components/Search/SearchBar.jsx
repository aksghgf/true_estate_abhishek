import { useState } from 'react';
import { Search, X } from 'lucide-react';
import useFilterStore from '../../stores/filterStore';
import useDebounce from '../../hooks/useDebounce';

export default function SearchBar() {
  const { setSearch } = useFilterStore();
  const [localSearch, setLocalSearch] = useState('');
  
  // Debounce search to avoid too many API calls
  useDebounce(localSearch, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearch(value);
  };

  const handleClear = () => {
    setLocalSearch('');
    setSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={localSearch}
        onChange={handleChange}
        placeholder="Name, Phone no."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
      />
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
