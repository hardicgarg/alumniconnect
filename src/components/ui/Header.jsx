import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

import GlobalSearch from 'components/ui/GlobalSearch';
import NotificationBell from 'components/ui/NotificationBell';
import ProfileDropdown from 'components/ui/ProfileDropdown';

const NAV_STRUCTURE = [
  { label: 'Home', path: '/dashboard' },
  {
    label: 'Community',
    dropdown: [
      { label: 'Member Directory', path: '/member-directory' },
      { label: 'Feed', path: '/community-feed' },
      { label: 'Groups & Chapters', path: '/groups-chapters-hub' },
    ],
  },
  { label: 'Events', path: '/events-hub' },
  { label: 'Opportunities', path: '/jobs-portal' },
  { label: 'Businesses', path: '/business-directory' },
  { label: 'Messages', path: '/messaging-interface' },
];

function DropdownMenu({ item, isActive, navigate, closeAll }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const isDropdownActive = item?.dropdown?.some((d) => isActive(d?.path));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref?.current && !ref?.current?.contains(e?.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center gap-1 px-4 py-2 rounded-md font-body font-500 text-sm
          transition-all duration-250 ease-out min-h-touch
          ${isDropdownActive
            ? 'bg-foreground text-card'
            : 'text-text-secondary hover:text-foreground hover:bg-muted'
          }
        `}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item?.label}
        <Icon
          name={open ? 'ChevronUp' : 'ChevronDown'}
          size={14}
          color="currentColor"
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          {item?.dropdown?.map((child) => (
            <button
              key={child?.path}
              onClick={() => {
                navigate(child?.path);
                setOpen(false);
                closeAll?.();
              }}
              className={`
                w-full text-left px-4 py-2.5 text-sm font-body font-500
                transition-all duration-150
                ${isActive(child?.path)
                  ? 'text-foreground bg-muted font-600'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }
              `}
              aria-current={isActive(child?.path) ? 'page' : undefined}
            >
              {child?.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const mobileMenuRef = useRef(null);

  const isActive = (path) =>
    location?.pathname === path || location?.pathname?.startsWith(path + '/');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(e?.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded({});
  }, [location?.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const toggleMobileGroup = (label) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev?.[label] }));
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 bg-card border-b border-border z-nav"
        style={{ height: 'var(--nav-height)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="max-w-content mx-auto h-full flex items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => navigate('/dashboard')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e?.key === 'Enter' && navigate('/dashboard')}
            aria-label="Alumni Connect - Go to Dashboard"
          >
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-primary)' }}
            >
              <Icon name="GraduationCap" size={20} color="var(--color-primary-foreground)" strokeWidth={2.5} />
            </div>
            <span className="font-heading font-700 text-base sm:text-lg text-foreground hidden xs:block sm:block leading-none">
              Alumni<span style={{ color: 'var(--color-primary)' }}>Connect</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_STRUCTURE?.map((item) =>
              item?.dropdown ? (
                <DropdownMenu
                  key={item?.label}
                  item={item}
                  isActive={isActive}
                  navigate={navigate}
                  closeAll={() => {}}
                />
              ) : (
                <button
                  key={item?.path}
                  onClick={() => navigate(item?.path)}
                  className={`
                    flex items-center px-4 py-2 rounded-md font-body font-500 text-sm
                    transition-all duration-250 ease-out min-h-touch
                    ${isActive(item?.path)
                      ? 'bg-foreground text-card'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }
                  `}
                  aria-current={isActive(item?.path) ? 'page' : undefined}
                >
                  {item?.label}
                </button>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <GlobalSearch />
            <NotificationBell />
            <ProfileDropdown />

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-250"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} color="currentColor" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-nav lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          style={{ zIndex: 99 }}
        />
      )}

      {/* Mobile Drawer */}
      <div
        ref={mobileMenuRef}
        className={`
          fixed top-0 right-0 h-full w-[85vw] max-w-xs bg-card border-l border-border lg:hidden
          transform transition-transform duration-250 ease-out overflow-y-auto
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ zIndex: 110, paddingTop: 'var(--nav-height)' }}
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col p-4 gap-1">
          {NAV_STRUCTURE?.map((item) =>
            item?.dropdown ? (
              <div key={item?.label}>
                <button
                  onClick={() => toggleMobileGroup(item?.label)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-md font-body font-500 text-sm text-left w-full
                    transition-all duration-250 ease-out min-h-touch
                    ${item?.dropdown?.some((d) => isActive(d?.path))
                      ? 'bg-foreground text-card'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  {item?.label}
                  <Icon
                    name={mobileExpanded?.[item?.label] ? 'ChevronUp' : 'ChevronDown'}
                    size={14}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </button>
                {mobileExpanded?.[item?.label] && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item?.dropdown?.map((child) => (
                      <button
                        key={child?.path}
                        onClick={() => navigate(child?.path)}
                        className={`
                          flex items-center px-4 py-2.5 rounded-md font-body font-500 text-sm text-left w-full
                          transition-all duration-250 ease-out
                          ${isActive(child?.path)
                            ? 'bg-muted text-foreground font-600'
                            : 'text-text-secondary hover:text-foreground hover:bg-muted'
                          }
                        `}
                        aria-current={isActive(child?.path) ? 'page' : undefined}
                      >
                        {child?.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item?.path}
                onClick={() => navigate(item?.path)}
                className={`
                  flex items-center px-4 py-3 rounded-md font-body font-500 text-sm text-left w-full
                  transition-all duration-250 ease-out min-h-touch
                  ${isActive(item?.path)
                    ? 'bg-foreground text-card'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }
                `}
                aria-current={isActive(item?.path) ? 'page' : undefined}
              >
                {item?.label}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
    </>
  );
}