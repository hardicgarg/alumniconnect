import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

export default function BusinessCard({ business, onClick }) {
  return (
    <div
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
      style={{ boxShadow: 'var(--shadow-sm)' }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
      onClick={() => onClick(business)}
    >
      {/* Top accent */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }} />
      <div className="p-5">
        {/* Logo + Name */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-muted)] flex-shrink-0 flex items-center justify-center">
            {business?.logo ? (
              <Image src={business?.logo} alt={business?.name + ' company logo'} className="w-full h-full object-cover" />
            ) : (
              <Icon name="Building2" size={24} color="var(--color-text-secondary)" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--color-foreground)] text-sm md:text-base leading-tight truncate">{business?.name}</h3>
            <p className="text-xs text-[var(--color-text-secondary)] truncate mt-0.5">by {business?.founderName}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(232,197,71,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(232,197,71,0.3)' }}>
            {business?.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)]">
            <Icon name="MapPin" size={10} color="currentColor" />
            {business?.city}
          </span>
          {business?.founded && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)]">
              Est. {business?.founded}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">{business?.description}</p>
      </div>
    </div>
  );
}
