import React, { useState } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const CURRENT_USER = {
  name: 'Alex Rivera',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b36fc5ef-1763299506190.png",
  avatarAlt: 'Professional male alumni with warm smile wearing formal dark blazer and white shirt in office setting'
};

const POST_TYPES = [
  { icon: 'Image', label: 'Photo', color: '#22C55E' },
  { icon: 'Briefcase', label: 'Job', color: '#E8C547' },
  { icon: 'Calendar', label: 'Event', color: '#D4AF37' },
  { icon: 'Rocket', label: 'Startup', color: '#F59E0B' },
];

export default function PostComposer({ onPost }) {
  const [text, setText] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handlePost = () => {
    if (!text?.trim()) return;
    onPost?.({ text, type: 'update' });
    setText('');
    setExpanded(false);
  };

  return (
    <div className="bg-card rounded-2xl p-4 md:p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex gap-3 items-start">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src={CURRENT_USER?.avatar} alt={CURRENT_USER?.avatarAlt} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <textarea
            value={text}
            onChange={(e) => setText(e?.target?.value)}
            onFocus={() => setExpanded(true)}
            placeholder="Share an update with your alumni network..."
            rows={expanded ? 3 : 1}
            className="w-full resize-none rounded-xl px-3 sm:px-4 py-2.5 text-sm text-foreground placeholder-text-secondary border border-border focus:outline-none focus:border-yellow-400 transition-all duration-200"
            style={{ background: 'var(--color-muted)' }}
          />
          {expanded && (
            <div className="flex items-center justify-between mt-3 gap-2">
              <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-shrink-0">
                {POST_TYPES?.map((pt) => (
                  <button
                    key={pt?.label}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-200 whitespace-nowrap flex-shrink-0"
                  >
                    <Icon name={pt?.icon} size={13} color={pt?.color} />
                    <span className="hidden sm:inline">{pt?.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={handlePost}
                disabled={!text?.trim()}
                className="px-4 sm:px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-40 flex-shrink-0"
                style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
              >
                Share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
