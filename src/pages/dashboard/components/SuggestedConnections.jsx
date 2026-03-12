import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const MEMBERS = [
{
  id: 1,
  name: 'Sarah Johnson',
  role: 'Product Manager',
  company: 'Google',
  batch: '2015',
  city: 'San Francisco',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png",
  avatarAlt: 'Professional woman with blonde hair in business casual attire smiling at camera',
  mutualConnections: 12
},
{
  id: 2,
  name: 'Michael Chen',
  role: 'Software Engineer',
  company: 'Meta',
  batch: '2018',
  city: 'Seattle',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b12cece8-1763296037808.png",
  avatarAlt: 'Asian man with short black hair wearing casual tech company t-shirt in modern office',
  mutualConnections: 8
},
{
  id: 3,
  name: 'Fatima Al-Hassan',
  role: 'Investment Analyst',
  company: 'Goldman Sachs',
  batch: '2016',
  city: 'New York',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1001de7f9-1763295922892.png",
  avatarAlt: 'Middle Eastern woman in professional business suit with confident expression in office',
  mutualConnections: 5
},
{
  id: 4,
  name: 'David Park',
  role: 'Startup Founder',
  company: 'NovaTech',
  batch: '2013',
  city: 'Austin',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1904d9a5f-1772472654268.png",
  avatarAlt: 'Korean American man with casual attire standing in startup office with whiteboards',
  mutualConnections: 15
}];


export default function SuggestedConnections() {
  const navigate = useNavigate();
  const [connected, setConnected] = useState({});

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">People You May Know</h2>
        <button
          onClick={() => navigate('/member-directory')}
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}>
          
          Browse all <Icon name="ArrowRight" size={12} color="currentColor" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MEMBERS?.map((m) =>
        <div
          key={m?.id}
          className="p-3 rounded-xl border border-border hover:border-yellow-300 hover:shadow-md transition-all duration-200 cursor-pointer"
          onClick={() => navigate('/member-profile-page')}>
          
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                <Image src={m?.avatar} alt={m?.avatarAlt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground line-clamp-1">{m?.name}</p>
                <p className="text-xs text-text-secondary line-clamp-1">{m?.role} · {m?.company}</p>
                <p className="text-xs text-text-secondary">Class of {m?.batch} · {m?.city}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>
                  {m?.mutualConnections} mutual connections
                </p>
              </div>
            </div>
            <button
            onClick={(e) => {
              e?.stopPropagation();
              setConnected((p) => ({ ...p, [m?.id]: !p?.[m?.id] }));
            }}
            className="w-full mt-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: connected?.[m?.id] ? '#22C55E' : 'var(--color-muted)',
              color: connected?.[m?.id] ? '#fff' : 'var(--color-foreground)'
            }}>
            
              {connected?.[m?.id] ? '✓ Connected' : '+ Connect'}
            </button>
          </div>
        )}
      </div>
    </div>);

}