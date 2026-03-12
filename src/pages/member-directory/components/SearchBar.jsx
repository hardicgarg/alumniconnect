import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const AUTOCOMPLETE_SUGGESTIONS = [
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim',
  'Jessica Park', 'Ryan Thompson', 'Amanda Foster', 'Kevin Patel',
  'Google', 'Meta', 'Apple', 'Microsoft', 'Stripe',
  'Product Manager', 'Software Engineer', 'UX Designer', 'Data Scientist',
];

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value?.trim()?.length > 1) {
      const filtered = AUTOCOMPLETE_SUGGESTIONS?.filter(s =>
        s?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef?.current && !containerRef?.current?.contains(e?.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = focused && suggestions?.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={`flex items-center gap-3 px-4 py-3 bg-[var(--color-card)] border rounded-2xl transition-all duration-200 ${
        focused ? 'border-[var(--color-primary)] shadow-md' : 'border-[var(--color-border)]'
      }`} style={{ boxShadow: focused ? '0 0 0 3px rgba(232,197,71,0.15)' : 'var(--shadow-sm)' }}>
        <Icon name="Search" size={18} color="var(--color-text-secondary)" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search alumni by name, company, role, or location..."
          className="flex-1 bg-transparent text-sm md:text-base text-[var(--color-foreground)] placeholder:text-[var(--color-text-secondary)] outline-none border-none"
        />
        {value && (
          <button
            onClick={() => { onChange(''); inputRef?.current?.focus(); }}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <Icon name="X" size={16} color="currentColor" />
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden z-20" style={{ boxShadow: 'var(--shadow-lg)' }}>
          {suggestions?.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { onChange(s); setFocused(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
            >
              <Icon name="Search" size={14} color="var(--color-text-secondary)" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}