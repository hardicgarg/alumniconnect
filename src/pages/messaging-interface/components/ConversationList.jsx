import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png",
    avatarAlt: "Professional woman with brown hair smiling in office setting",
    preview: "Hey! Are you attending the alumni gala this year?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    role: "Product Manager at Google"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5ee34f4-1763296128758.png",
    avatarAlt: "Asian man in business casual attire with confident smile",
    preview: "Thanks for the referral, really appreciate it!",
    timestamp: "1h ago",
    unread: 0,
    online: true,
    role: "Software Engineer at Meta"
  },
  {
    id: 3,
    name: "Priya Patel",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13ab42514-1763298452113.png",
    avatarAlt: "South Asian woman in professional attire with warm smile",
    preview: "Let me know if you'd like to grab coffee next week.",
    timestamp: "3h ago",
    unread: 1,
    online: false,
    role: "UX Designer at Apple"
  },
  {
    id: 4,
    name: "James Williams",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f95a7a07-1763293569074.png",
    avatarAlt: "African American man in suit with professional headshot background",
    preview: "The networking event was fantastic! Great to reconnect.",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    role: "Investment Banker at Goldman Sachs"
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d74cfebe-1763296204754.png",
    avatarAlt: "Latina woman with curly hair in creative workspace environment",
    preview: "I shared the job posting in the alumni group.",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
    role: "Marketing Director at Spotify"
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1106c011c-1772526778426.png",
    avatarAlt: "Korean American man in casual professional attire outdoors",
    preview: "Would love to connect you with our hiring manager.",
    timestamp: "Mon",
    unread: 0,
    online: false,
    role: "VP Engineering at Stripe"
  },
  {
    id: 7,
    name: "Aisha Thompson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144c0a74b-1772850180119.png",
    avatarAlt: "Black woman with natural hair in modern office environment",
    preview: "Congrats on the promotion! Well deserved.",
    timestamp: "Sun",
    unread: 0,
    online: false,
    role: "Data Scientist at Netflix"
  },
  {
    id: 8,
    name: "Carlos Mendez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12dfc2f89-1763294012746.png",
    avatarAlt: "Hispanic man with glasses in startup office casual setting",
    preview: "Our batch reunion is coming up in April!",
    timestamp: "Mar 8",
    unread: 0,
    online: true,
    role: "Founder at TechStartup"
  }
];

export { conversations };

export default function ConversationList({ activeId, onSelect, onNewMessage }) {
  const [search, setSearch] = useState('');

  const filtered = conversations?.filter((c) =>
    c?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
    c?.preview?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const totalUnread = conversations?.reduce((sum, c) => sum + (c?.unread || 0), 0);

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--color-card)' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-heading font-semibold text-lg" style={{ color: 'var(--color-foreground)' }}>
              Messages
            </h2>
            {totalUnread > 0 && (
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
              >
                {totalUnread}
              </span>
            )}
          </div>
          <button
            onClick={onNewMessage}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{ background: 'var(--color-muted)', color: 'var(--color-accent)' }}
            aria-label="New message"
          >
            <Icon name="SquarePen" size={16} color="currentColor" />
          </button>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5 h-10"
          style={{ background: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
        >
          <Icon name="Search" size={15} color="var(--color-text-secondary)" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-sm outline-none border-none"
            style={{ color: 'var(--color-foreground)' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="flex items-center justify-center w-4 h-4 rounded-full transition-all hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <Icon name="X" size={11} color="currentColor" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--color-border)', flexShrink: 0 }} />

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filtered?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: 'var(--color-muted)' }}
            >
              <Icon name="MessageSquare" size={22} color="var(--color-text-secondary)" />
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>No conversations found</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>Try a different search term</p>
          </div>
        ) : (
          filtered?.map((conv, idx) => (
            <button
              key={conv?.id}
              onClick={() => onSelect(conv?.id)}
              className="w-full flex items-start gap-3 px-5 py-3.5 text-left transition-all duration-200 relative group"
              style={{
                background: activeId === conv?.id ? 'var(--color-muted)' : 'transparent',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {/* Active indicator */}
              {activeId === conv?.id && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r-full"
                  style={{ background: 'var(--color-primary)' }}
                />
              )}

              {/* Hover bg */}
              {activeId !== conv?.id && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: 'var(--color-muted)' }}
                />
              )}

              {/* Avatar */}
              <div className="relative flex-shrink-0 z-10">
                <div
                  className="w-11 h-11 rounded-full overflow-hidden"
                  style={{ border: '2px solid var(--color-border)' }}
                >
                  <Image src={conv?.avatar} alt={conv?.avatarAlt} className="w-full h-full object-cover" />
                </div>
                {conv?.online && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                    style={{
                      background: 'var(--color-success)',
                      border: '2px solid var(--color-card)'
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 z-10">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span
                    className="text-sm truncate"
                    style={{
                      fontWeight: conv?.unread > 0 ? 600 : 500,
                      color: 'var(--color-foreground)'
                    }}
                  >
                    {conv?.name}
                  </span>
                  <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-secondary)' }}>
                    {conv?.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-xs truncate leading-relaxed"
                    style={{
                      color: conv?.unread > 0 ? 'var(--color-foreground)' : 'var(--color-text-secondary)',
                      fontWeight: conv?.unread > 0 ? 500 : 400
                    }}
                  >
                    {conv?.preview}
                  </p>
                  {conv?.unread > 0 && (
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
                    >
                      {conv?.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
