import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const ACTIVITY = [
  {
    id: 1,
    user: 'Priya Sharma',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19205d2aa-1763296356182.png",
    avatarAlt: 'Professional Indian woman with dark hair smiling in office setting',
    batch: '2016',
    action: 'posted a job at Stripe',
    time: '12m',
    icon: 'Briefcase',
    iconColor: '#E8C547',
    path: '/jobs-portal'
  },
  {
    id: 2,
    user: 'James Whitfield',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15753ec4f-1763295707622.png",
    avatarAlt: 'Caucasian man with glasses and brown hair in casual business attire',
    batch: '2012',
    action: 'is hosting Alumni Gala',
    time: '1h',
    icon: 'Calendar',
    iconColor: '#D4AF37',
    path: '/events-hub'
  },
  {
    id: 3,
    user: 'Aisha Okonkwo',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eac4bd5f-1772658508857.png",
    avatarAlt: 'African woman with natural hair wearing professional blazer in bright office',
    batch: '2019',
    action: 'joined Tech Alumni Network',
    time: '2h',
    icon: 'Users',
    iconColor: '#22C55E',
    path: '/member-directory'
  },
  {
    id: 4,
    user: 'Carlos Mendez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1273e1aa3-1763301484122.png",
    avatarAlt: 'Hispanic man with short dark hair in navy blazer against white background',
    batch: '2014',
    action: 'listed Mendez Digital Agency',
    time: '4h',
    icon: 'Store',
    iconColor: '#F59E0B',
    path: '/business-directory'
  },
  {
    id: 5,
    user: 'Rachel Kim',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1230b9d-1763294070661.png",
    avatarAlt: 'Asian woman with shoulder-length hair in professional setting with warm lighting',
    batch: '2017',
    action: 'posted UX Lead role at Figma',
    time: '6h',
    icon: 'Briefcase',
    iconColor: '#E8C547',
    path: '/jobs-portal'
  }
];

export default function RecentActivity() {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-foreground">Recent Activity</h3>
        <span className="text-xs text-text-secondary bg-muted px-2 py-0.5 rounded-full">Live</span>
      </div>

      <div className="space-y-3">
        {ACTIVITY?.map((item) => (
          <div
            key={item?.id}
            className="flex items-center gap-2.5 cursor-pointer hover:bg-muted rounded-lg p-1.5 -mx-1.5 transition-colors"
            onClick={() => navigate(item?.path)}>
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image src={item?.avatar} alt={item?.avatarAlt} className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border border-card"
                style={{ background: item?.iconColor }}>
                <Icon name={item?.icon} size={8} color="#1C1C1C" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-tight">
                <span className="font-semibold">{item?.user}</span>
                {item?.batch && <span className="text-text-secondary"> '{item?.batch?.slice(2)}</span>}
              </p>
              <p className="text-xs text-text-secondary truncate">{item?.action}</p>
            </div>
            <span className="text-xs text-text-secondary flex-shrink-0">{item?.time}</span>
          </div>
        ))}
      </div>

      <button
        className="w-full mt-3 text-center text-xs font-medium py-1.5 rounded-lg hover:bg-muted transition-colors"
        style={{ color: 'var(--color-accent)' }}
        onClick={() => navigate('/community-feed')}>
        View all activity
      </button>
    </div>
  );
}
