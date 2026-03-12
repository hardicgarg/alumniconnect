import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function EventCard({ event, onViewDetail, onRSVP, isPast = false }) {
  const { title, banner, bannerAlt, date, time, venue, city, organizer, attendeeCount, maxAttendees, type, rsvpStatus, isFeatured } = event;

  const typeColors = {
    Networking: 'bg-blue-100 text-blue-700',
    Workshop: 'bg-purple-100 text-purple-700',
    Reunion: 'bg-amber-100 text-amber-700',
    Webinar: 'bg-green-100 text-green-700',
    Conference: 'bg-red-100 text-red-700',
    Social: 'bg-pink-100 text-pink-700',
  };

  const spotsLeft = maxAttendees - attendeeCount;
  const isFull = spotsLeft <= 0;

  return (
    <div
      className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-md)' }}
      onClick={() => onViewDetail(event)}
    >
      {/* Banner */}
      <div className="relative h-36 sm:h-44 overflow-hidden flex-shrink-0">
        <Image
          src={banner}
          alt={bannerAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {isFeatured && (
          <span className="absolute top-2 sm:top-3 left-2 sm:left-3 text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
            ⭐ Featured
          </span>
        )}
        <span className={`absolute top-2 sm:top-3 right-2 sm:right-3 text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${typeColors?.[type] || 'bg-gray-100 text-gray-700'}`}>
          {type}
        </span>
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white">
          <p className="text-xs font-medium opacity-90">{date}</p>
          <p className="text-xs opacity-75">{time}</p>
        </div>
      </div>
      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2 sm:gap-3">
        <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">{title}</h3>

        <div className="flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm text-text-secondary">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Icon name="MapPin" size={12} color="currentColor" />
            <span className="truncate">{venue}, {city}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Icon name="User" size={12} color="currentColor" />
            <span className="truncate">By {organizer}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Icon name="Users" size={12} color="currentColor" />
            <span>{attendeeCount} attending{!isPast && maxAttendees && ` · ${isFull ? 'Full' : `${spotsLeft} spots left`}`}</span>
          </div>
        </div>

        {!isPast && (
          <div className="mt-auto pt-2" onClick={e => e?.stopPropagation()}>
            {rsvpStatus === 'going' ? (
              <Button variant="success" size="sm" fullWidth iconName="CheckCircle" iconPosition="left" onClick={() => onRSVP(event, 'cancel')}>
                Going ✓
              </Button>
            ) : rsvpStatus === 'interested' ? (
              <Button variant="secondary" size="sm" fullWidth iconName="Star" iconPosition="left" onClick={() => onRSVP(event, 'going')}>
                Interested
              </Button>
            ) : isFull ? (
              <Button variant="outline" size="sm" fullWidth disabled>
                Event Full
              </Button>
            ) : (
              <Button variant="default" size="sm" fullWidth iconName="CalendarCheck" iconPosition="left" onClick={() => onRSVP(event, 'going')}>
                RSVP Now
              </Button>
            )}
          </div>
        )}
        {isPast && (
          <div className="mt-auto pt-2">
            <Button variant="outline" size="sm" fullWidth iconName="Eye" iconPosition="left" onClick={e => { e?.stopPropagation(); onViewDetail(event); }}>
              View Recap
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}