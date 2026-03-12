import React, { useState } from 'react';
import Icon from 'components/AppIcon';


const FILTER_OPTIONS = {
  batch: [
    { value: '', label: 'All Batches' },
    { value: '2024', label: 'Class of 2024' },
    { value: '2023', label: 'Class of 2023' },
    { value: '2022', label: 'Class of 2022' },
    { value: '2021', label: 'Class of 2021' },
    { value: '2020', label: 'Class of 2020' },
    { value: '2019', label: 'Class of 2019' },
    { value: '2018', label: 'Class of 2018' },
    { value: '2017', label: 'Class of 2017' },
    { value: '2016', label: 'Class of 2016' },
    { value: '2015', label: 'Class of 2015' },
    { value: '2014', label: 'Class of 2014' },
    { value: '2013', label: 'Class of 2013' },
    { value: '2012', label: 'Class of 2012' },
    { value: '2010', label: 'Class of 2010' },
  ],
  location: [
    { value: '', label: 'All Locations' },
    { value: 'San Francisco, CA', label: 'San Francisco, CA' },
    { value: 'New York, NY', label: 'New York, NY' },
    { value: 'Austin, TX', label: 'Austin, TX' },
    { value: 'Seattle, WA', label: 'Seattle, WA' },
    { value: 'Boston, MA', label: 'Boston, MA' },
    { value: 'Chicago, IL', label: 'Chicago, IL' },
    { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
    { value: 'Denver, CO', label: 'Denver, CO' },
    { value: 'Miami, FL', label: 'Miami, FL' },
    { value: 'Remote', label: 'Remote' },
  ],
  industry: [
    { value: '', label: 'All Industries' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Design', label: 'Design' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Media', label: 'Media' },
  ],
  company: [
    { value: '', label: 'All Companies' },
    { value: 'Google', label: 'Google' },
    { value: 'Meta', label: 'Meta' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Microsoft', label: 'Microsoft' },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Stripe', label: 'Stripe' },
    { value: 'Airbnb', label: 'Airbnb' },
    { value: 'Salesforce', label: 'Salesforce' },
    { value: 'Goldman Sachs', label: 'Goldman Sachs' },
    { value: 'McKinsey', label: 'McKinsey' },
    { value: 'Deloitte', label: 'Deloitte' },
  ],
  function: [
    { value: '', label: 'All Functions' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Product', label: 'Product' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'HR', label: 'HR' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Data Science', label: 'Data Science' },
  ],
  chapter: [
    { value: '', label: 'All Chapters' },
    { value: 'SF Bay Area', label: 'SF Bay Area' },
    { value: 'New York', label: 'New York' },
    { value: 'Austin', label: 'Austin' },
    { value: 'Seattle', label: 'Seattle' },
    { value: 'Boston', label: 'Boston' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Denver', label: 'Denver' },
  ],
};

const FILTER_LABELS = {
  batch: 'Batch',
  location: 'Location',
  industry: 'Industry',
  company: 'Company',
  function: 'Function',
  chapter: 'Chapter',
};

export default function FilterToolbar({ filters, onFilterChange, onClearAll, resultCount, totalCount }) {
  const [expandedDropdown, setExpandedDropdown] = useState(null);

  const activeFilters = Object.entries(filters)?.filter(([, v]) => v !== '');

  const handleSelect = (key, value) => {
    onFilterChange(key, value);
    setExpandedDropdown(null);
  };

  const getLabel = (key, value) => {
    const opt = FILTER_OPTIONS?.[key]?.find(o => o?.value === value);
    return opt ? opt?.label : value;
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-3 sm:p-4 md:p-5 mb-4 md:mb-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Filter Row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide items-center">
        <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] flex-shrink-0">
          <Icon name="SlidersHorizontal" size={15} color="currentColor" />
          <span className="hidden sm:inline text-xs">Filters</span>
        </div>
        {Object.keys(FILTER_OPTIONS)?.map((key) => (
          <div key={key} className="relative flex-shrink-0">
            <button
              onClick={() => setExpandedDropdown(expandedDropdown === key ? null : key)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-200 whitespace-nowrap ${
                filters?.[key]
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                  : 'border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-foreground)]'
              }`}
            >
              {filters?.[key] ? getLabel(key, filters?.[key]) : FILTER_LABELS?.[key]}
              <Icon name="ChevronDown" size={12} color="currentColor" className={`transition-transform duration-200 ${expandedDropdown === key ? 'rotate-180' : ''}`} />
            </button>
            {expandedDropdown === key && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setExpandedDropdown(null)} />
                <div className="absolute top-full left-0 mt-1 w-44 sm:w-48 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden z-20 max-h-52 overflow-y-auto" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  {FILTER_OPTIONS?.[key]?.map((opt) => (
                    <button
                      key={opt?.value}
                      onClick={() => handleSelect(key, opt?.value)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors duration-150 ${
                        filters?.[key] === opt?.value
                          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium'
                          : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                      }`}
                    >
                      {opt?.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
        {activeFilters?.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-[var(--color-destructive)] hover:bg-red-50 transition-colors duration-150 border border-transparent hover:border-red-200 flex-shrink-0"
          >
            <Icon name="X" size={12} color="currentColor" />
            <span className="hidden sm:inline">Clear all</span>
          </button>
        )}
      </div>
      {/* Active Filter Chips + Result Count */}
      {(activeFilters?.length > 0 || true) && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[var(--color-border)]">
          <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            Showing <span className="font-semibold text-[var(--color-foreground)]">{resultCount}</span> of <span className="font-semibold text-[var(--color-foreground)]">{totalCount}</span> alumni
          </span>
          {activeFilters?.map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]"
            >
              <span className="text-[var(--color-text-secondary)] hidden sm:inline">{FILTER_LABELS?.[key]}:</span>
              <span className="truncate max-w-[80px]">{getLabel(key, value)}</span>
              <button
                onClick={() => onFilterChange(key, '')}
                className="ml-0.5 hover:text-[var(--color-destructive)] transition-colors flex-shrink-0"
              >
                <Icon name="X" size={11} color="currentColor" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}