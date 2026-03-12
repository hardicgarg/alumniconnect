import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function MemberCard({ member, onViewProfile, onMessage }) {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(member?.isConnected || false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group relative"
      style={{ boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('/member-profile-page')}
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }} />
      <div className="p-4 md:p-5">
        {/* Avatar + Name */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 border-[var(--color-border)]">
              <Image
                src={member?.avatar}
                alt={member?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {member?.isOnline && (
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-card)]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--color-foreground)] text-sm md:text-base leading-tight truncate">{member?.name}</h3>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] truncate mt-0.5">{member?.role}</p>
            <p className="text-xs text-[var(--color-text-secondary)] truncate">{member?.company}</p>
          </div>
        </div>

        {/* Batch + Location */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
            <Icon name="GraduationCap" size={11} color="currentColor" />
            {member?.batch}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)]">
            <Icon name="MapPin" size={11} color="currentColor" />
            <span className="truncate max-w-[100px]">{member?.location}</span>
          </span>
          {member?.industry && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)]">
              <Icon name="Briefcase" size={11} color="currentColor" />
              <span className="truncate max-w-[80px]">{member?.industry}</span>
            </span>
          )}
        </div>

        {/* Expertise tags */}
        {member?.expertise && member?.expertise?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {member?.expertise?.slice(0, 3)?.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                {tag}
              </span>
            ))}
            {member?.expertise?.length > 3 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)]">
                +{member?.expertise?.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Mutual connections */}
        {member?.mutualConnections > 0 && (
          <p className="text-xs text-[var(--color-text-secondary)] mb-3 flex items-center gap-1">
            <Icon name="Users" size={12} color="currentColor" />
            {member?.mutualConnections} mutual connection{member?.mutualConnections > 1 ? 's' : ''}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2" onClick={(e) => e?.stopPropagation()}>
          <Button
            variant={connected ? 'secondary' : 'default'}
            size="sm"
            fullWidth
            iconName={connected ? 'UserCheck' : 'UserPlus'}
            iconPosition="left"
            iconSize={14}
            onClick={() => setConnected(!connected)}
          >
            {connected ? 'Connected' : 'Connect'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={14}
            onClick={() => onMessage(member)}
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}