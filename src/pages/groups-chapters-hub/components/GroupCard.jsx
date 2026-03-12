import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function GroupCard({ group, onViewGroup }) {
  const [joined, setJoined] = useState(group?.isMember || false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group"
      style={{ boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewGroup(group)}
    >
      {/* Banner */}
      <div className="relative h-28 overflow-hidden">
        <Image
          src={group?.banner}
          alt={group?.bannerAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {group?.isFeatured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
            Featured
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {group?.type}
          </span>
          <span className="text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
            <Icon name="Activity" size={10} color="currentColor" />
            {group?.activityLevel}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Group icon + name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-[var(--color-primary-foreground)]"
            style={{ background: group?.color || 'var(--color-primary)' }}
          >
            {group?.emoji || group?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--color-foreground)] text-sm leading-tight line-clamp-1">{group?.name}</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 flex items-center gap-1">
              <Icon name="MapPin" size={10} color="currentColor" />
              {group?.location}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3 leading-relaxed">
          {group?.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-3 text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1">
            <Icon name="Users" size={12} color="currentColor" />
            {group?.memberCount?.toLocaleString()} members
          </span>
          <span className="flex items-center gap-1">
            <Icon name="MessageCircle" size={12} color="currentColor" />
            {group?.postCount} posts/mo
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Calendar" size={12} color="currentColor" />
            {group?.eventCount} events
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2" onClick={(e) => e?.stopPropagation()}>
          <Button
            variant={joined ? 'secondary' : 'default'}
            size="sm"
            fullWidth
            iconName={joined ? 'UserCheck' : 'UserPlus'}
            iconPosition="left"
            iconSize={14}
            onClick={() => setJoined(!joined)}
          >
            {joined ? 'Joined' : 'Join Group'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            onClick={() => onViewGroup(group)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
