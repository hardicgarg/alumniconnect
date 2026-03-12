import React from 'react';
import Icon from 'components/AppIcon';


const LOCATIONS = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA', 'Remote'];
const COMPANIES = ['All Companies', 'Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Stripe', 'Airbnb', 'Uber', 'Netflix'];
const FUNCTIONS = ['All Functions', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'Operations', 'HR', 'Legal'];
const EXPERIENCE = ['All Levels', 'Entry Level (0-2 yrs)', 'Mid Level (3-5 yrs)', 'Senior (6-9 yrs)', 'Lead/Principal (10+ yrs)', 'Executive'];
const WORK_TYPE = ['All Types', 'Remote', 'On-site', 'Hybrid'];

export default function JobFilters({ filters, onFilterChange, onClearAll, activeFilterCount }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={16} color="var(--color-text-secondary)" />
          <span className="text-sm font-medium text-foreground">Filters</span>
          {activeFilterCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={onClearAll} className="text-xs text-text-secondary hover:text-foreground transition-colors">
            Clear all
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { key: 'location', label: 'Location', options: LOCATIONS, icon: 'MapPin' },
          { key: 'company', label: 'Company', options: COMPANIES, icon: 'Building2' },
          { key: 'function', label: 'Function', options: FUNCTIONS, icon: 'Briefcase' },
          { key: 'experience', label: 'Experience', options: EXPERIENCE, icon: 'TrendingUp' },
          { key: 'workType', label: 'Work Type', options: WORK_TYPE, icon: 'Laptop' },
        ]?.map(({ key, label, options, icon }) => (
          <div key={key} className="relative">
            <label className="block text-xs text-text-secondary mb-1 font-medium">{label}</label>
            <div className="relative">
              <Icon name={icon} size={14} color="var(--color-text-secondary)" className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters?.[key]}
                onChange={(e) => onFilterChange(key, e?.target?.value)}
                className="w-full pl-8 pr-7 py-2 text-sm rounded-lg border border-border bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <Icon name="ChevronDown" size={12} color="var(--color-text-secondary)" className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
      {/* Alumni Posted Toggle */}
      <div className="mt-3 pt-3 border-t border-border flex items-center gap-3">
        <button
          onClick={() => onFilterChange('alumniOnly', !filters?.alumniOnly)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
            filters?.alumniOnly
              ? 'border-transparent text-primary-foreground'
              : 'border-border text-text-secondary hover:border-foreground hover:text-foreground'
          }`}
          style={filters?.alumniOnly ? { background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' } : {}}
        >
          <Icon name="GraduationCap" size={12} color="currentColor" />
          Alumni Posted Only
        </button>
        <button
          onClick={() => onFilterChange('savedOnly', !filters?.savedOnly)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
            filters?.savedOnly
              ? 'border-transparent' :'border-border text-text-secondary hover:border-foreground hover:text-foreground'
          }`}
          style={filters?.savedOnly ? { background: 'var(--color-accent)', color: '#fff' } : {}}
        >
          <Icon name="Bookmark" size={12} color="currentColor" />
          Saved Jobs
        </button>
      </div>
    </div>
  );
}