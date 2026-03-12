import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const EVENT_TYPES = ['All Types', 'Networking', 'Workshop', 'Reunion', 'Webinar', 'Conference', 'Social'];
const CITIES = ['All Cities', 'San Francisco', 'New York', 'Chicago', 'Austin', 'Boston', 'Seattle', 'Remote'];
const DATE_RANGES = ['Any Date', 'This Week', 'This Month', 'Next 3 Months'];

export default function EventFilters({ filters, onChange, onClear, resultCount }) {
  const hasActive = filters?.type !== 'All Types' || filters?.city !== 'All Cities' || filters?.dateRange !== 'Any Date' || filters?.search;

  return (
    <div className="bg-card rounded-2xl border border-border p-4 md:p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Search */}
      <div className="relative mb-4">
        <Icon name="Search" size={16} color="var(--color-text-secondary)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search events..."
          value={filters?.search}
          onChange={e => onChange('search', e?.target?.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
        />
        {filters?.search && (
          <button onClick={() => onChange('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground">
            <Icon name="X" size={14} color="currentColor" />
          </button>
        )}
      </div>
      {/* Filter Row */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {/* Type */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs font-medium text-text-secondary">Event Type</label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {EVENT_TYPES?.map(t => (
              <button
                key={t}
                onClick={() => onChange('type', t)}
                className={`text-xs px-2.5 sm:px-3 py-1.5 rounded-full border transition-all font-medium whitespace-nowrap flex-shrink-0 ${filters?.type === t ? 'border-amber-400 text-amber-700' : 'border-border text-text-secondary hover:border-amber-300 hover:text-foreground'}`}
                style={filters?.type === t ? { background: 'var(--color-primary)', color: 'var(--color-primary-foreground)', borderColor: 'var(--color-primary)' } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Second row */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 items-end">
        {/* City */}
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <label className="text-xs font-medium text-text-secondary">Location</label>
          <select
            value={filters?.city}
            onChange={e => onChange('city', e?.target?.value)}
            className="text-sm px-3 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all w-full"
          >
            {CITIES?.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <label className="text-xs font-medium text-text-secondary">Date Range</label>
          <select
            value={filters?.dateRange}
            onChange={e => onChange('dateRange', e?.target?.value)}
            className="text-sm px-3 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all w-full"
          >
            {DATE_RANGES?.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Results + Clear */}
        <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto">
          <span className="text-sm text-text-secondary whitespace-nowrap">{resultCount} event{resultCount !== 1 ? 's' : ''}</span>
          {hasActive && (
            <Button variant="ghost" size="sm" iconName="X" iconPosition="left" onClick={onClear}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}