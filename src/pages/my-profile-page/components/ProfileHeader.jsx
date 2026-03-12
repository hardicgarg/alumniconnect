import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const CURRENT_USER = {
  name: 'Alex Rivera',
  role: 'Senior Software Engineer',
  company: 'Salesforce',
  batch: 'Class of 2015',
  degree: 'M.S. Computer Science',
  school: 'Stanford University',
  city: 'San Francisco, CA',
  email: 'alex.rivera@alumni.edu',
  phone: '+1 (415) 555-0192',
  linkedin: 'linkedin.com/in/alexrivera',
  website: 'alexrivera.dev',
  avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b36fc5ef-1763299506190.png',
  avatarAlt: 'Professional male alumni with warm smile wearing formal dark blazer and white shirt in office setting',
  bio: 'Senior software engineer with 9+ years of experience building scalable cloud infrastructure at Salesforce. Passionate about distributed systems, developer tooling, and mentoring early-career engineers. Proud alumni of the Class of 2015.',
  expertise: ['React', 'Node.js', 'AWS', 'System Design', 'TypeScript', 'GraphQL'],
  interests: ['Open Source', 'Hiking', 'Photography', 'Startups'],
  profileCompletion: 72,
  connections: 284,
  followers: 412,
};

export default function ProfileHeader({ user = CURRENT_USER, onEditPhoto }) {
  const [connected, setConnected] = useState(false);

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Banner */}
      <div
        className="h-32 relative"
        style={{ background: 'linear-gradient(135deg, var(--color-foreground) 0%, #2d2d2d 50%, #1a1a1a 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, var(--color-primary) 0%, transparent 60%)' }} />
        <button
          onClick={onEditPhoto}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/20 transition-all"
        >
          <Icon name="Camera" size={13} color="currentColor" />
          Edit Cover
        </button>
      </div>
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        {/* Avatar */}
        <div className="relative -mt-10 sm:-mt-12 mb-3 flex items-end justify-between gap-2">
          <div className="relative flex-shrink-0">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-4 border-[var(--color-card)]" style={{ boxShadow: 'var(--shadow-md)', width: '72px', height: '72px' }}>
              <Image src={user?.avatar} alt={user?.avatarAlt} className="w-full h-full object-cover" />
            </div>
            <button
              onClick={onEditPhoto}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[var(--color-card)]"
              style={{ background: 'var(--color-primary)' }}
            >
              <Icon name="Camera" size={11} color="var(--color-primary-foreground)" />
            </button>
          </div>
          <div className="flex gap-1.5 sm:gap-2 mt-12 sm:mt-14 flex-wrap justify-end">
            <Button variant="default" size="sm" iconName="Edit3" iconPosition="left" iconSize={14}>
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" iconName="Share2" iconPosition="left" iconSize={14}>
              Share
            </Button>
          </div>
        </div>

        {/* Name & Role */}
        <div className="mb-3">
          <h1 className="text-lg sm:text-xl font-bold text-[var(--color-foreground)]">{user?.name}</h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">{user?.role} at <span className="font-medium text-[var(--color-foreground)]">{user?.company}</span></p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
              <Icon name="GraduationCap" size={12} color="var(--color-primary)" />
              <span className="truncate max-w-[160px]">{user?.batch} · {user?.school}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
              <Icon name="MapPin" size={12} color="currentColor" />
              {user?.city}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-secondary)] truncate max-w-full">
              <Icon name="Mail" size={12} color="currentColor" className="flex-shrink-0" />
              <span className="truncate">{user?.email}</span>
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4 py-2.5 sm:py-3 border-y border-[var(--color-border)]">
          {[
            { label: 'Connections', value: user?.connections },
            { label: 'Followers', value: user?.followers },
            { label: 'Profile Views', value: 1284 },
          ]?.map((stat) => (
            <div key={stat?.label} className="text-center flex-1">
              <p className="font-bold text-[var(--color-foreground)] text-base sm:text-lg leading-none">{stat?.value?.toLocaleString()}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-tight">{stat?.label}</p>
            </div>
          ))}
        </div>

        {/* Profile Completion */}
        <div className="bg-[var(--color-muted)] rounded-xl p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-[var(--color-foreground)]">Profile Completion</span>
            <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{user?.profileCompletion}%</span>
          </div>
          <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${user?.profileCompletion}%`, background: 'var(--color-primary)' }}
            />
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5">Add your skills and interests to reach 100%</p>
        </div>
      </div>
    </div>
  );
}
