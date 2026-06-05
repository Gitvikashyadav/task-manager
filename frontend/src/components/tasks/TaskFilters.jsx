import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

const PRIORITIES = [
  { label: 'All Priority', value: '' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

const SORTS = [
  { label: 'Newest', value: 'createdAt:desc' },
  { label: 'Oldest', value: 'createdAt:asc' },
  { label: 'Title A–Z', value: 'title:asc' },
  { label: 'Due Date', value: 'dueDate:asc' },
];

export default function TaskFilters({ filters, onSearch, onFilter }) {
  const [searchVal, setSearchVal] = useState(filters.search || '');

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchVal('');
    onSearch('');
  };

  const handleSort = (val) => {
    const [sortBy, sortOrder] = val.split(':');
    onFilter('sortBy', sortBy);
    onFilter('sortOrder', sortOrder);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={searchVal}
          onChange={handleSearch}
          placeholder="Search tasks..."
          className="input pl-10 pr-8"
        />
        {searchVal && (
          <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Priority filter */}
      <select
        value={filters.priority}
        onChange={(e) => onFilter('priority', e.target.value)}
        className="input w-full sm:w-40 cursor-pointer appearance-none"
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={`${filters.sortBy}:${filters.sortOrder}`}
        onChange={(e) => handleSort(e.target.value)}
        className="input w-full sm:w-40 cursor-pointer appearance-none"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  );
}