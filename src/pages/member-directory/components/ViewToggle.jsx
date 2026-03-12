import React from 'react';
import Icon from 'components/AppIcon';

export default function ViewToggle({ view, onViewChange }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-[var(--color-muted)] rounded-xl border border-[var(--color-border)]">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
          view === 'grid' ?'bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm' :'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]'
        }`}
        aria-label="Grid view"
      >
        <Icon name="LayoutGrid" size={16} color="currentColor" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
          view === 'list' ?'bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm' :'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]'
        }`}
        aria-label="List view"
      >
        <Icon name="List" size={16} color="currentColor" />
      </button>
    </div>
  );
}