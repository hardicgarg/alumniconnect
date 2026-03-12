import React from 'react';
import Icon from 'components/AppIcon';

export default function AboutSection({ member }) {
  return (
    <div className="bg-[var(--color-card)] rounded-2xl p-5 md:p-6 border border-[var(--color-border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
        <Icon name="User" size={18} color="var(--color-primary)" />
        About
      </h2>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">{member?.bio}</p>

      {/* Expertise */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {member?.expertise?.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-text-secondary)]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {member?.interests?.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(232,197,71,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(232,197,71,0.3)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
