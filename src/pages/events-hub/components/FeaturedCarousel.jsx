import React, { useState, useEffect } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function FeaturedCarousel({ events, onViewDetail, onRSVP }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % events?.length), 5000);
    return () => clearInterval(timer);
  }, [events?.length]);

  if (!events?.length) return null;
  const event = events?.[current];

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ height: '260px', minHeight: '220px' }}>
      {/* Background */}
      <Image src={event?.banner} alt={event?.bannerAlt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
        <div className="max-w-lg">
          <span className="inline-block text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
            ⭐ Featured Event
          </span>
          <h2 className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-1.5 sm:mb-2 line-clamp-2">{event?.title}</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
            <span className="flex items-center gap-1 sm:gap-1.5"><Icon name="Calendar" size={12} color="currentColor" />{event?.date}</span>
            <span className="flex items-center gap-1 sm:gap-1.5"><Icon name="MapPin" size={12} color="currentColor" />{event?.city}</span>
            <span className="flex items-center gap-1 sm:gap-1.5 hidden sm:flex"><Icon name="Users" size={12} color="currentColor" />{event?.attendeeCount} attending</span>
          </div>
          <div className="flex gap-2 sm:gap-3" onClick={e => e?.stopPropagation()}>
            <Button variant="default" size="sm" iconName="CalendarCheck" iconPosition="left" onClick={() => onRSVP(event, 'going')}>
              RSVP Now
            </Button>
            <Button variant="outline" size="sm" onClick={() => onViewDetail(event)} className="border-white/40 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 flex gap-1.5 sm:gap-2">
        {events?.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 sm:w-6 h-2' : 'w-2 h-2 bg-white/50'}`}
            style={i === current ? { background: 'var(--color-primary)', height: '8px' } : {}}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      {/* Arrows */}
      <button
        onClick={() => setCurrent(c => (c - 1 + events?.length) % events?.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all"
        aria-label="Previous"
      >
        <Icon name="ChevronLeft" size={16} color="currentColor" />
      </button>
      <button
        onClick={() => setCurrent(c => (c + 1) % events?.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all"
        aria-label="Next"
      >
        <Icon name="ChevronRight" size={16} color="currentColor" />
      </button>
    </div>
  );
}