import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfoTab from './components/ProfileInfoTab';
import AccountSettingsTab from './components/AccountSettingsTab';
import PrivacyControlsTab from './components/PrivacyControlsTab';
import ActivityHistoryTab from './components/ActivityHistoryTab';

const TABS = [
  { id: 'profile', label: 'Profile Information', icon: 'User' },
  { id: 'account', label: 'Account Settings', icon: 'Settings' },
  { id: 'privacy', label: 'Privacy Controls', icon: 'Shield' },
  { id: 'activity', label: 'Activity History', icon: 'Clock' },
];

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">My Profile</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">Manage your alumni profile and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Profile Card + Tab Nav */}
          <div className="lg:col-span-1 space-y-4">
            <ProfileHeader />

            {/* Tab Navigation - Desktop sidebar */}
            <div className="hidden lg:block bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-2" style={{ boxShadow: 'var(--shadow-sm)' }}>
              {TABS?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                    activeTab === tab?.id
                      ? 'bg-[var(--color-foreground)] text-[var(--color-card)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                  }`}
                >
                  <Icon name={tab?.icon} size={15} color="currentColor" />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Tab Content */}
          <div className="lg:col-span-3">
            {/* Mobile Tab Bar */}
            <div className="flex gap-1 overflow-x-auto pb-1 mb-5 lg:hidden scrollbar-hide">
              {TABS?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    activeTab === tab?.id
                      ? 'bg-[var(--color-foreground)] text-[var(--color-card)]'
                      : 'bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  <Icon name={tab?.icon} size={13} color="currentColor" />
                  {tab?.label}
                </button>
              ))}
            </div>

            {activeTab === 'profile' && <ProfileInfoTab />}
            {activeTab === 'account' && <AccountSettingsTab />}
            {activeTab === 'privacy' && <PrivacyControlsTab />}
            {activeTab === 'activity' && <ActivityHistoryTab />}
          </div>
        </div>
      </main>
    </div>
  );
}
