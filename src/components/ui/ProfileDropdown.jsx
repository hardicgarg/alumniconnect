import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const MENU_ITEMS = [
  { label: 'View Profile', icon: 'User', path: '/my-profile-page' },
  { label: 'Help & Support', icon: 'HelpCircle', path: '/help-support' },
];

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const user = {
    name: 'Alex Rivera',
    role: 'Class of 2015',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef?.current && !containerRef?.current?.contains(e?.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    navigate('/login-page');
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-all duration-250 min-h-touch"
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 border border-border">
          <Image
            src={user?.avatar}
            alt={`${user?.name} profile photo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs font-body font-500 text-foreground leading-none">{user?.name}</p>
          <p className="text-xs font-caption text-text-secondary leading-none mt-0.5">{user?.role}</p>
        </div>
        <Icon name="ChevronDown" size={14} color="var(--color-text-secondary)" className={`hidden md:block transition-transform duration-250 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className="absolute top-full right-0 mt-2 w-56 bg-card rounded-md border border-border overflow-hidden"
          style={{ boxShadow: 'var(--shadow-lg)', zIndex: 1010 }}
          role="menu"
          aria-label="Account options"
        >
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border border-border">
              <Image
                src={user?.avatar}
                alt={`${user?.name} profile photo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-body font-500 text-foreground truncate">{user?.name}</p>
              <p className="text-xs font-caption text-text-secondary truncate">{user?.role}</p>
            </div>
          </div>

          {/* Menu items */}
          <ul className="py-1">
            {MENU_ITEMS?.map((item) => (
              <li key={item?.label}>
                <button
                  onClick={() => handleNavigate(item?.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-body text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-250 min-h-touch"
                  role="menuitem"
                >
                  <Icon name={item?.icon} size={16} color="currentColor" />
                  {item?.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-body transition-all duration-250 min-h-touch"
              style={{ color: 'var(--color-error)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              role="menuitem"
            >
              <Icon name="LogOut" size={16} color="currentColor" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}