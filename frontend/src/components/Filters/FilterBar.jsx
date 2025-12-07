import MultiSelectDropdown from './MultiSelectDropdown';
import AgeRangeFilter from './AgeRangeFilter';
import SortDropdown from './SortDropdown';
import useFilterStore from '../../stores/filterStore';
import useFilterOptions from '../../hooks/useFilterOptions';
import { RefreshCw } from 'lucide-react';

export default function FilterBar() {
  const {
    regions,
    gender,
    ageMin,
    ageMax,
    categories,
    tags,
    payment,
    sort,
    setRegions,
    setGender,
    setAgeRange,
    setCategories,
    setTags,
    setPayment,
    setSort,
  } = useFilterStore();

  const { data: filterOptions, isLoading } = useFilterOptions();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-lg border border-gray-200">
        <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
        <span className="text-sm text-gray-500">Loading filters...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      <MultiSelectDropdown
        label="Customer Region"
        options={filterOptions?.regions || []}
        value={regions}
        onChange={setRegions}
      />

      <MultiSelectDropdown
        label="Gender"
        options={filterOptions?.genders || []}
        value={gender ? [gender] : []}
        onChange={(value) => setGender(value[0] || '')}
      />

      <AgeRangeFilter
        ageMin={ageMin}
        ageMax={ageMax}
        onChange={setAgeRange}
      />

      <MultiSelectDropdown
        label="Product Category"
        options={filterOptions?.categories || []}
        value={categories}
        onChange={setCategories}
      />

      <MultiSelectDropdown
        label="Tags"
        options={filterOptions?.tags || []}
        value={tags}
        onChange={setTags}
      />

      <MultiSelectDropdown
        label="Payment Method"
        options={filterOptions?.paymentMethods || []}
        value={payment}
        onChange={setPayment}
      />

      {/* Date - Simplified for now */}
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-sm text-gray-700">Date</span>
      </button>

      <div className="ml-auto">
        <SortDropdown value={sort} onChange={setSort} />
      </div>
    </div>
  );
}
