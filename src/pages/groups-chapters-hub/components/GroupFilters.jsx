import React, { useState } from 'react';

import Button from 'components/ui/Button';

export default function GroupFilters({ filters, onChange }) {
  const types = ['All', 'Chapter', 'Batch', 'Interest', 'Professional'];
  const activity = ['All', 'Very Active', 'Active', 'Moderate'];

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-3 sm:p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
        {/* Type */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Group Type</label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {types?.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ ...filters, type: t })}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  filters?.type === t
                    ? 'bg-[var(--color-foreground)] text-[var(--color-card)]'
                    : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Activity Level</label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {activity?.map((a) => (
              <button
                key={a}
                onClick={() => onChange({ ...filters, activity: a })}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  filters?.activity === a
                    ? 'bg-[var(--color-foreground)] text-[var(--color-card)]'
                    : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={14}
          onClick={() => onChange({ type: 'All', activity: 'All' })}
          className="flex-shrink-0"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
