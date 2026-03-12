import React from 'react';
import Icon from 'components/AppIcon';

const STATS = [
  { label: 'Connections', value: '248', icon: 'Users', color: '#E8C547' },
  { label: 'Events Attended', value: '12', icon: 'Calendar', color: '#D4AF37' },
  { label: 'Jobs Saved', value: '7', icon: 'Bookmark', color: '#F59E0B' },
  { label: 'Groups Joined', value: '5', icon: 'Layers', color: '#22C55E' },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {STATS?.map((s) => (
        <div
          key={s?.label}
          className="bg-card rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:shadow-md transition-shadow duration-200"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: s?.color + '22' }}
          >
            <Icon name={s?.icon} size={16} color={s?.color} />
          </div>
          <div className="min-w-0">
            <p className="text-lg sm:text-xl font-bold text-foreground leading-none">{s?.value}</p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">{s?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}