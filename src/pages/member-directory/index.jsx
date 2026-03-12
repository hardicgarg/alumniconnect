import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

import FilterToolbar from './components/FilterToolbar';
import MemberCard from './components/MemberCard';
import MemberListRow from './components/MemberListRow';
import MemberProfileModal from './components/MemberProfileModal';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import EmptyState from './components/EmptyState';

const MEMBERS_DATA = [
{
  id: 1,
  name: "Sarah Johnson",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aaf46fcd-1773137917081.png",
  avatarAlt: "Professional woman with warm smile wearing business casual attire in modern office setting",
  role: "Senior Product Manager",
  company: "Google",
  batch: "Class of 2015",
  batchYear: "2015",
  location: "San Francisco, CA",
  industry: "Technology",
  function: "Product",
  chapter: "SF Bay Area",
  isOnline: true,
  isConnected: false,
  mutualConnections: 12,
  expertise: ["Product Strategy", "UX Research", "Agile", "Data Analytics"],
  interests: ["Hiking", "Photography", "Startups"],
  bio: "Passionate product leader with 9 years of experience building consumer products at scale. Love connecting with fellow alumni and mentoring early-career professionals.",
  careerHistory: [
  { role: "Senior Product Manager", company: "Google", period: "2020 – Present" },
  { role: "Product Manager", company: "Airbnb", period: "2017 – 2020" },
  { role: "Associate PM", company: "Salesforce", period: "2015 – 2017" }],

  education: [
  { degree: "MBA, Business Administration", school: "Stanford GSB", year: "2015" },
  { degree: "B.S. Computer Science", school: "UC Berkeley", year: "2012" }]

},
{
  id: 2,
  name: "Michael Chen",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17550fd67-1763295501645.png",
  avatarAlt: "Asian man in professional attire with confident expression against neutral background",
  role: "Staff Software Engineer",
  company: "Meta",
  batch: "Class of 2018",
  batchYear: "2018",
  location: "Seattle, WA",
  industry: "Technology",
  function: "Engineering",
  chapter: "Seattle",
  isOnline: false,
  isConnected: true,
  mutualConnections: 8,
  expertise: ["React", "Node.js", "System Design", "Machine Learning"],
  interests: ["Open Source", "Chess", "Cycling"],
  bio: "Full-stack engineer specializing in large-scale distributed systems. Contributor to several open-source projects and passionate about developer tooling.",
  careerHistory: [
  { role: "Staff Software Engineer", company: "Meta", period: "2021 – Present" },
  { role: "Senior Engineer", company: "Twitter", period: "2018 – 2021" }],

  education: [
  { degree: "M.S. Computer Science", school: "Carnegie Mellon University", year: "2018" },
  { degree: "B.S. Computer Engineering", school: "University of Michigan", year: "2016" }]

},
{
  id: 3,
  name: "Emily Rodriguez",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_183106c5b-1763295018262.png",
  avatarAlt: "Latina woman with bright smile in professional setting wearing elegant blouse",
  role: "VP of Marketing",
  company: "Stripe",
  batch: "Class of 2013",
  batchYear: "2013",
  location: "New York, NY",
  industry: "Finance",
  function: "Marketing",
  chapter: "New York",
  isOnline: true,
  isConnected: false,
  mutualConnections: 5,
  expertise: ["Brand Strategy", "Growth Marketing", "Content", "B2B SaaS"],
  interests: ["Travel", "Wine", "Yoga"],
  bio: "Marketing executive with a track record of scaling fintech brands from Series B to IPO. Passionate about storytelling and building communities.",
  careerHistory: [
  { role: "VP of Marketing", company: "Stripe", period: "2019 – Present" },
  { role: "Director of Marketing", company: "Square", period: "2015 – 2019" },
  { role: "Marketing Manager", company: "PayPal", period: "2013 – 2015" }],

  education: [
  { degree: "B.A. Communications", school: "Northwestern University", year: "2013" }]

},
{
  id: 4,
  name: "David Kim",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f371dfbb-1772539234310.png",
  avatarAlt: "Korean-American man in smart casual clothing with friendly expression outdoors",
  role: "Principal Data Scientist",
  company: "Amazon",
  batch: "Class of 2016",
  batchYear: "2016",
  location: "Seattle, WA",
  industry: "Technology",
  function: "Data Science",
  chapter: "Seattle",
  isOnline: false,
  isConnected: false,
  mutualConnections: 3,
  expertise: ["Python", "ML Ops", "NLP", "Statistical Modeling"],
  interests: ["Basketball", "Cooking", "AI Ethics"],
  bio: "Data scientist building recommendation systems that serve hundreds of millions of customers. Interested in responsible AI and mentoring underrepresented groups in tech.",
  careerHistory: [
  { role: "Principal Data Scientist", company: "Amazon", period: "2020 – Present" },
  { role: "Senior Data Scientist", company: "Microsoft", period: "2016 – 2020" }],

  education: [
  { degree: "Ph.D. Statistics", school: "University of Washington", year: "2016" },
  { degree: "B.S. Mathematics", school: "UCLA", year: "2011" }]

},
{
  id: 5,
  name: "Jessica Park",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11edb8861-1772475034213.png",
  avatarAlt: "Young professional woman with glasses and confident smile in modern workspace",
  role: "UX Design Lead",
  company: "Apple",
  batch: "Class of 2019",
  batchYear: "2019",
  location: "San Francisco, CA",
  industry: "Technology",
  function: "Design",
  chapter: "SF Bay Area",
  isOnline: true,
  isConnected: false,
  mutualConnections: 7,
  expertise: ["Figma", "Design Systems", "User Research", "Prototyping"],
  interests: ["Illustration", "Ceramics", "Indie Games"],
  bio: "Design lead crafting intuitive experiences for Apple\'s productivity suite. Advocate for accessibility-first design and inclusive product development.",
  careerHistory: [
  { role: "UX Design Lead", company: "Apple", period: "2022 – Present" },
  { role: "Senior UX Designer", company: "Figma", period: "2019 – 2022" }],

  education: [
  { degree: "M.F.A. Interaction Design", school: "RISD", year: "2019" },
  { degree: "B.A. Visual Arts", school: "NYU", year: "2017" }]

},
{
  id: 6,
  name: "Ryan Thompson",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6c8dc3c-1772920738288.png",
  avatarAlt: "Caucasian man in business casual attire smiling in bright modern office environment",
  role: "Investment Director",
  company: "Goldman Sachs",
  batch: "Class of 2012",
  batchYear: "2012",
  location: "New York, NY",
  industry: "Finance",
  function: "Finance",
  chapter: "New York",
  isOnline: false,
  isConnected: true,
  mutualConnections: 15,
  expertise: ["Private Equity", "M&A", "Valuation", "Portfolio Management"],
  interests: ["Golf", "Sailing", "Classical Music"],
  bio: "Investment professional with 12 years in private equity and M&A. Passionate about connecting alumni with investment opportunities and career transitions into finance.",
  careerHistory: [
  { role: "Investment Director", company: "Goldman Sachs", period: "2018 – Present" },
  { role: "Associate", company: "JP Morgan", period: "2014 – 2018" },
  { role: "Analyst", company: "Morgan Stanley", period: "2012 – 2014" }],

  education: [
  { degree: "MBA, Finance", school: "Wharton School", year: "2012" },
  { degree: "B.S. Economics", school: "Duke University", year: "2010" }]

},
{
  id: 7,
  name: "Amanda Foster",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f68abc01-1772169291780.png",
  avatarAlt: "Professional woman with auburn hair in corporate attire against white background",
  role: "Senior Consultant",
  company: "McKinsey",
  batch: "Class of 2020",
  batchYear: "2020",
  location: "Chicago, IL",
  industry: "Consulting",
  function: "Operations",
  chapter: "Chicago",
  isOnline: true,
  isConnected: false,
  mutualConnections: 4,
  expertise: ["Strategy", "Operations", "Healthcare", "Digital Transformation"],
  interests: ["Running", "Podcasting", "Social Impact"],
  bio: "Management consultant specializing in healthcare and digital transformation. Passionate about using business strategy to drive social impact.",
  careerHistory: [
  { role: "Senior Consultant", company: "McKinsey", period: "2022 – Present" },
  { role: "Consultant", company: "McKinsey", period: "2020 – 2022" }],

  education: [
  { degree: "MBA", school: "Harvard Business School", year: "2020" },
  { degree: "B.S. Biology", school: "Vanderbilt University", year: "2016" }]

},
{
  id: 8,
  name: "Kevin Patel",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15d02d289-1763295742851.png",
  avatarAlt: "South Asian man with warm smile wearing casual professional attire in outdoor setting",
  role: "Founder & CEO",
  company: "Airbnb",
  batch: "Class of 2014",
  batchYear: "2014",
  location: "Austin, TX",
  industry: "Technology",
  function: "Engineering",
  chapter: "Austin",
  isOnline: false,
  isConnected: false,
  mutualConnections: 9,
  expertise: ["Entrepreneurship", "Fundraising", "Product", "Team Building"],
  interests: ["Meditation", "Venture Capital", "Cricket"],
  bio: "Serial entrepreneur on my third startup. Previously built and sold two SaaS companies. Love connecting with fellow alumni founders and sharing lessons learned.",
  careerHistory: [
  { role: "Founder & CEO", company: "NexaFlow (Startup)", period: "2021 – Present" },
  { role: "VP Engineering", company: "Airbnb", period: "2017 – 2021" },
  { role: "Software Engineer", company: "Dropbox", period: "2014 – 2017" }],

  education: [
  { degree: "B.S. Computer Science", school: "Georgia Tech", year: "2014" }]

},
{
  id: 9,
  name: "Lauren Mitchell",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1be083628-1763295166167.png",
  avatarAlt: "Young woman with natural hair and bright smile in creative studio environment",
  role: "Creative Director",
  company: "Deloitte",
  batch: "Class of 2017",
  batchYear: "2017",
  location: "Los Angeles, CA",
  industry: "Consulting",
  function: "Design",
  chapter: "Los Angeles",
  isOnline: true,
  isConnected: false,
  mutualConnections: 2,
  expertise: ["Brand Identity", "Creative Strategy", "Motion Design", "Art Direction"],
  interests: ["Film", "Street Art", "Surfing"],
  bio: "Creative director blending design thinking with business strategy. Lead creative for Deloitte Digital\'s West Coast practice.",
  careerHistory: [
  { role: "Creative Director", company: "Deloitte Digital", period: "2021 – Present" },
  { role: "Senior Designer", company: "IDEO", period: "2017 – 2021" }],

  education: [
  { degree: "B.F.A. Graphic Design", school: "Art Center College of Design", year: "2017" }]

},
{
  id: 10,
  name: "James Wilson",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1193541d9-1772958372819.png",
  avatarAlt: "African American man in professional suit with confident posture in corporate lobby",
  role: "Healthcare Director",
  company: "Microsoft",
  batch: "Class of 2010",
  batchYear: "2010",
  location: "Boston, MA",
  industry: "Healthcare",
  function: "Operations",
  chapter: "Boston",
  isOnline: false,
  isConnected: false,
  mutualConnections: 6,
  expertise: ["Healthcare IT", "Digital Health", "Policy", "Partnerships"],
  interests: ["Basketball", "Public Health", "Mentorship"],
  bio: "Healthcare technology leader driving digital transformation in clinical settings. Passionate about health equity and expanding access to quality care through technology.",
  careerHistory: [
  { role: "Healthcare Director", company: "Microsoft", period: "2019 – Present" },
  { role: "Senior Manager", company: "Philips Healthcare", period: "2013 – 2019" },
  { role: "Analyst", company: "Accenture", period: "2010 – 2013" }],

  education: [
  { degree: "MPH, Health Policy", school: "Johns Hopkins", year: "2010" },
  { degree: "B.S. Biology", school: "Howard University", year: "2008" }]

},
{
  id: 11,
  name: "Priya Sharma",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0883a0c-1763299171534.png",
  avatarAlt: "Indian woman in elegant professional attire with confident expression in modern office",
  role: "Engineering Manager",
  company: "Salesforce",
  batch: "Class of 2021",
  batchYear: "2021",
  location: "San Francisco, CA",
  industry: "Technology",
  function: "Engineering",
  chapter: "SF Bay Area",
  isOnline: true,
  isConnected: false,
  mutualConnections: 11,
  expertise: ["Team Leadership", "Java", "Cloud Architecture", "Agile"],
  interests: ["Kathak Dance", "Cooking", "Women in Tech"],
  bio: "Engineering manager leading a team of 12 engineers building Salesforce\'s next-gen CRM platform. Advocate for diversity in tech and active mentor.",
  careerHistory: [
  { role: "Engineering Manager", company: "Salesforce", period: "2023 – Present" },
  { role: "Senior Software Engineer", company: "Salesforce", period: "2021 – 2023" }],

  education: [
  { degree: "M.S. Software Engineering", school: "USC", year: "2021" },
  { degree: "B.Tech Computer Science", school: "IIT Bombay", year: "2019" }]

},
{
  id: 12,
  name: "Carlos Mendez",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1602376d6-1763294838474.png",
  avatarAlt: "Hispanic man with beard in casual professional clothing smiling in outdoor urban setting",
  role: "Real Estate Attorney",
  company: "Goldman Sachs",
  batch: "Class of 2022",
  batchYear: "2022",
  location: "Miami, FL",
  industry: "Legal",
  function: "Legal",
  chapter: "New York",
  isOnline: false,
  isConnected: false,
  mutualConnections: 1,
  expertise: ["Real Estate Law", "Contract Negotiation", "Corporate Law", "M&A"],
  interests: ["Soccer", "Latin Music", "Entrepreneurship"],
  bio: "Real estate and corporate attorney specializing in commercial transactions and development projects across the Southeast US.",
  careerHistory: [
  { role: "Associate Attorney", company: "Greenberg Traurig", period: "2022 – Present" }],

  education: [
  { degree: "J.D.", school: "University of Miami School of Law", year: "2022" },
  { degree: "B.A. Political Science", school: "Florida State University", year: "2019" }]

}];


const SORT_OPTIONS = [
{ value: 'name', label: 'Name A–Z' },
{ value: 'batch_desc', label: 'Newest Batch' },
{ value: 'batch_asc', label: 'Oldest Batch' },
{ value: 'mutual', label: 'Most Mutual Connections' }];


const DEFAULT_FILTERS = { batch: '', location: '', industry: '', company: '', function: '', chapter: '' };

export default function MemberDirectory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('name');
  const [selectedMember, setSelectedMember] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
  }, []);

  const filteredMembers = useMemo(() => {
    let result = [...MEMBERS_DATA];

    if (search?.trim()) {
      const q = search?.toLowerCase();
      result = result?.filter((m) =>
      m?.name?.toLowerCase()?.includes(q) ||
      m?.role?.toLowerCase()?.includes(q) ||
      m?.company?.toLowerCase()?.includes(q) ||
      m?.location?.toLowerCase()?.includes(q) ||
      m?.industry?.toLowerCase()?.includes(q) ||
      m?.expertise?.some((e) => e?.toLowerCase()?.includes(q))
      );
    }

    if (filters?.batch) result = result?.filter((m) => m?.batchYear === filters?.batch);
    if (filters?.location) result = result?.filter((m) => m?.location === filters?.location);
    if (filters?.industry) result = result?.filter((m) => m?.industry === filters?.industry);
    if (filters?.company) result = result?.filter((m) => m?.company === filters?.company);
    if (filters?.function) result = result?.filter((m) => m?.function === filters?.function);
    if (filters?.chapter) result = result?.filter((m) => m?.chapter === filters?.chapter);

    result?.sort((a, b) => {
      if (sort === 'name') return a?.name?.localeCompare(b?.name);
      if (sort === 'batch_desc') return parseInt(b?.batchYear) - parseInt(a?.batchYear);
      if (sort === 'batch_asc') return parseInt(a?.batchYear) - parseInt(b?.batchYear);
      if (sort === 'mutual') return b?.mutualConnections - a?.mutualConnections;
      return 0;
    });

    return result;
  }, [search, filters, sort]);

  const handleMessage = useCallback((member) => {
    navigate('/messaging-interface');
  }, [navigate]);

  const currentSortLabel = SORT_OPTIONS?.find((o) => o?.value === sort)?.label || 'Sort';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      {/* Page Header */}
      <div className="bg-[var(--color-card)] border-b border-[var(--color-border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">Member Directory</h1>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] mt-1">
                Discover and connect with <span className="font-semibold text-[var(--color-foreground)]">{MEMBERS_DATA?.length?.toLocaleString()}+</span> alumni from your community
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                iconName="UserPlus"
                iconPosition="left"
                iconSize={15}
                onClick={() => navigate('/dashboard')}>
                
                Invite Alumni
              </Button>
            </div>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6">
        {/* Filter Toolbar */}
        <FilterToolbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          resultCount={filteredMembers?.length}
          totalCount={MEMBERS_DATA?.length} />
        

        {/* Controls Row */}
        <div className="flex items-center justify-between mb-4 md:mb-5 gap-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            <span className="font-semibold text-[var(--color-foreground)]">{filteredMembers?.length}</span> result{filteredMembers?.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-all duration-200">
                
                <Icon name="ArrowUpDown" size={14} color="currentColor" />
                <span className="hidden sm:inline">{currentSortLabel}</span>
                <Icon name="ChevronDown" size={13} color="currentColor" className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen &&
              <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute top-full right-0 mt-1 w-48 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden z-20" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    {SORT_OPTIONS?.map((opt) =>
                  <button
                    key={opt?.value}
                    onClick={() => {setSort(opt?.value);setSortOpen(false);}}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                    sort === opt?.value ?
                    'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium' :
                    'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'}`
                    }>
                    
                        {opt?.label}
                      </button>
                  )}
                  </div>
                </>
              }
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>
        </div>

        {/* List Header (list view only) */}
        {view === 'list' && filteredMembers?.length > 0 &&
        <div className="hidden md:flex items-center gap-4 px-5 py-2 bg-[var(--color-muted)] rounded-t-xl border border-[var(--color-border)] border-b-0 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
            <div className="w-10 md:w-12 flex-shrink-0" />
            <div className="flex-1">Name / Role</div>
            <div className="w-36 flex-shrink-0">Location</div>
            <div className="hidden lg:block w-28 flex-shrink-0">Industry</div>
            <div className="hidden lg:block w-28 flex-shrink-0">Chapter</div>
            <div className="flex-shrink-0 w-40" />
          </div>
        }

        {/* Members Grid / List */}
        {filteredMembers?.length === 0 ?
        <EmptyState onClearFilters={handleClearAll} /> :
        view === 'grid' ?
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}>
          
            {filteredMembers?.map((member, idx) =>
          <motion.div
            key={member?.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}>
            
                <MemberCard
              member={member}
              onViewProfile={setSelectedMember}
              onMessage={handleMessage} />
            
              </motion.div>
          )}
          </motion.div> :

        <motion.div
          className={`bg-[var(--color-card)] border border-[var(--color-border)] ${filteredMembers?.length > 0 ? 'rounded-b-2xl rounded-t-none md:rounded-t-none' : 'rounded-2xl'} overflow-hidden`}
          style={{ boxShadow: 'var(--shadow-sm)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}>
          
            {filteredMembers?.map((member, idx) =>
          <motion.div
            key={member?.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.03 }}>
            
                <MemberListRow
              member={member}
              onViewProfile={setSelectedMember}
              onMessage={handleMessage} />
            
              </motion.div>
          )}
          </motion.div>
        }

        {/* Stats Footer */}
        {filteredMembers?.length > 0 &&
        <div className="mt-6 md:mt-8 flex flex-wrap gap-4 md:gap-6 justify-center">
            {[
          { label: 'Total Alumni', value: MEMBERS_DATA?.length, icon: 'Users' },
          { label: 'Industries', value: '10+', icon: 'Briefcase' },
          { label: 'Cities', value: '8+', icon: 'MapPin' },
          { label: 'Batches', value: '15+', icon: 'GraduationCap' }]?.
          map((stat) =>
          <div key={stat?.label} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                  <Icon name={stat?.icon} size={14} color="var(--color-primary-foreground)" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-foreground)] leading-none">{stat?.value}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-none mt-0.5">{stat?.label}</p>
                </div>
              </div>
          )}
          </div>
        }
      </div>
      {/* Member Profile Modal */}
      {selectedMember &&
      <MemberProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onMessage={handleMessage} />

      }
    </div>);

}