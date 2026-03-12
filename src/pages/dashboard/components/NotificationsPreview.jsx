import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NOTIFS = [
  { id: 1, icon: 'Calendar', color: '#E8C547', title: 'Event Reminder', body: 'Career Networking Night starts in 2 hours', time: '1h ago', read: false, path: '/events-hub' },
  { id: 2, icon: 'UserPlus', color: '#22C55E', title: 'Connection Request', body: 'Michael Chen wants to connect with you', time: '3h ago', read: false, path: '/member-directory' },
  { id: 3, icon: 'Briefcase', color: '#D4AF37', title: 'Job Match', body: 'Senior UX Designer at TechCorp matches your profile', time: '1d ago', read: true, path: '/jobs-portal' },
  { id: 4, icon: 'Users', color: '#F59E0B', title: 'Group Invite', body: 'You\'ve been invited to join Tech Alumni Network', time: '2d ago', read: true, path: '/groups-chapters-hub' },
];

export default function NotificationsPreview() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(NOTIFS);
  const unread = notifs?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-base md:text-lg text-foreground">Notifications</h2>
          {unread > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#EF4444' }}>
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={() => setNotifs(p => p?.map(n => ({ ...n, read: true })))}
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="space-y-2">
        {notifs?.map((n) => (
          <div
            key={n?.id}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors duration-200 ${!n?.read ? 'bg-yellow-50' : 'hover:bg-muted'}`}
            onClick={() => { setNotifs(p => p?.map(x => x?.id === n?.id ? { ...x, read: true } : x)); navigate(n?.path); }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: n?.color }}
            >
              <Icon name={n?.icon} size={14} color="#1C1C1C" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm line-clamp-1 ${!n?.read ? 'font-semibold text-foreground' : 'text-foreground'}`}>{n?.title}</p>
              <p className="text-xs text-text-secondary line-clamp-2 mt-0.5">{n?.body}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>{n?.time}</p>
            </div>
            {!n?.read && <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 mt-2" />}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/community-feed')}
        className="w-full mt-4 text-center text-xs font-medium py-2 rounded-xl hover:bg-muted transition-colors"
        style={{ color: 'var(--color-accent)' }}
      >
        View all notifications
      </button>
    </div>
  );
}