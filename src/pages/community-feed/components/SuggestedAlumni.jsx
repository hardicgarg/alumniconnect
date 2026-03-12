import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const SUGGESTED = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Product Manager',
    company: 'Stripe',
    batch: '2016',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19205d2aa-1763296356182.png",
    avatarAlt: 'Professional Indian woman with dark hair smiling in office setting',
    mutual: 9
  },
  {
    id: 2,
    name: 'James Whitfield',
    role: 'Engineering Lead',
    company: 'Airbnb',
    batch: '2012',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15753ec4f-1763295707622.png",
    avatarAlt: 'Caucasian man with glasses and brown hair in casual business attire',
    mutual: 6
  },
  {
    id: 3,
    name: 'Aisha Okonkwo',
    role: 'Data Scientist',
    company: 'Netflix',
    batch: '2019',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eac4bd5f-1772658508857.png",
    avatarAlt: 'African woman with natural hair wearing professional blazer in bright office',
    mutual: 4
  },
  {
    id: 4,
    name: 'Carlos Mendez',
    role: 'Founder & CEO',
    company: 'Mendez Digital',
    batch: '2014',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1273e1aa3-1763301484122.png",
    avatarAlt: 'Hispanic man with short dark hair in navy blazer against white background',
    mutual: 11
  },
];

export default function SuggestedAlumni() {
  const navigate = useNavigate();
  const [connected, setConnected] = useState({});

  return (
    <div className="bg-card rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-foreground">Suggested Alumni</h3>
        <button
          onClick={() => navigate('/member-directory')}
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}
        >
          See all <Icon name="ArrowRight" size={11} color="currentColor" />
        </button>
      </div>
      <div className="space-y-3">
        {SUGGESTED?.map((m) => (
          <div key={m?.id} className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/member-profile-page')}
            >
              <Image src={m?.avatar} alt={m?.avatarAlt} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate('/member-profile-page')}>
              <p className="text-xs font-semibold text-foreground truncate">{m?.name}</p>
              <p className="text-xs text-text-secondary truncate">{m?.role} · {m?.company}</p>
              <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{m?.mutual} mutual</p>
            </div>
            <button
              onClick={() => setConnected((p) => ({ ...p, [m?.id]: !p?.[m?.id] }))}
              className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: connected?.[m?.id] ? '#22C55E' : 'var(--color-muted)',
                color: connected?.[m?.id] ? '#fff' : 'var(--color-foreground)'
              }}
            >
              {connected?.[m?.id] ? '✓' : '+'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
