import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ACTIONS = [
  { label: 'Post Job', icon: 'Briefcase', path: '/jobs-portal', color: '#E8C547', textColor: '#1C1C1C' },
  { label: 'Create Event', icon: 'CalendarPlus', path: '/events-hub', color: '#1C1C1C', textColor: '#FFFFFF' },
  { label: 'Add Business', icon: 'Store', path: '/business-directory', color: '#D4AF37', textColor: '#1C1C1C' },
  { label: 'Find Alumni', icon: 'Users', path: '/member-directory', color: '#F5F2EC', textColor: '#1C1C1C' },
];

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
      {ACTIONS?.map((a) => (
        <button
          key={a?.label}
          onClick={() => navigate(a?.path)}
          className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-250 hover:scale-105 hover:shadow-md"
          style={{ background: a?.color, color: a?.textColor, boxShadow: 'var(--shadow-sm)' }}
        >
          <Icon name={a?.icon} size={15} color={a?.textColor} />
          {a?.label}
        </button>
      ))}
    </div>
  );
}