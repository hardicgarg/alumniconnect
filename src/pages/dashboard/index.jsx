import React from 'react';
import Header from 'components/ui/Header';
import WelcomeBanner from './components/WelcomeBanner';
import QuickActions from './components/QuickActions';
import StatsBar from './components/StatsBar';
import FeedWidget from './components/FeedWidget';
import RecentActivity from './components/RecentActivity';
import UpcomingEvents from './components/UpcomingEvents';
import SuggestedConnections from './components/SuggestedConnections';
import SuggestedGroups from './components/SuggestedGroups';
import RecentJobs from './components/RecentJobs';
import FeaturedBusinesses from './components/FeaturedBusinesses';
import RecentMessages from './components/RecentMessages';
import NotificationsPreview from './components/NotificationsPreview';

const CURRENT_USER = {
  name: 'Alex Rivera',
  role: 'Senior Software Engineer',
  company: 'Salesforce',
  batch: '2015',
  city: 'San Francisco, CA',
  profileCompletion: 72,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b36fc5ef-1763299506190.png",
  avatarAlt: 'Professional male alumni with warm smile wearing formal dark blazer and white shirt in office setting'
};

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Welcome Banner */}
        <div className="mb-6">
          <WelcomeBanner user={CURRENT_USER} />
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <QuickActions />
        </div>

        {/* Stats Bar */}
        <div className="mb-6">
          <StatsBar />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <FeedWidget />
            <SuggestedConnections />
            <RecentJobs />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <UpcomingEvents />
            <RecentActivity />
            <NotificationsPreview />
            <RecentMessages />
            <SuggestedGroups />
            <FeaturedBusinesses />
          </div>
        </div>
      </main>
    </div>);

}