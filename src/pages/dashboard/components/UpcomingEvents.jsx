import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';


const EVENTS = [
{
  id: 1,
  title: 'Annual Alumni Gala 2026',
  date: 'Mar 20, 2026',
  time: '7:00 PM',
  venue: 'Grand Hyatt, New York',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_151283bab-1773176525601.png",
  imageAlt: 'Elegant gala event hall with golden lighting and round tables with white tablecloths',
  attendees: 248,
  rsvped: false,
  type: 'In-Person'
},
{
  id: 2,
  title: 'Career Networking Night',
  date: 'Apr 5, 2026',
  time: '6:30 PM',
  venue: 'Virtual · Zoom',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14eab686d-1766473828297.png",
  imageAlt: 'Professional networking event with people in business attire mingling in modern venue',
  attendees: 132,
  rsvped: true,
  type: 'Virtual'
},
{
  id: 3,
  title: 'Tech Talk: AI in 2026',
  date: 'Apr 18, 2026',
  time: '5:00 PM',
  venue: 'Stanford Alumni Center',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18e38a63c-1772176808925.png",
  imageAlt: 'Technology conference with speaker presenting AI concepts on large screen to audience',
  attendees: 89,
  rsvped: false,
  type: 'In-Person'
}];


export default function UpcomingEvents() {
  const navigate = useNavigate();
  const [rsvpState, setRsvpState] = useState(
    EVENTS?.reduce((acc, e) => ({ ...acc, [e?.id]: e?.rsvped }), {})
  );

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">Upcoming Events</h2>
        <button
          onClick={() => navigate('/events-hub')}
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}>
          
          View all <Icon name="ArrowRight" size={12} color="currentColor" />
        </button>
      </div>
      <div className="space-y-3">
        {EVENTS?.map((event) =>
        <div
          key={event?.id}
          className="flex gap-3 p-3 rounded-xl border border-border hover:border-yellow-300 transition-all duration-200 cursor-pointer group"
          onClick={() => navigate('/events-hub')}>
          
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={event?.image} alt={event?.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground line-clamp-1">{event?.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Icon name="Calendar" size={11} color="var(--color-text-secondary)" />
                <span className="text-xs text-text-secondary">{event?.date} · {event?.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Icon name="MapPin" size={11} color="var(--color-text-secondary)" />
                <span className="text-xs text-text-secondary line-clamp-1">{event?.venue}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={11} color="var(--color-text-secondary)" />
                  <span className="text-xs text-text-secondary">{event?.attendees} attending</span>
                </div>
                <button
                onClick={(e) => {e?.stopPropagation();setRsvpState((p) => ({ ...p, [event?.id]: !p?.[event?.id] }));}}
                className="text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200"
                style={{
                  background: rsvpState?.[event?.id] ? '#22C55E' : '#E8C547',
                  color: '#1C1C1C'
                }}>
                
                  {rsvpState?.[event?.id] ? '✓ RSVP\'d' : 'RSVP'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}