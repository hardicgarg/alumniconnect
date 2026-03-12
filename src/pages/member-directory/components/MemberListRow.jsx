import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function MemberListRow({ member, onViewProfile, onMessage }) {
  const [connected, setConnected] = useState(member?.isConnected || false);

  return (
    <div
      className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 bg-[var(--color-card)] border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors duration-150 cursor-pointer group"
      onClick={() => onViewProfile(member)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border border-[var(--color-border)]">
          <Image src={member?.avatar} alt={member?.avatarAlt} className="w-full h-full object-cover" />
        </div>
        {member?.isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-card)]" />
        )}
      </div>
      {/* Name + Role */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm md:text-base text-[var(--color-foreground)] truncate">{member?.name}</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex-shrink-0">{member?.batch}</span>
        </div>
        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] truncate">{member?.role} · {member?.company}</p>
      </div>
      {/* Location - hidden on mobile */}
      <div className="hidden md:flex items-center gap-1 text-sm text-[var(--color-text-secondary)] flex-shrink-0 w-36">
        <Icon name="MapPin" size={13} color="currentColor" />
        <span className="truncate">{member?.location}</span>
      </div>
      {/* Industry - hidden on small */}
      <div className="hidden lg:block text-sm text-[var(--color-text-secondary)] flex-shrink-0 w-28 truncate">
        {member?.industry}
      </div>
      {/* Chapter - hidden on small */}
      <div className="hidden lg:block text-sm text-[var(--color-text-secondary)] flex-shrink-0 w-28 truncate">
        {member?.chapter}
      </div>
      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0" onClick={(e) => e?.stopPropagation()}>
        <Button
          variant={connected ? 'secondary' : 'default'}
          size="sm"
          iconName={connected ? 'UserCheck' : 'UserPlus'}
          iconPosition="left"
          iconSize={13}
          onClick={() => setConnected(!connected)}
        >
          <span className="hidden sm:inline">{connected ? 'Connected' : 'Connect'}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconSize={13}
          onClick={() => onMessage(member)}
        >
          <span className="hidden sm:inline">Message</span>
        </Button>
      </div>
    </div>
  );
}