import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const GROUPS = [
  {
    id: 1,
    name: 'Tech Alumni Network',
    type: 'Industry Group',
    members: 1240,
    icon: 'Cpu',
    color: '#E8C547',
    description: 'Engineers, PMs, and designers from top tech companies',
  },
  {
    id: 2,
    name: 'NYC Chapter',
    type: 'City Chapter',
    members: 876,
    icon: 'Building2',
    color: '#D4AF37',
    description: 'Alumni living and working in New York City',
  },
  {
    id: 3,
    name: 'Class of 2015',
    type: 'Batch Group',
    members: 342,
    icon: 'GraduationCap',
    color: '#1C1C1C',
    description: 'Reconnect with your graduating class',
  },
  {
    id: 4,
    name: 'Entrepreneurs Circle',
    type: 'Interest Community',
    members: 589,
    icon: 'Rocket',
    color: '#F59E0B',
    description: 'Founders, investors, and startup enthusiasts',
  },
];

export default function SuggestedGroups() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState({});

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">Suggested Groups</h2>
        <button
          onClick={() => navigate('/groups-chapters-hub')}
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}
        >
          Browse all <Icon name="ArrowRight" size={12} color="currentColor" />
        </button>
      </div>
      <div className="space-y-3">
        {GROUPS?.map((g) => (
          <div
            key={g?.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/groups-chapters-hub')}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: g?.color }}
            >
              <Icon name={g?.icon} size={18} color={g?.color === '#1C1C1C' ? '#E8C547' : '#1C1C1C'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground line-clamp-1">{g?.name}</p>
              <p className="text-xs text-text-secondary">{g?.type} · {g?.members?.toLocaleString()} members</p>
            </div>
            <button
              onClick={() => setJoined(p => ({ ...p, [g?.id]: !p?.[g?.id] }))}
              className="text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0 transition-all duration-200"
              style={{
                background: joined?.[g?.id] ? '#22C55E' : '#E8C547',
                color: '#1C1C1C',
              }}
            >
              {joined?.[g?.id] ? 'Joined' : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}