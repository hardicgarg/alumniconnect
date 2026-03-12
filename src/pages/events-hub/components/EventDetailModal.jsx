import React, { useState } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function EventDetailModal({ event, onClose, onRSVP }) {
  const [activeTab, setActiveTab] = useState('about');

  if (!event) return null;

  const tabs = [
    { value: 'about', label: 'About' },
    { value: 'agenda', label: 'Agenda' },
    { value: 'attendees', label: 'Attendees' },
  ];

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ top: 'var(--nav-height)' }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl w-full max-w-2xl my-4 overflow-hidden flex flex-col"
        style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)' }}
        onClick={e => e?.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-48 flex-shrink-0">
          <Image src={event?.banner} alt={event?.bannerAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
            aria-label="Close"
          >
            <Icon name="X" size={18} color="currentColor" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              {event?.type}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">{event?.title}</h2>

            {/* Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { icon: 'Calendar', text: `${event?.date} · ${event?.time}` },
                { icon: 'MapPin', text: `${event?.venue}, ${event?.city}` },
                { icon: 'User', text: `Organized by ${event?.organizer}` },
                { icon: 'Users', text: `${event?.attendeeCount} attending · ${event?.maxAttendees - event?.attendeeCount} spots left` },
              ]?.map(({ icon, text }) => (
                <div key={icon} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-muted)' }}>
                    <Icon name={icon} size={15} color="var(--color-accent)" />
                  </div>
                  <span className="line-clamp-1">{text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border mb-4">
              {tabs?.map(t => (
                <button
                  key={t?.value}
                  onClick={() => setActiveTab(t?.value)}
                  className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${activeTab === t?.value ? 'border-amber-400 text-foreground' : 'border-transparent text-text-secondary hover:text-foreground'}`}
                >
                  {t?.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <div className="text-sm text-text-secondary leading-relaxed space-y-3">
                <p>{event?.description}</p>
                {event?.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {event?.tags?.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-border text-text-secondary">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="space-y-3">
                {event?.agenda?.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 flex-shrink-0 text-xs font-mono text-text-secondary pt-0.5">{item?.time}</div>
                    <div className="flex-1 border-l-2 border-border pl-3">
                      <p className="text-sm font-medium text-foreground">{item?.title}</p>
                      {item?.speaker && <p className="text-xs text-text-secondary mt-0.5">{item?.speaker}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'attendees' && (
              <div>
                <div className="flex flex-wrap gap-3">
                  {event?.attendees?.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
                      <Image src={a?.avatar} alt={a?.avatarAlt} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{a?.name}</p>
                        <p className="text-xs text-text-secondary">{a?.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-secondary mt-3">+{event?.attendeeCount - event?.attendees?.length} more attending</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-border p-4 flex gap-3">
          {event?.rsvpStatus === 'going' ? (
            <Button variant="success" fullWidth iconName="CheckCircle" iconPosition="left" onClick={() => { onRSVP(event, 'cancel'); onClose(); }}>
              You're Going ✓
            </Button>
          ) : (
            <Button variant="default" fullWidth iconName="CalendarCheck" iconPosition="left" onClick={() => { onRSVP(event, 'going'); onClose(); }}>
              RSVP Now
            </Button>
          )}
          <Button variant="outline" iconName="Share2" iconPosition="left" onClick={onClose}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}