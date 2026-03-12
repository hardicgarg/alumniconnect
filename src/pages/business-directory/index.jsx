import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import BusinessCard from './components/BusinessCard';
import BusinessDetailModal from './components/BusinessDetailModal';
import AddBusinessModal from './components/AddBusinessModal';

const BUSINESSES_DATA = [
{
  id: 1,
  name: "NexaFlow",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15c0206ee-1769057435006.png",
  founderName: "Kevin Patel",
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15c0206ee-1769057435006.png",
  founderBatch: "Class of 2014",
  founderRole: "Founder & CEO",
  category: "Technology",
  city: "Austin, TX",
  founded: "2021",
  description: "AI-powered workflow automation platform helping mid-market companies eliminate repetitive tasks and scale operations without adding headcount.",
  about: "NexaFlow is a next-generation workflow automation platform that leverages AI to help businesses streamline operations. Founded by alumni Kevin Patel after his tenure at Airbnb, NexaFlow has grown to serve 200+ enterprise clients across North America.",
  services: ["Workflow Automation", "AI Integration", "Process Consulting", "API Development", "Enterprise SaaS"],
  website: "https://nexaflow.io",
  email: "hello@nexaflow.io",
  featured: true
},
{
  id: 2,
  name: "Meridian Capital Advisors",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1bdc25cf9-1773171536996.png",
  founderName: "Ryan Thompson",
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bdc25cf9-1773171536996.png",
  founderBatch: "Class of 2012",
  founderRole: "Managing Partner",
  category: "Finance",
  city: "New York, NY",
  founded: "2020",
  description: "Boutique investment advisory firm specializing in growth-stage private equity and M&A advisory for technology and healthcare companies.",
  about: "Meridian Capital Advisors was founded by Ryan Thompson to bring institutional-grade investment advisory services to growth-stage companies. With deep expertise in PE and M&A, the firm has closed over $500M in transactions.",
  services: ["M&A Advisory", "Private Equity", "Capital Raising", "Valuation", "Due Diligence"],
  website: "https://meridiancapital.com",
  email: "info@meridiancapital.com",
  featured: true
},
{
  id: 3,
  name: "Clarity Health",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_125853714-1772098070562.png",
  founderName: "Amanda Foster",
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_125853714-1772098070562.png",
  founderBatch: "Class of 2020",
  founderRole: "Co-Founder & COO",
  category: "Healthcare",
  city: "Chicago, IL",
  founded: "2022",
  description: "Digital health platform connecting patients with specialized mental health providers through AI-powered matching and telehealth infrastructure.",
  about: "Clarity Health is on a mission to make mental healthcare accessible and affordable. Co-founded by Amanda Foster after her work in healthcare consulting at McKinsey, the platform has matched over 50,000 patients with therapists.",
  services: ["Telehealth", "Mental Health Matching", "Provider Network", "Insurance Integration", "Care Coordination"],
  website: "https://clarityhealth.co",
  email: "support@clarityhealth.co",
  featured: false
},
{
  id: 4,
  name: "DataLens Analytics",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_143a21815-1764651949320.png",
  founderName: "David Kim",
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143a21815-1764651949320.png",
  founderBatch: "Class of 2016",
  founderRole: "Founder & CTO",
  category: "Technology",
  city: "Seattle, WA",
  founded: "2023",
  description: "Self-serve analytics platform that turns raw data into actionable business intelligence dashboards in minutes, no SQL required.",
  about: "DataLens was born out of David Kim's frustration with complex BI tools during his time at Amazon. The platform democratizes data analytics for non-technical teams, enabling anyone to build powerful dashboards without writing a single line of code.",
  services: ["Business Intelligence", "Data Visualization", "ETL Pipelines", "Dashboard Templates", "Data Consulting"],
  website: "https://datalens.ai",
  email: "team@datalens.ai",
  featured: false
},
{
  id: 5,
  name: "Pixel & Craft Studio",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18e6b06cb-1772140511493.png",
  founderName: "Jessica Park",
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18e6b06cb-1772140511493.png",
  founderBatch: "Class of 2019",
  founderRole: "Founder & Creative Director",
  category: "Media",
  city: "San Francisco, CA",
  founded: "2022",
  description: "Award-winning design studio specializing in brand identity, product design systems, and digital experiences for early-stage startups.",
  about: "Pixel & Craft Studio was founded by Jessica Park after her time at Apple and Figma. The studio has worked with 80+ startups to build memorable brand identities and design systems that scale.",
  services: ["Brand Identity", "Design Systems", "UI/UX Design", "Motion Design", "Design Sprints"],
  website: "https://pixelcraft.studio",
  email: "hello@pixelcraft.studio",
  featured: true
},
{
  id: 6,
  name: "GrowthStack",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_104ad48bd-1767654359014.png",
  founderName: "Emily Rodriguez",
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_104ad48bd-1767654359014.png",
  founderBatch: "Class of 2013",
  founderRole: "Founder & CEO",
  category: "Consulting",
  city: "New York, NY",
  founded: "2021",
  description: "Growth marketing consultancy helping Series A–C fintech and SaaS companies build scalable acquisition engines and brand narratives.",
  about: "GrowthStack was founded by Emily Rodriguez after her decade-long career scaling brands at Stripe and Square. The consultancy specializes in helping funded startups build their go-to-market strategy and growth infrastructure from the ground up.",
  services: ["Growth Strategy", "Performance Marketing", "Brand Positioning", "Content Marketing", "GTM Planning"],
  website: "https://growthstack.co",
  email: "emily@growthstack.co",
  featured: false
}];


const CATEGORIES = ['All', 'Technology', 'Finance', 'Healthcare', 'Consulting', 'Media', 'Education', 'Other'];

export default function BusinessDirectory() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(() => {
    return BUSINESSES_DATA?.filter((b) => {
      const matchSearch = !search || b?.name?.toLowerCase()?.includes(search?.toLowerCase()) || b?.founderName?.toLowerCase()?.includes(search?.toLowerCase()) || b?.description?.toLowerCase()?.includes(search?.toLowerCase());
      const matchCat = selectedCategory === 'All' || b?.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  const featured = filtered?.filter((b) => b?.featured);
  const rest = filtered?.filter((b) => !b?.featured);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">Business Directory</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Discover and connect with alumni-owned businesses</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left" iconSize={15} onClick={() => setShowAddModal(true)}>
            List Your Business
          </Button>
        </div>

        {/* Search + Filters */}
        <div className="bg-[var(--color-card)] rounded-2xl p-3 sm:p-4 border border-[var(--color-border)] mb-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Icon name="Search" size={16} color="var(--color-text-secondary)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e?.target?.value)}
                placeholder="Search businesses, founders..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES?.map((cat) =>
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${selectedCategory === cat ? 'text-[var(--color-primary-foreground)]' : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'}`}
                style={selectedCategory === cat ? { background: 'var(--color-primary)' } : {}}>
                  {cat}
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-3">{filtered?.length} business{filtered?.length !== 1 ? 'es' : ''} found</p>
        </div>

        {/* Featured */}
        {featured?.length > 0 &&
        <div className="mb-8">
            <h2 className="text-base font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <Icon name="Star" size={16} color="var(--color-primary)" />
              Featured Businesses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured?.map((b, i) =>
            <motion.div key={b?.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <BusinessCard business={b} onClick={setSelectedBusiness} />
                </motion.div>
            )}
            </div>
          </div>
        }

        {/* All Listings */}
        {rest?.length > 0 &&
        <div>
            <h2 className="text-base font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <Icon name="Building2" size={16} color="var(--color-primary)" />
              All Businesses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest?.map((b, i) =>
            <motion.div key={b?.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <BusinessCard business={b} onClick={setSelectedBusiness} />
                </motion.div>
            )}
            </div>
          </div>
        }

        {filtered?.length === 0 &&
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(232,197,71,0.1)' }}>
              <Icon name="Building2" size={28} color="var(--color-primary)" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-1">No businesses found</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your search or filters</p>
          </div>
        }
      </main>
      {/* Modals */}
      {selectedBusiness && <BusinessDetailModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />}
      {showAddModal && <AddBusinessModal onClose={() => setShowAddModal(false)} />}
    </div>
  );

}