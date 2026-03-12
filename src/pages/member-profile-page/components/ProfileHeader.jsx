import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function ProfileHeader({ member }) {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(member?.isConnected || false);

  return (
    <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Banner */}
      <div className="relative h-32 sm:h-40 md:h-52 rounded-t-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 60%, #B8960C 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white text-xs sm:text-sm font-medium transition-colors"
        >
          <Icon name="ArrowLeft" size={14} color="white" />
          Back
        </button>
      </div>

      {/* Avatar + Info */}
      <div className="px-4 sm:px-5 md:px-8 pb-5 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="-mt-10 sm:-mt-14 md:-mt-16 flex-shrink-0 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-[var(--color-card)]" style={{ boxShadow: 'var(--shadow-md)' }}>
              <Image src={member?.avatar} alt={member?.avatarAlt} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:pb-1 flex-wrap">
            <Button
              variant={connected ? 'secondary' : 'default'}
              size="sm"
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
              onClick={() => navigate('/messaging-interface')}
            >
              Message
            </Button>
            <Button variant="outline" size="sm" iconName="MoreHorizontal" iconSize={14} />
          </div>
        </div>

        {/* Name & Details */}
        <div className="mt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">{member?.name}</h1>
            {member?.isOnline && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Online
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-0.5">{member?.role} at <span className="font-semibold text-[var(--color-foreground)]">{member?.company}</span></p>

          <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={13} color="var(--color-primary)" />
              {member?.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="GraduationCap" size={13} color="var(--color-primary)" />
              {member?.batch}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="BookOpen" size={13} color="var(--color-primary)" />
              <span className="truncate max-w-[140px] sm:max-w-none">{member?.degree}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="Users" size={13} color="var(--color-primary)" />
              {member?.mutualConnections} mutual connections
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
