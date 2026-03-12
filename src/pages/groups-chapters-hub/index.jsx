import React, { useState, useMemo } from 'react';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import GroupCard from './components/GroupCard';
import GroupDetailModal from './components/GroupDetailModal';
import GroupFilters from './components/GroupFilters';

const GROUPS_DATA = [
{
  id: 1,
  name: 'NYC Alumni Chapter',
  type: 'Chapter',
  location: 'New York, NY',
  description: 'The official New York City chapter for all alumni. We host monthly mixers, career panels, and cultural events across the five boroughs. A thriving community of 1,200+ professionals.',
  banner: "https://images.unsplash.com/photo-1672250679463-1e1f85ea4cdc",
  bannerAlt: 'New York City skyline at dusk with iconic skyscrapers and warm golden light',
  emoji: '🗽',
  color: '#1C1C1C',
  memberCount: 1247,
  postCount: 48,
  eventCount: 12,
  activityLevel: 'Very Active',
  isMember: true,
  isFeatured: true
},
{
  id: 2,
  name: 'Class of 2015',
  type: 'Batch',
  location: 'Global',
  description: 'The official group for the graduating class of 2015. Reconnect with your batchmates, share milestones, and celebrate 10+ years of post-graduation journeys together.',
  banner: "https://images.unsplash.com/photo-1656910962409-3963e280c7d2",
  bannerAlt: 'University graduation ceremony with students in caps and gowns on a sunny day',
  emoji: '🎓',
  color: '#E8C547',
  memberCount: 342,
  postCount: 22,
  eventCount: 4,
  activityLevel: 'Active',
  isMember: true,
  isFeatured: true
},
{
  id: 3,
  name: 'Product & Startup Network',
  type: 'Interest',
  location: 'Global (Remote)',
  description: 'A community for alumni building products and startups. Share fundraising insights, product learnings, hiring tips, and co-founder connections. Weekly async discussions and monthly live sessions.',
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_161a5455c-1766757515849.png",
  bannerAlt: 'Startup team collaborating around a whiteboard with sticky notes and laptops in a modern office',
  emoji: '🚀',
  color: '#6366F1',
  memberCount: 891,
  postCount: 67,
  eventCount: 8,
  activityLevel: 'Very Active',
  isMember: false,
  isFeatured: true
},
{
  id: 4,
  name: 'Bay Area Tech Alumni',
  type: 'Chapter',
  location: 'San Francisco, CA',
  description: 'Silicon Valley\'s premier alumni network for tech professionals. From FAANG engineers to early-stage founders, we connect the Bay Area alumni ecosystem through curated events and peer learning.',
  banner: "https://img.rocket.new/generatedImages/rocket_gen_img_18d94a9a2-1772900963176.png",
  bannerAlt: 'San Francisco Bay Area aerial view with Golden Gate Bridge and city skyline at sunset',
  emoji: '🌉',
  color: '#0EA5E9',
  memberCount: 1089,
  postCount: 54,
  eventCount: 15,
  activityLevel: 'Very Active',
  isMember: false,
  isFeatured: false
},
{
  id: 5,
  name: 'Women in Leadership',
  type: 'Interest',
  location: 'Global',
  description: 'Empowering female alumni through mentorship, leadership development, and community. Monthly speaker series featuring C-suite alumni, peer coaching circles, and a curated job board.',
  banner: "https://images.unsplash.com/photo-1623121740198-7fe04fa0c362",
  bannerAlt: 'Group of professional women in a collaborative meeting room with natural lighting',
  emoji: '💼',
  color: '#EC4899',
  memberCount: 567,
  postCount: 31,
  eventCount: 6,
  activityLevel: 'Active',
  isMember: false,
  isFeatured: false
},
{
  id: 6,
  name: 'Finance & Investment Circle',
  type: 'Professional',
  location: 'New York / London',
  description: 'Exclusive network for alumni in finance, investment banking, private equity, and venture capital. Deal flow sharing, career transitions, and quarterly in-person dinners in NYC and London.',
  banner: "https://images.unsplash.com/photo-1519811803197-8f5e4a07bead",
  bannerAlt: 'Financial district skyline with glass skyscrapers reflecting sunlight in a major city',
  emoji: '📈',
  color: '#059669',
  memberCount: 423,
  postCount: 19,
  eventCount: 5,
  activityLevel: 'Active',
  isMember: false,
  isFeatured: false
},
{
  id: 7,
  name: 'Chicago Alumni Network',
  type: 'Chapter',
  location: 'Chicago, IL',
  description: 'The Windy City\'s alumni community. Quarterly networking events, annual gala, and a strong presence in consulting, finance, and healthcare industries. Join 600+ Chicago-based alumni.',
  banner: "https://images.unsplash.com/photo-1489031911874-39bfa7aeed34",
  bannerAlt: 'Chicago city skyline with Lake Michigan and iconic architecture on a clear day',
  emoji: '🌆',
  color: '#7C3AED',
  memberCount: 634,
  postCount: 28,
  eventCount: 7,
  activityLevel: 'Active',
  isMember: false,
  isFeatured: false
},
{
  id: 8,
  name: 'Class of 2020',
  type: 'Batch',
  location: 'Global',
  description: 'The pandemic class that graduated into a transformed world. Share your unique career journey, connect with batchmates across industries, and celebrate 5 years of resilience and growth.',
  banner: "https://images.unsplash.com/photo-1594788094620-4579ad50c7fe",
  bannerAlt: 'Virtual graduation ceremony with students celebrating on video call screens',
  emoji: '🎯',
  color: '#F59E0B',
  memberCount: 289,
  postCount: 15,
  eventCount: 3,
  activityLevel: 'Moderate',
  isMember: false,
  isFeatured: false
}];


export default function GroupsChaptersHub() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filters, setFilters] = useState({ type: 'All', activity: 'All' });
  const [search, setSearch] = useState('');

  const filteredGroups = useMemo(() => {
    return GROUPS_DATA?.filter((g) => {
      const matchType = filters?.type === 'All' || g?.type === filters?.type;
      const matchActivity = filters?.activity === 'All' || g?.activityLevel === filters?.activity;
      const matchSearch = !search || g?.name?.toLowerCase()?.includes(search?.toLowerCase()) || g?.description?.toLowerCase()?.includes(search?.toLowerCase());
      return matchType && matchActivity && matchSearch;
    });
  }, [filters, search]);

  const featuredGroups = GROUPS_DATA?.filter((g) => g?.isFeatured);
  const myGroups = GROUPS_DATA?.filter((g) => g?.isMember);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Groups & Chapters</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">Connect with alumni communities by location, batch, or interest</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left" iconSize={16}>
            Create Group
          </Button>
        </div>

        {/* My Groups */}
        {myGroups?.length > 0 &&
        <div className="mb-8">
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
              <Icon name="UserCheck" size={16} color="var(--color-primary)" />
              My Groups
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {myGroups?.map((group) =>
            <button
              key={group?.id}
              onClick={() => setSelectedGroup(group)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] hover:shadow-md transition-all flex-shrink-0"
              style={{ boxShadow: 'var(--shadow-sm)' }}>
              
                  <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-[var(--color-primary-foreground)]"
                style={{ background: group?.color }}>
                
                    {group?.emoji}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[var(--color-foreground)] whitespace-nowrap">{group?.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{group?.memberCount?.toLocaleString()} members</p>
                  </div>
                </button>
            )}
            </div>
          </div>
        }

        {/* Featured Groups */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
            <Icon name="Star" size={16} color="var(--color-primary)" />
            Featured Communities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredGroups?.map((group) =>
            <GroupCard key={group?.id} group={group} onViewGroup={setSelectedGroup} />
            )}
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-5 space-y-3">
          <div className="relative">
            <Icon name="Search" size={16} color="var(--color-text-secondary)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search groups by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e?.target?.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition-all" />
            
          </div>
          <GroupFilters filters={filters} onChange={setFilters} />
        </div>

        {/* All Groups Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[var(--color-foreground)]">
              All Groups
              <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">({filteredGroups?.length})</span>
            </h2>
          </div>

          {filteredGroups?.length === 0 ?
          <div className="text-center py-16 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)]">
              <Icon name="Users" size={40} color="var(--color-border)" className="mx-auto mb-3" />
              <p className="text-[var(--color-text-secondary)] font-medium">No groups found</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Try adjusting your filters or search term</p>
            </div> :

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGroups?.map((group) =>
            <GroupCard key={group?.id} group={group} onViewGroup={setSelectedGroup} />
            )}
            </div>
          }
        </div>
      </main>
      {/* Group Detail Modal */}
      {selectedGroup &&
      <GroupDetailModal group={selectedGroup} onClose={() => setSelectedGroup(null)} />
      }
    </div>);

}