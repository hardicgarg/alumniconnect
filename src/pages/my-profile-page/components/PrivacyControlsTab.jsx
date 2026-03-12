import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function PrivacyControlsTab() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'alumni',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showConnections: true,
    showActivity: true,
    allowMessages: 'connections',
    searchable: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${checked ? 'left-5' : 'left-0.5'}`}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
      />
    </button>
  );

  const RadioGroup = ({ value, onChange, options }) => (
    <div className="flex gap-2 flex-wrap">
      {options?.map((opt) => (
        <button
          key={opt?.value}
          onClick={() => onChange(opt?.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            value === opt?.value
              ? 'bg-[var(--color-foreground)] text-[var(--color-card)]'
              : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
          }`}
        >
          {opt?.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Eye" size={16} color="var(--color-primary)" />
          Profile Visibility
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[var(--color-foreground)] mb-1.5">Who can see your profile?</p>
            <RadioGroup
              value={privacy?.profileVisibility}
              onChange={(v) => setPrivacy((p) => ({ ...p, profileVisibility: v }))}
              options={[
                { value: 'everyone', label: 'Everyone' },
                { value: 'alumni', label: 'Alumni Only' },
                { value: 'connections', label: 'Connections Only' },
              ]}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-foreground)] mb-1.5">Who can message you?</p>
            <RadioGroup
              value={privacy?.allowMessages}
              onChange={(v) => setPrivacy((p) => ({ ...p, allowMessages: v }))}
              options={[
                { value: 'everyone', label: 'Everyone' },
                { value: 'connections', label: 'Connections Only' },
                { value: 'nobody', label: 'Nobody' },
              ]}
            />
          </div>
        </div>
      </div>
      {/* Contact Info Visibility */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Shield" size={16} color="var(--color-primary)" />
          Contact Information
        </h3>
        <div className="space-y-3">
          {[
            { key: 'showEmail', label: 'Show email address', desc: 'Allow others to see your email' },
            { key: 'showPhone', label: 'Show phone number', desc: 'Allow others to see your phone' },
            { key: 'showLocation', label: 'Show location', desc: 'Display your city on your profile' },
          ]?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between gap-4 py-2 border-b border-[var(--color-border)] last:border-0">
              <div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">{item?.label}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{item?.desc}</p>
              </div>
              <Toggle
                checked={privacy?.[item?.key]}
                onChange={(val) => setPrivacy((p) => ({ ...p, [item?.key]: val }))}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Activity Sharing */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Activity" size={16} color="var(--color-primary)" />
          Activity & Discovery
        </h3>
        <div className="space-y-3">
          {[
            { key: 'showConnections', label: 'Show connections count', desc: 'Display your connection count publicly' },
            { key: 'showActivity', label: 'Share activity', desc: 'Let others see your recent platform activity' },
            { key: 'searchable', label: 'Appear in search', desc: 'Allow others to find you via search' },
          ]?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between gap-4 py-2 border-b border-[var(--color-border)] last:border-0">
              <div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">{item?.label}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{item?.desc}</p>
              </div>
              <Toggle
                checked={privacy?.[item?.key]}
                onChange={(val) => setPrivacy((p) => ({ ...p, [item?.key]: val }))}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="default" iconName={saved ? 'Check' : 'Save'} iconPosition="left" iconSize={16} onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Privacy Settings'}
        </Button>
      </div>
    </div>
  );
}
