import React from 'react';
import Icon from 'components/AppIcon';

const TRUST_ITEMS = [
  { icon: 'Shield', label: 'SSL Secured' },
  { icon: 'Lock', label: 'Privacy Protected' },
  { icon: 'CheckCircle', label: 'Verified Platform' },
];

export default function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
      {TRUST_ITEMS?.map((item) => (
        <div key={item?.label} className="flex items-center gap-1.5">
          <Icon name={item?.icon} size={13} color="var(--color-text-secondary)" />
          <span className="text-xs font-caption" style={{ color: 'var(--color-text-secondary)' }}>
            {item?.label}
          </span>
        </div>
      ))}
    </div>
  );
}