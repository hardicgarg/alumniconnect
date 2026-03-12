import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const TRENDING = [
  { tag: '#AlumniGala2026', posts: 142 },
  { tag: '#StartupFounders', posts: 98 },
  { tag: '#ClassOf2015', posts: 87 },
  { tag: '#TechAlumni', posts: 74 },
  { tag: '#HiringNow', posts: 63 },
  { tag: '#ReunionSeason', posts: 51 },
];

const EVENTS = [
  {
    id: 1,
    title: 'Annual Alumni Gala 2026',
    date: 'Mar 20',
    venue: 'Grand Hyatt, NYC',
    attendees: 214,
    color: '#E8C547'
  },
  {
    id: 2,
    title: 'Bay Area Tech Meetup',
    date: 'Mar 28',
    venue: 'Salesforce Tower, SF',
    attendees: 89,
    color: '#D4AF37'
  },
  {
    id: 3,
    title: 'Class of 2015 Reunion',
    date: 'Apr 5',
    venue: 'Campus Auditorium',
    attendees: 156,
    color: '#F59E0B'
  },
];

export default function RightSidebar() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Trending Topics */}
      <div className="bg-card rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
          <h3 className="font-bold text-sm text-foreground">Trending Topics</h3>
        </div>
        <div className="space-y-2">
          {TRENDING?.map((t, i) => (
            <div
              key={t?.tag}
              className="flex items-center justify-between cursor-pointer hover:bg-muted rounded-lg px-2 py-1.5 transition-all duration-200 group"
            >
              <div>
                <p className="text-xs font-semibold text-foreground group-hover:underline" style={{ color: 'var(--color-accent)' }}>{t?.tag}</p>
                <p className="text-xs text-text-secondary">{t?.posts} posts</p>
              </div>
              <span className="text-xs text-text-secondary font-medium">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="bg-card rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} color="var(--color-primary)" />
            <h3 className="font-bold text-sm text-foreground">Upcoming Events</h3>
          </div>
          <button
            onClick={() => navigate('/events-hub')}
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            All events
          </button>
        </div>
        <div className="space-y-3">
          {EVENTS?.map((ev) => (
            <div
              key={ev?.id}
              className="flex items-start gap-3 cursor-pointer hover:bg-muted rounded-xl p-2 transition-all duration-200"
              onClick={() => navigate('/events-hub')}
            >
              <div
                className="w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: ev?.color + '20', border: `1.5px solid ${ev?.color}40` }}
              >
                <span className="text-xs font-bold leading-none" style={{ color: ev?.color }}>{ev?.date?.split(' ')?.[0]}</span>
                <span className="text-sm font-black leading-none" style={{ color: ev?.color }}>{ev?.date?.split(' ')?.[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground line-clamp-1">{ev?.title}</p>
                <p className="text-xs text-text-secondary truncate">{ev?.venue}</p>
                <p className="text-xs text-text-secondary">{ev?.attendees} attending</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
