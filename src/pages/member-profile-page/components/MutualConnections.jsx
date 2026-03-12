import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function MutualConnections({ connections }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--color-card)] rounded-2xl p-5 md:p-6 border border-[var(--color-border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
        <Icon name="Users" size={18} color="var(--color-primary)" />
        Mutual Connections
        <span className="ml-auto text-sm font-normal text-[var(--color-text-secondary)]">{connections?.length}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {connections?.map((conn) => (
          <div key={conn?.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors cursor-pointer" onClick={() => navigate('/member-directory')}>
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
              <Image src={conn?.avatar} alt={conn?.name + ' profile photo'} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{conn?.name}</p>
              <p className="text-xs text-[var(--color-text-secondary)] truncate">{conn?.role}</p>
            </div>
            <Button variant="outline" size="sm" iconName="UserPlus" iconSize={13} />
          </div>
        ))}
      </div>
    </div>
  );
}
