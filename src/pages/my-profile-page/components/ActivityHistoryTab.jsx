import React from 'react';
import Icon from 'components/AppIcon';


const ACTIVITY = [
{ id: 1, type: 'connection', icon: 'UserPlus', color: '#22C55E', text: 'Connected with', target: 'Sarah Johnson', targetAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_141e51895-1763296519617.png", targetAvatarAlt: 'Sarah Johnson profile photo', time: '2 hours ago' },
{ id: 2, type: 'event', icon: 'Calendar', color: '#6366F1', text: 'RSVP\'d to', target: 'Annual Alumni Gala 2026', time: '1 day ago' },
{ id: 3, type: 'job', icon: 'Briefcase', color: '#F59E0B', text: 'Applied to', target: 'Senior Engineer at Stripe', time: '2 days ago' },
{ id: 4, type: 'connection', icon: 'UserPlus', color: '#22C55E', text: 'Connected with', target: 'Michael Chen', targetAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5f5dfa8-1763292069790.png", targetAvatarAlt: 'Michael Chen profile photo', time: '3 days ago' },
{ id: 5, type: 'group', icon: 'Users', color: '#0EA5E9', text: 'Joined', target: 'Bay Area Tech Alumni', time: '5 days ago' },
{ id: 6, type: 'message', icon: 'MessageSquare', color: '#EC4899', text: 'Sent a message to', target: 'Emily Rodriguez', targetAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png", targetAvatarAlt: 'Emily Rodriguez profile photo', time: '1 week ago' },
{ id: 7, type: 'event', icon: 'Calendar', color: '#6366F1', text: 'Attended', target: 'Product Management Workshop', time: '2 weeks ago' },
{ id: 8, type: 'job', icon: 'Briefcase', color: '#F59E0B', text: 'Posted a job', target: 'Frontend Engineer at NexaFlow', time: '3 weeks ago' }];


const STATS = [
{ label: 'Connections Made', value: 284, icon: 'Users', color: '#22C55E' },
{ label: 'Events Attended', value: 12, icon: 'Calendar', color: '#6366F1' },
{ label: 'Jobs Applied', value: 5, icon: 'Briefcase', color: '#F59E0B' },
{ label: 'Messages Sent', value: 47, icon: 'MessageSquare', color: '#EC4899' }];


export default function ActivityHistoryTab() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS?.map((stat) =>
        <div key={stat?.label} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
            style={{ background: `${stat?.color}15` }}>
            
              <Icon name={stat?.icon} size={18} color={stat?.color} />
            </div>
            <p className="text-2xl font-bold text-[var(--color-foreground)]">{stat?.value}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{stat?.label}</p>
          </div>
        )}
      </div>
      {/* Timeline */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Clock" size={16} color="var(--color-primary)" />
          Recent Activity
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border)]" />
          <div className="space-y-4">
            {ACTIVITY?.map((item) =>
            <div key={item?.id} className="flex items-start gap-4 relative">
                {/* Icon */}
                <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 border-[var(--color-card)]"
                style={{ background: `${item?.color}20` }}>
                
                  <Icon name={item?.icon} size={16} color={item?.color} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {item?.text}{' '}
                      <span className="font-medium text-[var(--color-foreground)]">{item?.target}</span>
                    </p>
                    {item?.targetAvatar &&
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                        <img src={item?.targetAvatar} alt={item?.targetAvatarAlt} className="w-full h-full object-cover" />
                      </div>
                  }
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item?.time}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}