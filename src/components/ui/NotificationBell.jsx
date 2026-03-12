import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'message',
    icon: 'MessageSquare',
    title: 'New message from Sarah Johnson',
    body: 'Hey! Are you attending the gala this year?',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    type: 'event',
    icon: 'Calendar',
    title: 'Event reminder',
    body: 'Career Networking Night starts in 2 hours',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    type: 'connection',
    icon: 'UserPlus',
    title: 'Michael Chen wants to connect',
    body: 'Software Engineer at Meta · Class of 2018',
    time: '3h ago',
    read: false,
  },
  {
    id: 4,
    type: 'job',
    icon: 'Briefcase',
    title: 'New job match',
    body: 'Senior UX Designer at TechCorp matches your profile',
    time: '1d ago',
    read: true,
  },
  {
    id: 5,
    type: 'group',
    icon: 'Users',
    title: 'You were added to Tech Alumni Group',
    body: '245 members · San Francisco Chapter',
    time: '2d ago',
    read: true,
  },
];

export default function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const containerRef = useRef(null);

  const unreadCount = notifications?.filter((n) => !n?.read)?.length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef?.current && !containerRef?.current?.contains(e?.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev?.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) => prev?.map((n) => n?.id === id ? { ...n, read: true } : n));
  };

  const handleNotificationClick = (notification) => {
    markRead(notification?.id);
    if (notification?.type === 'message') navigate('/messaging-interface');
    else if (notification?.type === 'event') navigate('/events-hub');
    else if (notification?.type === 'job') navigate('/jobs-portal');
    else navigate('/dashboard');
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center w-10 h-10 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-250"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Icon name="Bell" size={18} color="currentColor" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1.5 right-1.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-xs font-caption font-500 leading-none px-1"
            style={{ background: 'var(--color-error)', color: 'var(--color-error-foreground)' }}
            aria-hidden="true"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          className="fixed right-2 sm:absolute sm:right-0 top-14 sm:top-full sm:mt-2 w-[calc(100vw-1rem)] sm:w-96 max-w-sm sm:max-w-none bg-card rounded-md border border-border overflow-hidden"
          style={{ boxShadow: 'var(--shadow-lg)', zIndex: 1010 }}
          role="dialog"
          aria-label="Notifications"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-heading font-600 text-sm text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-caption transition-colors duration-250"
                style={{ color: 'var(--color-accent)' }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <ul className="max-h-80 overflow-y-auto">
            {notifications?.map((notification) => (
              <li key={notification?.id}>
                <button
                  onClick={() => handleNotificationClick(notification)}
                  className={`
                    w-full flex items-start gap-3 px-4 py-3 text-left transition-colors duration-250 hover:bg-muted
                    ${!notification?.read ? 'bg-muted/50' : ''}
                  `}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: notification?.read ? 'var(--color-muted)' : 'var(--color-primary)',
                    }}
                  >
                    <Icon
                      name={notification?.icon}
                      size={14}
                      color={notification?.read ? 'var(--color-text-secondary)' : 'var(--color-primary-foreground)'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-body leading-snug truncate ${!notification?.read ? 'font-500 text-foreground' : 'text-text-secondary'}`}>
                      {notification?.title}
                    </p>
                    <p className="text-xs font-caption text-text-secondary mt-0.5 line-clamp-1">{notification?.body}</p>
                    <p className="text-xs font-caption mt-1" style={{ color: 'var(--color-accent)' }}>{notification?.time}</p>
                  </div>
                  {!notification?.read && (
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ background: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border">
            <button
              onClick={() => { navigate('/dashboard'); setOpen(false); }}
              className="w-full text-center text-xs font-caption transition-colors duration-250"
              style={{ color: 'var(--color-accent)' }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}