import React from 'react';
import Image from 'components/AppImage';

import Button from 'components/ui/Button';

export default function MyEventsPanel({ events, onViewDetail, onCancelRSVP }) {
  const rsvpd = events?.filter(e => e?.rsvpStatus === 'going' || e?.rsvpStatus === 'interested');
  const organized = events?.filter(e => e?.isOrganized);

  const Section = ({ title, items, emptyMsg }) => (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-foreground mb-3">{title}</h3>
      {items?.length === 0 ? (
        <div className="bg-muted rounded-xl p-6 text-center text-sm text-text-secondary">{emptyMsg}</div>
      ) : (
        <div className="space-y-3">
          {items?.map(event => (
            <div key={event?.id} className="bg-card rounded-xl border border-border p-4 flex gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => onViewDetail(event)}>
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={event?.banner} alt={event?.bannerAlt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground line-clamp-1">{event?.title}</p>
                <p className="text-xs text-text-secondary mt-0.5">{event?.date} · {event?.city}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event?.rsvpStatus === 'going' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {event?.rsvpStatus === 'going' ? '✓ Going' : '★ Interested'}
                  </span>
                </div>
              </div>
              <div onClick={e => e?.stopPropagation()}>
                <Button variant="ghost" size="xs" iconName="X" onClick={() => onCancelRSVP(event)} aria-label="Cancel RSVP" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Section title="My RSVPs" items={rsvpd} emptyMsg="You haven't RSVP'd to any events yet. Browse upcoming events to get started!" />
      <Section title="Events I'm Organizing" items={organized} emptyMsg="You haven't created any events yet. Use 'Create Event' to get started!" />
    </div>
  );
}