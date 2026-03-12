import React, { useRef, useEffect, useState } from 'react';

export default function SubNavigation({ tabs = [], activeTab, onTabChange, className = '' }) {
  const scrollRef = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScroll = () => {
    const el = scrollRef?.current;
    if (!el) return;
    setShowLeftFade(el?.scrollLeft > 8);
    setShowRightFade(el?.scrollLeft + el?.clientWidth < el?.scrollWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef?.current;
    if (el) el?.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [tabs]);

  if (!tabs?.length) return null;

  return (
    <div
      className={`relative bg-card border-b border-border ${className}`}
      style={{ height: 'var(--subnav-height)' }}
    >
      {/* Left fade */}
      {showLeftFade && (
        <div
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, var(--color-card), transparent)' }}
          aria-hidden="true"
        />
      )}
      <div
        ref={scrollRef}
        className="flex items-center h-full overflow-x-auto scrollbar-hide px-4 lg:px-6 gap-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="tablist"
        aria-label="Section navigation"
      >
        {tabs?.map((tab) => {
          const isActive = activeTab === tab?.value;
          return (
            <button
              key={tab?.value}
              onClick={() => onTabChange?.(tab?.value)}
              role="tab"
              aria-selected={isActive}
              className={`
                flex items-center gap-2 px-4 h-9 rounded-md text-sm font-body font-500 whitespace-nowrap
                flex-shrink-0 transition-all duration-250 ease-out min-h-touch
                ${isActive
                  ? 'text-foreground'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }
              `}
              style={isActive ? { background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' } : {}}
            >
              {tab?.icon && (
                <span aria-hidden="true">
                  {/* icon slot - pass icon name as tab.icon string if needed */}
                </span>
              )}
              {tab?.label}
              {tab?.count !== undefined && (
                <span
                  className="text-xs font-caption px-1.5 py-0.5 rounded-sm leading-none"
                  style={{
                    background: isActive ? 'rgba(28,28,28,0.15)' : 'var(--color-muted)',
                    color: isActive ? 'var(--color-primary-foreground)' : 'var(--color-text-secondary)',
                  }}
                >
                  {tab?.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Right fade */}
      {showRightFade && (
        <div
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, var(--color-card), transparent)' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}