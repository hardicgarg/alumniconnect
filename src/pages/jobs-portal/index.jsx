import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from 'components/ui/Header';
import SubNavigation from 'components/ui/SubNavigation';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import JobFilters from './components/JobFilters';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import PostJobModal from './components/PostJobModal';
import FeaturedJobs from './components/FeaturedJobs';
import ApplyModal from './components/ApplyModal';
import MyJobsPanel from './components/MyJobsPanel';

const MOCK_JOBS = [
  {
    id: 1, title: 'Senior Software Engineer', company: 'Google', location: 'San Francisco, CA',
    function: 'Engineering', experience: 'Senior (6-9 yrs)', workType: 'Hybrid', jobType: 'Full-time',
    salary: '$180K - $240K', postedDate: 'Mar 8, 2026', featured: true,
    companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&h=80&fit=crop',
    postedByAlumni: true, postedBy: 'Priya Sharma', posterRole: 'Engineering Manager', posterBatch: 'Class of 2014',
    posterAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: `We are looking for a Senior Software Engineer to join our Core Infrastructure team at Google. You will work on large-scale distributed systems that power Google's products used by billions of people worldwide. This role offers the opportunity to solve complex engineering challenges and mentor junior engineers.`,
    requirements: ['6+ years of software engineering experience', 'Proficiency in Go, Java, or C++', 'Experience with distributed systems and microservices', 'Strong problem-solving and communication skills', "Bachelor\'s degree in Computer Science or equivalent"],
    benefits: ['Health Insurance', '401(k) Match', 'Remote Flexibility', 'Learning Budget', 'Stock Options', 'Parental Leave']
  },
  {
    id: 2, title: 'Product Manager, Growth', company: 'Stripe', location: 'New York, NY',function: 'Product', experience: 'Mid Level (3-5 yrs)', workType: 'Remote', jobType: 'Full-time',salary: '$140K - $180K', postedDate: 'Mar 7, 2026', featured: true,companyLogo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=80&h=80&fit=crop',postedByAlumni: true, postedBy: 'Marcus Johnson', posterRole: 'Director of Product', posterBatch: 'Class of 2012',posterAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    description: `Stripe is seeking a Product Manager to drive growth initiatives across our payments platform. You'll work closely with engineering, design, and data science teams to identify opportunities, define product strategy, and ship features that help businesses grow their revenue.`,
    requirements: ['3-5 years of product management experience', 'Experience with B2B SaaS products', 'Strong analytical and data-driven mindset', 'Excellent stakeholder communication skills', 'Experience with A/B testing and experimentation'],
    benefits: ['Competitive Salary', 'Equity Package', 'Flexible PTO', 'Home Office Stipend', 'Health & Dental']
  },
  {
    id: 3, title: 'UX Designer, Mobile', company: 'Airbnb', location: 'Remote',
    function: 'Design', experience: 'Mid Level (3-5 yrs)', workType: 'Remote', jobType: 'Full-time',
    salary: '$120K - $155K', postedDate: 'Mar 6, 2026', featured: true,
    companyLogo: 'https://images.pixabay.com/photo/2016/11/29/09/32/concept-1868728_640.jpg',
    postedByAlumni: false, postedBy: '', posterRole: '', posterBatch: '',
    posterAvatar: '',
    description: `Join Airbnb's design team to craft beautiful, intuitive mobile experiences for millions of travelers and hosts worldwide. You'll own end-to-end design for key mobile flows, collaborating with product and engineering to ship high-quality features.`,
    requirements: ['3+ years of UX/product design experience', 'Strong portfolio showcasing mobile design work', 'Proficiency in Figma', 'Experience with user research and usability testing', 'Understanding of iOS and Android design guidelines'],
    benefits: ['Remote-first', 'Travel Credits', 'Health Insurance', 'Stock Options', 'Learning Budget']
  },
  {
    id: 4, title: 'Data Scientist', company: 'Meta', location: 'Seattle, WA',
    function: 'Engineering', experience: 'Mid Level (3-5 yrs)', workType: 'On-site', jobType: 'Full-time',
    salary: '$160K - $200K', postedDate: 'Mar 5, 2026', featured: false,
    companyLogo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop',
    postedByAlumni: true, postedBy: 'David Chen', posterRole: 'Data Science Lead', posterBatch: 'Class of 2016',
    posterAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    description: `Meta is looking for a Data Scientist to join our Ads Measurement team. You'll develop statistical models and machine learning algorithms to measure the effectiveness of advertising campaigns and help advertisers understand their ROI.`,
    requirements: ['MS or PhD in Statistics, Mathematics, or Computer Science', '3+ years of industry experience', 'Proficiency in Python, R, and SQL', 'Experience with ML frameworks (PyTorch, TensorFlow)', 'Strong communication skills for presenting findings'],
    benefits: ['Competitive Compensation', 'RSUs', 'Comprehensive Benefits', 'On-site Amenities', 'Parental Leave']
  },
  {
    id: 5, title: 'Marketing Manager, Brand', company: 'Netflix', location: 'Los Angeles, CA',function: 'Marketing', experience: 'Senior (6-9 yrs)', workType: 'Hybrid', jobType: 'Full-time',salary: '$130K - $165K', postedDate: 'Mar 4, 2026', featured: false,companyLogo: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?w=80&h=80&fit=crop',postedByAlumni: false, postedBy: '', posterRole: '', posterBatch: '',posterAvatar: '',
    description: `Netflix is seeking a Marketing Manager to lead brand campaigns for our original content slate. You'll develop integrated marketing strategies, manage agency relationships, and drive awareness for Netflix's most anticipated releases.`,
    requirements: ['6+ years of brand marketing experience', 'Experience in entertainment or media industry', 'Strong creative judgment and storytelling ability', 'Proven track record of managing large-scale campaigns', 'Excellent project management skills'],
    benefits: ['Unlimited PTO', 'Top-tier Health Benefits', 'Stock Options', 'Entertainment Perks', 'Learning Stipend']
  },
  {
    id: 6, title: 'Sales Engineer', company: 'Salesforce', location: 'Chicago, IL',function: 'Sales', experience: 'Entry Level (0-2 yrs)', workType: 'Hybrid', jobType: 'Full-time',salary: '$90K - $120K', postedDate: 'Mar 3, 2026', featured: false,companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop',postedByAlumni: true, postedBy: 'Sarah Williams', posterRole: 'VP of Sales', posterBatch: 'Class of 2010',posterAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    description: `Join Salesforce as a Sales Engineer and help our enterprise customers understand how our CRM platform can transform their business. You'll work alongside account executives to deliver technical demonstrations and build proof-of-concept solutions.`,
    requirements: ['1-2 years of technical sales or solutions engineering experience', 'Understanding of CRM concepts', 'Strong presentation and communication skills', 'Technical aptitude with ability to learn new software quickly', "Bachelor\'s degree preferred"],
    benefits: ['Base + Commission', 'Health Benefits', '401(k)', 'Volunteer Time Off', 'Career Development']
  },
  {
    id: 7, title: 'DevOps Engineer', company: 'Amazon', location: 'Austin, TX',
    function: 'Engineering', experience: 'Mid Level (3-5 yrs)', workType: 'On-site', jobType: 'Full-time',
    salary: '$145K - $185K', postedDate: 'Mar 2, 2026', featured: false,
    companyLogo: 'https://images.pixabay.com/photo/2017/01/08/21/37/office-1963988_640.jpg',
    postedByAlumni: false, postedBy: '', posterRole: '', posterBatch: '',
    posterAvatar: '',
    description: `Amazon Web Services is hiring a DevOps Engineer to help build and maintain the infrastructure that powers our cloud services. You'll work on CI/CD pipelines, infrastructure automation, and reliability engineering for mission-critical systems.`,
    requirements: ['3+ years of DevOps or SRE experience', 'Proficiency with AWS services', 'Experience with Kubernetes and Docker', 'Infrastructure as Code (Terraform, CloudFormation)', 'Strong scripting skills in Python or Bash'],
    benefits: ['Sign-on Bonus', 'RSUs', 'Comprehensive Health', 'Relocation Assistance', 'Employee Discount']
  },
  {
    id: 8, title: 'Financial Analyst', company: 'Goldman Sachs', location: 'New York, NY',function: 'Finance', experience: 'Entry Level (0-2 yrs)', workType: 'On-site', jobType: 'Full-time',salary: '$85K - $110K', postedDate: 'Mar 1, 2026', featured: false,companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop',postedByAlumni: true, postedBy: 'James Park', posterRole: 'Managing Director', posterBatch: 'Class of 2008',posterAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',description: `Goldman Sachs is seeking a Financial Analyst to join our Investment Banking division. You'll support senior bankers in executing M&A transactions, capital raises, and strategic advisory assignments for Fortune 500 clients.`,
    requirements: ["Bachelor's degree in Finance, Economics, or related field", 'Strong financial modeling skills', 'Proficiency in Excel and PowerPoint', 'Excellent analytical and quantitative skills', 'Ability to work in a fast-paced environment'],
    benefits: ['Competitive Base + Bonus', 'Health & Wellness', '401(k)', 'Professional Development', 'Gym Membership']
  },
  {
    id: 9, title: 'HR Business Partner', company: 'Microsoft', location: 'Seattle, WA',
    function: 'HR', experience: 'Senior (6-9 yrs)', workType: 'Hybrid', jobType: 'Full-time',
    salary: '$125K - $160K', postedDate: 'Feb 28, 2026', featured: false,
    companyLogo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=80&h=80&fit=crop',
    postedByAlumni: false, postedBy: '', posterRole: '', posterBatch: '',
    posterAvatar: '',
    description: `Microsoft is looking for an experienced HR Business Partner to support our Azure engineering organization. You'll partner with senior leaders to drive talent strategy, organizational effectiveness, and culture initiatives across a global team.`,
    requirements: ['6+ years of HR business partner experience', 'Experience supporting engineering or technical organizations', 'Strong coaching and consulting skills', 'Knowledge of employment law and HR best practices', 'Data-driven approach to HR decision making'],
    benefits: ['Competitive Salary', 'Stock Awards', 'Comprehensive Benefits', 'Flexible Work', 'Learning Resources']
  },
];

const TABS = [
  { label: 'All Jobs', value: 'all', count: MOCK_JOBS?.length },
  { label: 'Featured', value: 'featured', count: MOCK_JOBS?.filter(j => j?.featured)?.length },
  { label: 'Alumni Posted', value: 'alumni', count: MOCK_JOBS?.filter(j => j?.postedByAlumni)?.length },
  { label: 'My Jobs', value: 'myjobs' },
];

const DEFAULT_FILTERS = {
  location: 'All Locations', company: 'All Companies', function: 'All Functions',
  experience: 'All Levels', workType: 'All Types', alumniOnly: false, savedOnly: false
};

export default function JobsPortal() {
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set([2, 5]));
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (key, value) => setFilters(f => ({ ...f, [key]: value }));
  const handleClearAll = () => setFilters(DEFAULT_FILTERS);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters?.location !== 'All Locations') count++;
    if (filters?.company !== 'All Companies') count++;
    if (filters?.function !== 'All Functions') count++;
    if (filters?.experience !== 'All Levels') count++;
    if (filters?.workType !== 'All Types') count++;
    if (filters?.alumniOnly) count++;
    if (filters?.savedOnly) count++;
    return count;
  }, [filters]);

  const filteredJobs = useMemo(() => {
    let jobs = MOCK_JOBS;
    if (activeTab === 'featured') jobs = jobs?.filter(j => j?.featured);
    if (activeTab === 'alumni') jobs = jobs?.filter(j => j?.postedByAlumni);
    if (filters?.location !== 'All Locations') jobs = jobs?.filter(j => j?.location === filters?.location || (filters?.location === 'Remote' && j?.workType === 'Remote'));
    if (filters?.company !== 'All Companies') jobs = jobs?.filter(j => j?.company === filters?.company);
    if (filters?.function !== 'All Functions') jobs = jobs?.filter(j => j?.function === filters?.function);
    if (filters?.experience !== 'All Levels') jobs = jobs?.filter(j => j?.experience === filters?.experience);
    if (filters?.workType !== 'All Types') jobs = jobs?.filter(j => j?.workType === filters?.workType);
    if (filters?.alumniOnly) jobs = jobs?.filter(j => j?.postedByAlumni);
    if (filters?.savedOnly) jobs = jobs?.filter(j => savedJobs?.has(j?.id));
    if (searchQuery?.trim()) {
      const q = searchQuery?.toLowerCase();
      jobs = jobs?.filter(j =>
        j?.title?.toLowerCase()?.includes(q) ||
        j?.company?.toLowerCase()?.includes(q) ||
        j?.location?.toLowerCase()?.includes(q) ||
        j?.function?.toLowerCase()?.includes(q)
      );
    }
    return jobs;
  }, [activeTab, filters, searchQuery, savedJobs]);

  const featuredJobs = MOCK_JOBS?.filter(j => j?.featured);

  const handleSave = (id) => {
    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next?.has(id)) next?.delete(id); else next?.add(id);
      return next;
    });
  };

  const handlePostJobSubmit = (form) => {
    setPostedJobs(prev => [...prev, form]);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <SubNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Jobs Portal</h1>
            <p className="text-sm text-text-secondary mt-1">
              {activeTab === 'myjobs' ? 'Manage your saved and posted jobs' : `${filteredJobs?.length} opportunities found`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="default" size="default" iconName="Plus" iconPosition="left" onClick={() => setShowPostJob(true)}>
              Post a Job
            </Button>
          </div>
        </div>

        {activeTab === 'myjobs' ? (
          <MyJobsPanel
            savedJobs={savedJobs}
            postedJobs={postedJobs}
            allJobs={MOCK_JOBS}
            onView={setSelectedJob}
            onUnsave={handleSave}
          />
        ) : (
          <>
            {/* Search Bar */}
            <div className="relative mb-4">
              <Icon name="Search" size={16} color="var(--color-text-secondary)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e?.target?.value)}
                placeholder="Search jobs by title, company, location, or function..."
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground">
                  <Icon name="X" size={14} color="currentColor" />
                </button>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:block mb-6">
              <JobFilters filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} activeFilterCount={activeFilterCount} />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground w-full justify-between"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={16} color="currentColor" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <Icon name={showMobileFilters ? 'ChevronUp' : 'ChevronDown'} size={16} color="currentColor" />
              </button>
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-2"
                  >
                    <JobFilters filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} activeFilterCount={activeFilterCount} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Featured Jobs (only on 'all' tab) */}
            {activeTab === 'all' && !searchQuery && activeFilterCount === 0 && (
              <FeaturedJobs jobs={featuredJobs} onView={setSelectedJob} onSave={handleSave} savedJobs={savedJobs} />
            )}

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters?.location !== 'All Locations' && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                    <Icon name="MapPin" size={11} color="currentColor" />
                    {filters?.location}
                    <button onClick={() => handleFilterChange('location', 'All Locations')} className="ml-1 hover:text-error transition-colors">
                      <Icon name="X" size={10} color="currentColor" />
                    </button>
                  </span>
                )}
                {filters?.company !== 'All Companies' && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                    <Icon name="Building2" size={11} color="currentColor" />
                    {filters?.company}
                    <button onClick={() => handleFilterChange('company', 'All Companies')} className="ml-1 hover:text-error transition-colors">
                      <Icon name="X" size={10} color="currentColor" />
                    </button>
                  </span>
                )}
                {filters?.function !== 'All Functions' && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                    <Icon name="Briefcase" size={11} color="currentColor" />
                    {filters?.function}
                    <button onClick={() => handleFilterChange('function', 'All Functions')} className="ml-1 hover:text-error transition-colors">
                      <Icon name="X" size={10} color="currentColor" />
                    </button>
                  </span>
                )}
                {filters?.experience !== 'All Levels' && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                    <Icon name="TrendingUp" size={11} color="currentColor" />
                    {filters?.experience}
                    <button onClick={() => handleFilterChange('experience', 'All Levels')} className="ml-1 hover:text-error transition-colors">
                      <Icon name="X" size={10} color="currentColor" />
                    </button>
                  </span>
                )}
                {filters?.workType !== 'All Types' && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                    <Icon name="Laptop" size={11} color="currentColor" />
                    {filters?.workType}
                    <button onClick={() => handleFilterChange('workType', 'All Types')} className="ml-1 hover:text-error transition-colors">
                      <Icon name="X" size={10} color="currentColor" />
                    </button>
                  </span>
                )}
                {filters?.alumniOnly && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                    <Icon name="GraduationCap" size={11} color="currentColor" />
                    Alumni Posted
                    <button onClick={() => handleFilterChange('alumniOnly', false)} className="ml-1 hover:text-error transition-colors">
                      <Icon name="X" size={10} color="currentColor" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Jobs Grid */}
            {filteredJobs?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-12 text-center"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <Icon name="SearchX" size={40} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">No jobs found</h3>
                <p className="text-sm text-text-secondary mb-4">Try adjusting your filters or search query to find more opportunities.</p>
                <Button variant="outline" onClick={handleClearAll} iconName="RotateCcw" iconPosition="left">Clear Filters</Button>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab + JSON.stringify(filters) + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredJobs?.map((job, i) => (
                  <motion.div
                    key={job?.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <JobCard
                      job={job}
                      onSave={handleSave}
                      onApply={setApplyJob}
                      onView={setSelectedJob}
                      isSaved={savedJobs?.has(job?.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </main>
      {/* Modals */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={handleSave}
          isSaved={savedJobs?.has(selectedJob?.id)}
          onApply={(job) => { setSelectedJob(null); setApplyJob(job); }}
        />
      )}
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      {showPostJob && <PostJobModal onClose={() => setShowPostJob(false)} onSubmit={handlePostJobSubmit} />}
    </div>
  );
}