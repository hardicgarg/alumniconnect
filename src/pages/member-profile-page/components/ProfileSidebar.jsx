import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

export default function ProfileSidebar({ member }) {
  const navigate = useNavigate();

  const sidebarSections = [
    {
      title: 'Groups Joined',
      icon: 'Users',
      items: member?.groupsJoined,
      emptyMsg: 'No groups joined yet',
      onClick: () => navigate('/member-directory'),
    },
    {
      title: 'Events Attended',
      icon: 'Calendar',
      items: member?.eventsAttended,
      emptyMsg: 'No events attended yet',
      onClick: () => navigate('/events-hub'),
    },
    {
      title: 'Jobs Posted',
      icon: 'Briefcase',
      items: member?.jobsPosted,
      emptyMsg: 'No jobs posted yet',
      onClick: () => navigate('/jobs-portal'),
    },
    {
      title: 'Businesses Listed',
      icon: 'Building2',
      items: member?.businessesListed,
      emptyMsg: 'No businesses listed yet',
      onClick: () => navigate('/business-directory'),
    },
  ];

  return (
    <div className="space-y-4">
      {sidebarSections?.map((section) => (
        <div key={section?.title} className="bg-[var(--color-card)] rounded-2xl p-4 border border-[var(--color-border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
            <Icon name={section?.icon} size={15} color="var(--color-primary)" />
            {section?.title}
          </h3>
          {section?.items?.length > 0 ? (
            <ul className="space-y-2">
              {section?.items?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] cursor-pointer transition-colors group"
                  onClick={section?.onClick}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-primary)' }} />
                  <span className="truncate group-hover:underline">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[var(--color-text-secondary)]">{section?.emptyMsg}</p>
          )}
        </div>
      ))}
    </div>
  );
}
