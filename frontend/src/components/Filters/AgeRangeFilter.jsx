import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AgeRangeFilter({ ageMin, ageMax, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState(ageMin || '');
  const [maxValue, setMaxValue] = useState(ageMax || '');
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMinValue(ageMin || '');
    setMaxValue(ageMax || '');
  }, [ageMin, ageMax]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = () => {
    const min = minValue ? parseInt(minValue) : null;
    const max = maxValue ? parseInt(maxValue) : null;
    onChange(min, max);
    setIsOpen(false);
  };

  const handleClear = () => {
    setMinValue('');
    setMaxValue('');
    onChange(null, null);
    setIsOpen(false);
  };

  const hasValue = ageMin !== null || ageMax !== null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
          hasValue
            ? 'border-primary-500 bg-primary-50 text-primary-700'
            : 'border-gray-300 hover:bg-gray-50'
        }`}
      >
        <span className="text-sm font-medium">
          {hasValue 
            ? `Age: ${ageMin || '0'} – ${ageMax || '100+'}`
            : 'Age Range'}
        </span>
        {hasValue && (
          <span className="px-1.5 py-0.5 text-xs bg-primary-600 text-white rounded-full">
            1
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Min Age
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  placeholder="e.g., 18"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Max Age
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                  placeholder="e.g., 65"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleClear}
                className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
