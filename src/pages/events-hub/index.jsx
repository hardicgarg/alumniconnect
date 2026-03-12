import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import SubNavigation from 'components/ui/SubNavigation';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import EventCard from './components/EventCard';
import FeaturedCarousel from './components/FeaturedCarousel';
import EventFilters from './components/EventFilters';
import EventDetailModal from './components/EventDetailModal';
import CreateEventModal from './components/CreateEventModal';
import MyEventsPanel from './components/MyEventsPanel';

const MOCK_EVENTS = [
{
  id: 1,
  title: "Annual Alumni Gala 2026",
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_151283bab-1773176525601.png",
  bannerAlt: "Elegant gala event hall with golden chandeliers, round tables with white linens, and warm ambient lighting",
  date: "03/20/2026", time: "7:00 PM - 11:00 PM", venue: "Grand Ballroom, Marriott Hotel",
  city: "San Francisco", organizer: "Alumni Association", attendeeCount: 312, maxAttendees: 400,
  type: "Networking", rsvpStatus: 'going', isFeatured: true, isOrganized: false,
  description: "Join us for the most anticipated alumni event of the year! The Annual Alumni Gala brings together graduates from all batches for an evening of networking, celebration, and reconnection. Enjoy a gourmet dinner, live entertainment, and inspiring talks from distinguished alumni.",
  tags: ["Formal Attire", "Dinner Included", "Live Music", "Networking"],
  agenda: [
  { time: "7:00 PM", title: "Cocktail Reception & Registration", speaker: null },
  { time: "7:45 PM", title: "Welcome Address", speaker: "Dr. James Wilson, Dean" },
  { time: "8:00 PM", title: "Gala Dinner", speaker: null },
  { time: "9:00 PM", title: "Distinguished Alumni Awards", speaker: "Alumni Association" },
  { time: "9:45 PM", title: "Live Band & Dancing", speaker: null },
  { time: "11:00 PM", title: "Closing Remarks", speaker: null }],

  attendees: [
  { name: "Sarah Johnson", role: "Product Manager", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png", avatarAlt: "Professional woman with brown hair smiling in office setting" },
  { name: "Michael Chen", role: "Software Engineer", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f29e4eeb-1763294328932.png", avatarAlt: "Asian man in casual blue shirt with friendly expression" },
  { name: "Priya Patel", role: "Marketing Director", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd20bd68-1772779057407.png", avatarAlt: "South Asian woman with dark hair in professional attire" },
  { name: "David Kim", role: "Venture Capitalist", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbecd92e-1763293961396.png", avatarAlt: "Korean man in business suit with confident smile" }]

},
{
  id: 2,
  title: "Career Networking Night: Tech & Finance",
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8ea05d9-1764882794082.png",
  bannerAlt: "Business professionals networking at a modern conference venue with city skyline view",
  date: "04/05/2026", time: "6:00 PM - 9:00 PM", venue: "WeWork SoHo",
  city: "New York", organizer: "NYC Alumni Chapter", attendeeCount: 87, maxAttendees: 120,
  type: "Networking", rsvpStatus: null, isFeatured: true, isOrganized: false,
  description: "An exclusive networking evening for alumni working in tech and finance sectors. Connect with industry leaders, explore career opportunities, and build meaningful professional relationships with fellow graduates.",
  tags: ["Tech", "Finance", "Career", "Networking"],
  agenda: [
  { time: "6:00 PM", title: "Doors Open & Welcome Drinks", speaker: null },
  { time: "6:30 PM", title: "Speed Networking Rounds", speaker: null },
  { time: "7:30 PM", title: "Panel: Career Transitions in 2026", speaker: "4 Alumni Panelists" },
  { time: "8:30 PM", title: "Open Networking & Refreshments", speaker: null }],

  attendees: [
  { name: "Emily Rodriguez", role: "Investment Banker", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b60d363f-1763300423546.png", avatarAlt: "Hispanic woman in formal blazer with professional headshot style" },
  { name: "James Park", role: "CTO at StartupXYZ", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b74f667b-1772677907953.png", avatarAlt: "Korean-American man in casual tech company attire" },
  { name: "Aisha Williams", role: "Data Scientist", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144c0a74b-1772850180119.png", avatarAlt: "African American woman with natural hair in tech office environment" }]

},
{
  id: 3,
  title: "Product Management Workshop: AI & UX",
  banner: "https://images.unsplash.com/photo-1595819492138-5bac5e528330",
  bannerAlt: "Workshop participants collaborating around a table with laptops and sticky notes on a whiteboard",
  date: "04/12/2026", time: "10:00 AM - 4:00 PM", venue: "Innovation Hub, Stanford Research Park",
  city: "San Francisco", organizer: "Sarah Johnson", attendeeCount: 45, maxAttendees: 50,
  type: "Workshop", rsvpStatus: 'interested', isFeatured: false, isOrganized: false,
  description: "A hands-on full-day workshop exploring the intersection of AI and UX in modern product management. Led by alumni product leaders from top tech companies, this workshop covers frameworks, case studies, and practical exercises.",
  tags: ["AI", "UX", "Product", "Workshop", "Hands-on"],
  agenda: [
  { time: "10:00 AM", title: "Introduction & Icebreakers", speaker: "Sarah Johnson" },
  { time: "10:30 AM", title: "AI in Product Strategy", speaker: "Michael Chen, Google" },
  { time: "12:00 PM", title: "Lunch Break", speaker: null },
  { time: "1:00 PM", title: "UX Research with AI Tools", speaker: "Priya Patel" },
  { time: "2:30 PM", title: "Group Exercise: Build a Feature Spec", speaker: null },
  { time: "3:30 PM", title: "Presentations & Feedback", speaker: null }],

  attendees: [
  { name: "Tom Bradley", role: "PM at Airbnb", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ad94bf5d-1772608976542.png", avatarAlt: "Young professional man with glasses in startup office" },
  { name: "Lisa Chang", role: "UX Lead at Figma", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_137bd9c15-1763295122220.png", avatarAlt: "Asian woman with short hair in creative design studio" }]

},
{
  id: 4,
  title: "Class of 2015 Reunion — 10 Year Celebration",
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_1efcbf753-1772768235528.png",
  bannerAlt: "Group of alumni celebrating reunion outdoors on university campus with banners and festive decorations",
  date: "05/15/2026", time: "5:00 PM - 10:00 PM", venue: "University Alumni Center",
  city: "Boston", organizer: "Class of 2015 Committee", attendeeCount: 156, maxAttendees: 250,
  type: "Reunion", rsvpStatus: null, isFeatured: true, isOrganized: false,
  description: "Celebrate 10 years since graduation with your classmates! This special reunion brings together the Class of 2015 for an unforgettable evening of memories, laughter, and reconnection. Campus tours, photo booths, and a special tribute to our decade of achievements.",
  tags: ["Class of 2015", "Reunion", "Campus", "Celebration"],
  agenda: [
  { time: "5:00 PM", title: "Campus Tour & Registration", speaker: null },
  { time: "6:00 PM", title: "Welcome Reception", speaker: "Class President" },
  { time: "7:00 PM", title: "Dinner & Reminiscing", speaker: null },
  { time: "8:30 PM", title: "Where Are They Now? Presentations", speaker: "Class Members" },
  { time: "9:30 PM", title: "Photo Booth & Socializing", speaker: null }],

  attendees: [
  { name: "Alex Rivera", role: "Class of 2015", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9854378-1763300139372.png", avatarAlt: "Hispanic man with warm smile in casual professional attire" },
  { name: "Nina Okafor", role: "Class of 2015", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbc7a7ba-1773071491033.png", avatarAlt: "Nigerian woman with braided hair in colorful professional outfit" }]

},
{
  id: 5,
  title: "Entrepreneurship Webinar: Fundraising in 2026",
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_1170f6a18-1772592487734.png",
  bannerAlt: "Virtual webinar setup with presenter speaking to camera with presentation slides visible on screen",
  date: "03/25/2026", time: "12:00 PM - 1:30 PM", venue: "Online (Zoom)",
  city: "Remote", organizer: "Entrepreneurship Alumni Network", attendeeCount: 203, maxAttendees: 500,
  type: "Webinar", rsvpStatus: null, isFeatured: false, isOrganized: false,
  description: "Join our panel of successful alumni founders and investors for an insightful webinar on fundraising strategies in today's market. Topics include seed funding, Series A preparation, pitch deck essentials, and navigating VC relationships.",
  tags: ["Startup", "Fundraising", "VC", "Entrepreneurship", "Online"],
  agenda: [
  { time: "12:00 PM", title: "Welcome & Introductions", speaker: "Host" },
  { time: "12:10 PM", title: "State of Startup Funding 2026", speaker: "David Kim, VC Partner" },
  { time: "12:35 PM", title: "Founder Stories: From Idea to Series A", speaker: "3 Alumni Founders" },
  { time: "1:10 PM", title: "Live Q&A Session", speaker: "All Panelists" }],

  attendees: [
  { name: "Ryan Foster", role: "Founder & CEO", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc9c16d-1763294447589.png", avatarAlt: "Entrepreneur man in startup casual attire with confident expression" }]

},
{
  id: 6,
  title: "Chicago Alumni Happy Hour",
  banner: "https://images.unsplash.com/photo-1556831732-7178ea98d74f",
  bannerAlt: "Rooftop bar with city skyline view, people socializing with drinks in hand at sunset",
  date: "04/18/2026", time: "6:30 PM - 9:00 PM", venue: "Rooftop Bar, The Langham",
  city: "Chicago", organizer: "Chicago Alumni Chapter", attendeeCount: 34, maxAttendees: 60,
  type: "Social", rsvpStatus: null, isFeatured: false, isOrganized: false,
  description: "Casual happy hour for Chicago-area alumni. Come unwind, meet fellow graduates in the city, and enjoy great views from one of Chicago's best rooftop venues. No agenda — just good company and great conversations.",
  tags: ["Chicago", "Social", "Happy Hour", "Casual"],
  agenda: [
  { time: "6:30 PM", title: "Doors Open", speaker: null },
  { time: "7:00 PM", title: "Brief Welcome from Chapter Lead", speaker: "Chicago Chapter Lead" },
  { time: "7:15 PM", title: "Open Socializing", speaker: null }],

  attendees: [
  { name: "Marcus Johnson", role: "Attorney", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13829e1a5-1772198348914.png", avatarAlt: "African American man in business casual attire with professional demeanor" }]

},
// Past events
{
  id: 7,
  title: "Annual Alumni Gala 2025",
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_1f2265589-1770041149111.png",
  bannerAlt: "Past gala event with alumni dressed formally dancing and celebrating in a grand ballroom",
  date: "03/15/2025", time: "7:00 PM - 11:00 PM", venue: "Grand Hyatt",
  city: "San Francisco", organizer: "Alumni Association", attendeeCount: 287, maxAttendees: 350,
  type: "Networking", rsvpStatus: 'going', isFeatured: false, isOrganized: false, isPast: true,
  description: "The 2025 Annual Alumni Gala was a tremendous success with over 280 alumni in attendance. Highlights included the Distinguished Alumni Awards, a live jazz band, and inspiring speeches from our keynote speakers.",
  tags: ["Past Event", "Gala", "2025"],
  agenda: [
  { time: "7:00 PM", title: "Cocktail Reception", speaker: null },
  { time: "8:00 PM", title: "Gala Dinner", speaker: null },
  { time: "9:00 PM", title: "Awards Ceremony", speaker: null }],

  attendees: [
  { name: "Sarah Johnson", role: "Product Manager", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png", avatarAlt: "Professional woman with brown hair smiling in office setting" }]

},
{
  id: 8,
  title: "Tech Industry Mixer — Fall 2025",
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0f9e7af-1767102167904.png",
  bannerAlt: "Tech professionals mingling at an industry mixer event with startup company logos displayed",
  date: "10/22/2025", time: "6:00 PM - 9:00 PM", venue: "GitHub HQ",
  city: "San Francisco", organizer: "Tech Alumni Network", attendeeCount: 112, maxAttendees: 150,
  type: "Networking", rsvpStatus: null, isFeatured: false, isOrganized: false, isPast: true,
  description: "A fantastic evening of networking for alumni in the tech industry. Hosted at GitHub HQ, the event featured demos from alumni-founded startups and panel discussions on the future of software development.",
  tags: ["Past Event", "Tech", "Networking"],
  agenda: [
  { time: "6:00 PM", title: "Welcome & Startup Demos", speaker: null },
  { time: "7:00 PM", title: "Panel Discussion", speaker: null }],

  attendees: [
  { name: "Michael Chen", role: "Software Engineer", avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f29e4eeb-1763294328932.png", avatarAlt: "Asian man in casual blue shirt with friendly expression" }]

}];


const SUB_TABS = [
{ value: 'upcoming', label: 'Upcoming Events', count: MOCK_EVENTS?.filter((e) => !e?.isPast)?.length },
{ value: 'past', label: 'Past Events', count: MOCK_EVENTS?.filter((e) => e?.isPast)?.length },
{ value: 'my-events', label: 'My Events' },
{ value: 'create', label: 'Create Event' }];


const DEFAULT_FILTERS = { search: '', type: 'All Types', city: 'All Cities', dateRange: 'Any Date' };

export default function EventsHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFilterChange = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const handleClearFilters = () => setFilters(DEFAULT_FILTERS);

  const handleRSVP = (event, action) => {
    setEvents((prev) => prev?.map((e) => e?.id === event?.id ? { ...e, rsvpStatus: action === 'cancel' ? null : action, attendeeCount: action === 'going' ? e?.attendeeCount + 1 : action === 'cancel' ? e?.attendeeCount - 1 : e?.attendeeCount } : e));
    if (action === 'going') showToast(`You're going to "${event?.title}"! 🎉`);else
    if (action === 'interested') showToast(`Marked as interested in "${event?.title}"`);else
    showToast(`RSVP cancelled for "${event?.title}"`, 'info');
  };

  const handleCreate = (form) => {
    const newEvent = {
      id: Date.now(), title: form?.title, banner: "https://img.rocket.new/generatedImages/rocket_gen_img_1d24a96b1-1766511917084.png",
      bannerAlt: "New event banner placeholder image", date: form?.date, time: form?.time,
      venue: form?.venue, city: form?.city, organizer: form?.organizer, attendeeCount: 1,
      maxAttendees: parseInt(form?.maxAttendees) || 100, type: form?.type, rsvpStatus: 'going',
      isFeatured: false, isOrganized: true, description: form?.description, tags: [form?.type],
      agenda: [], attendees: []
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${form?.title}" created successfully! 🎊`);
    setActiveTab('my-events');
  };

  const handleCancelRSVP = (event) => handleRSVP(event, 'cancel');

  const filteredEvents = useMemo(() => {
    const isPast = activeTab === 'past';
    return events?.filter((e) => {
      if (isPast !== !!e?.isPast) return false;
      if (filters?.search && !e?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && !e?.city?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
      if (filters?.type !== 'All Types' && e?.type !== filters?.type) return false;
      if (filters?.city !== 'All Cities' && e?.city !== filters?.city) return false;
      return true;
    });
  }, [events, activeTab, filters]);

  const featuredEvents = events?.filter((e) => e?.isFeatured && !e?.isPast);

  const handleTabChange = (val) => {
    if (val === 'create') {setShowCreateModal(true);return;}
    setActiveTab(val);
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <SubNavigation tabs={SUB_TABS} activeTab={activeTab} onTabChange={handleTabChange} />
      {/* Toast */}
      {toast &&
      <div className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${toast?.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
          {toast?.msg}
        </div>
      }
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">

        {/* Upcoming Events */}
        {activeTab === 'upcoming' &&
        <div className="space-y-6 md:space-y-8">
            {/* Featured Carousel */}
            {featuredEvents?.length > 0 &&
          <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-foreground">Featured Events</h2>
                  <span className="text-sm text-text-secondary">{featuredEvents?.length} featured</span>
                </div>
                <FeaturedCarousel events={featuredEvents} onViewDetail={setSelectedEvent} onRSVP={handleRSVP} />
              </section>
          }

            {/* Filters */}
            <EventFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} resultCount={filteredEvents?.length} />

            {/* Grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-foreground">All Upcoming Events</h2>
                <Button variant="default" size="sm" iconName="Plus" iconPosition="left" onClick={() => setShowCreateModal(true)}>
                  Create Event
                </Button>
              </div>
              {filteredEvents?.length === 0 ?
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <Icon name="Calendar" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
                  <p className="text-text-secondary text-sm mb-4">Try adjusting your filters or create a new event.</p>
                  <Button variant="default" iconName="Plus" iconPosition="left" onClick={() => setShowCreateModal(true)}>Create Event</Button>
                </div> :

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredEvents?.map((event) =>
              <EventCard key={event?.id} event={event} onViewDetail={setSelectedEvent} onRSVP={handleRSVP} />
              )}
                </div>
            }
            </section>
          </div>
        }

        {/* Past Events */}
        {activeTab === 'past' &&
        <div className="space-y-6">
            <EventFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} resultCount={filteredEvents?.length} />
            <section>
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Past Events</h2>
              {filteredEvents?.length === 0 ?
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <Icon name="Clock" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No past events found</h3>
                  <p className="text-text-secondary text-sm">Try adjusting your filters.</p>
                </div> :

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredEvents?.map((event) =>
              <EventCard key={event?.id} event={event} onViewDetail={setSelectedEvent} onRSVP={handleRSVP} isPast />
              )}
                </div>
            }
            </section>
          </div>
        }

        {/* My Events */}
        {activeTab === 'my-events' &&
        <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-foreground">My Events</h2>
              <Button variant="default" size="sm" iconName="Plus" iconPosition="left" onClick={() => setShowCreateModal(true)}>
                Create Event
              </Button>
            </div>
            <MyEventsPanel events={events} onViewDetail={setSelectedEvent} onCancelRSVP={handleCancelRSVP} />
          </div>
        }
      </main>
      {/* Event Detail Modal */}
      {selectedEvent &&
      <EventDetailModal
        event={events?.find((e) => e?.id === selectedEvent?.id) || selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRSVP={handleRSVP} />

      }
      {/* Create Event Modal */}
      {showCreateModal &&
      <CreateEventModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />
      }
    </div>);

}