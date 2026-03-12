import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const MOCK_SUGGESTIONS = [
  { type: 'member', label: 'Sarah Johnson', sub: 'Product Manager at Google', path: '/member-directory', icon: 'User' },
  { type: 'member', label: 'Michael Chen', sub: 'Software Engineer at Meta', path: '/member-directory', icon: 'User' },
  { type: 'event', label: 'Annual Alumni Gala 2026', sub: 'March 20, 2026', path: '/events-hub', icon: 'Calendar' },
  { type: 'event', label: 'Career Networking Night', sub: 'April 5, 2026', path: '/events-hub', icon: 'Calendar' },
  { type: 'job', label: 'Senior UX Designer', sub: 'TechCorp · San Francisco', path: '/jobs-portal', icon: 'Briefcase' },
  { type: 'job', label: 'Marketing Director', sub: 'StartupXYZ · Remote', path: '/jobs-portal', icon: 'Briefcase' },
];

const TYPE_LABELS = { member: 'Member', event: 'Event', job: 'Job' };

export default function GlobalSearch() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const filtered = query?.trim()?.length > 0
    ? MOCK_SUGGESTIONS?.filter(
        (s) =>
          s?.label?.toLowerCase()?.includes(query?.toLowerCase()) ||
          s?.sub?.toLowerCase()?.includes(query?.toLowerCase())
      )
    : [];

  const showDropdown = focused && query?.trim()?.length > 0;

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef?.current?.focus(), 50);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setQuery('');
    setFocused(false);
    setActiveIndex(-1);
  };

  const handleSelect = (item) => {
    navigate(item?.path);
    handleCollapse();
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e?.key === 'ArrowDown') {
      e?.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered?.length - 1));
    } else if (e?.key === 'ArrowUp') {
      e?.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e?.key === 'Enter' && activeIndex >= 0) {
      e?.preventDefault();
      handleSelect(filtered?.[activeIndex]);
    } else if (e?.key === 'Escape') {
      handleCollapse();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef?.current && !containerRef?.current?.contains(e?.target)) {
        handleCollapse();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Collapsed: icon button */}
      {!expanded && (
        <button
          onClick={handleExpand}
          className="flex items-center justify-center w-10 h-10 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-250"
          aria-label="Open search"
        >
          <Icon name="Search" size={18} color="currentColor" />
        </button>
      )}
      {/* Expanded: input */}
      {expanded && (
        <div className="flex items-center gap-2 bg-muted rounded-md px-3 h-10 w-64 border border-border transition-all duration-250">
          <Icon name="Search" size={16} color="var(--color-text-secondary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e?.target?.value); setActiveIndex(-1); }}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search members, events, jobs..."
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-text-secondary outline-none border-none"
            aria-label="Search"
            aria-autoComplete="list"
            aria-expanded={showDropdown}
          />
          <button
            onClick={handleCollapse}
            className="text-text-secondary hover:text-foreground transition-colors duration-250"
            aria-label="Close search"
          >
            <Icon name="X" size={14} color="currentColor" />
          </button>
        </div>
      )}
      {/* Dropdown */}
      {showDropdown && (
        <div
          className="absolute top-full right-0 mt-2 w-80 bg-card rounded-md border border-border overflow-hidden"
          style={{ boxShadow: 'var(--shadow-lg)', zIndex: 1015 }}
          role="listbox"
          aria-label="Search suggestions"
        >
          {filtered?.length === 0 ? (
            <div className="px-4 py-6 text-center text-text-secondary text-sm font-body">
              No results found for "{query}"
            </div>
          ) : (
            <ul>
              {filtered?.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-250
                      ${activeIndex === idx ? 'bg-muted' : 'hover:bg-muted'}
                    `}
                    role="option"
                    aria-selected={activeIndex === idx}
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--color-muted)' }}
                    >
                      <Icon name={item?.icon} size={14} color="var(--color-text-secondary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-500 text-foreground truncate">{item?.label}</p>
                      <p className="text-xs font-caption text-text-secondary truncate">{item?.sub}</p>
                    </div>
                    <span
                      className="text-xs font-caption px-2 py-0.5 rounded-sm flex-shrink-0"
                      style={{ background: 'var(--color-muted)', color: 'var(--color-text-secondary)' }}
                    >
                      {TYPE_LABELS?.[item?.type]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="px-4 py-2 border-t border-border">
            <button
              onClick={() => { navigate('/member-directory'); handleCollapse(); }}
              className="text-xs font-caption flex items-center gap-1 transition-colors duration-250"
              style={{ color: 'var(--color-accent)' }}
            >
              <Icon name="Search" size={12} color="currentColor" />
              View all results for "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
}