import React from 'react';
import Header from 'components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import CareerTimeline from './components/CareerTimeline';
import MutualConnections from './components/MutualConnections';
import ProfileSidebar from './components/ProfileSidebar';

const MEMBER_PROFILE = {
  id: 1,
  name: "Sarah Johnson",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aaf46fcd-1773137917081.png",
  avatarAlt: "Professional woman with warm smile wearing business casual attire in modern office setting",
  role: "Senior Product Manager",
  company: "Google",
  batch: "Class of 2015",
  degree: "MBA, Stanford GSB",
  location: "San Francisco, CA",
  industry: "Technology",
  isOnline: true,
  isConnected: false,
  mutualConnections: 12,
  bio: "Passionate product leader with 9 years of experience building consumer products at scale. I specialize in 0-to-1 product development, cross-functional team leadership, and data-driven decision making. Love connecting with fellow alumni and mentoring early-career professionals navigating the PM path. Previously at Airbnb and Salesforce, now leading Search & Discovery at Google.",
  expertise: ["Product Strategy", "UX Research", "Agile", "Data Analytics", "Roadmapping", "A/B Testing"],
  interests: ["Hiking", "Photography", "Startups", "Mentoring", "Travel"],
  careerHistory: [
  { role: "Senior Product Manager", company: "Google", period: "2020 – Present" },
  { role: "Product Manager", company: "Airbnb", period: "2017 – 2020" },
  { role: "Associate PM", company: "Salesforce", period: "2015 – 2017" },
  { role: "Product Intern", company: "LinkedIn", period: "Summer 2014" }],

  education: [
  { degree: "MBA, Business Administration", school: "Stanford Graduate School of Business", year: "2015" },
  { degree: "B.S. Computer Science", school: "UC Berkeley", year: "2012" }],

  groupsJoined: ["SF Bay Area Chapter", "Product & Startup Network", "Women in Tech Alumni", "Class of 2015"],
  eventsAttended: ["Annual Alumni Gala 2024", "Bay Area Networking Night", "PM Summit 2023", "Homecoming 2023"],
  jobsPosted: ["Senior PM – Google Search (2023)", "PM Lead – Consumer Products (2022)"],
  businessesListed: [],
  mutualConnectionsList: [
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17550fd67-1763295501645.png",
    role: "Staff Engineer, Meta"
  },
  {
    id: 5,
    name: "Jessica Park",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11edb8861-1772475034213.png",
    role: "UX Design Lead, Apple"
  },
  {
    id: 6,
    name: "Ryan Thompson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11f93ee64-1763296582119.png",
    role: "Investment Director, Goldman Sachs"
  },
  {
    id: 8,
    name: "Kevin Patel",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15d02d289-1763295742851.png",
    role: "Founder & CEO, NexaFlow"
  }]

};

export default function MemberProfilePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Profile Header */}
        <div className="mb-6">
          <ProfileHeader member={MEMBER_PROFILE} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <AboutSection member={MEMBER_PROFILE} />
            <CareerTimeline careerHistory={MEMBER_PROFILE?.careerHistory} education={MEMBER_PROFILE?.education} />
            <MutualConnections connections={MEMBER_PROFILE?.mutualConnectionsList} />
          </div>

          {/* Right Sidebar */}
          <div>
            <ProfileSidebar member={MEMBER_PROFILE} />
          </div>
        </div>
      </main>
    </div>);

}