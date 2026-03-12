import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center px-4">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--color-muted)] flex items-center justify-center mb-4">
        <Icon name="Users" size={32} color="var(--color-text-secondary)" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-[var(--color-foreground)] mb-2">No alumni found</h3>
      <p className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-sm mb-6">
        Try adjusting your search terms or filters to discover more alumni in the community.
      </p>
      <Button variant="outline" iconName="X" iconPosition="left" onClick={onClearFilters}>
        Clear all filters
      </Button>
    </div>
  );
}