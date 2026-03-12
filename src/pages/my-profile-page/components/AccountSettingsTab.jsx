import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function AccountSettingsTab() {
  const [emailPrefs, setEmailPrefs] = useState({
    newConnections: true,
    eventReminders: true,
    jobAlerts: false,
    weeklyDigest: true,
    messageNotifications: true,
    groupUpdates: false,
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

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Bell" size={16} color="var(--color-primary)" />
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'newConnections', label: 'New connection requests', desc: 'Get notified when someone wants to connect' },
            { key: 'eventReminders', label: 'Event reminders', desc: 'Reminders for events you\'ve RSVP\'d to' },
            { key: 'jobAlerts', label: 'Job alerts', desc: 'New job postings matching your profile' },
            { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Summary of activity in your network' },
            { key: 'messageNotifications', label: 'Message notifications', desc: 'When you receive a new message' },
            { key: 'groupUpdates', label: 'Group updates', desc: 'New posts and events in your groups' },
          ]?.map((pref) => (
            <div key={pref?.key} className="flex items-center justify-between gap-4 py-2 border-b border-[var(--color-border)] last:border-0">
              <div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">{pref?.label}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{pref?.desc}</p>
              </div>
              <Toggle
                checked={emailPrefs?.[pref?.key]}
                onChange={(val) => setEmailPrefs((p) => ({ ...p, [pref?.key]: val }))}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Change Password */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Lock" size={16} color="var(--color-primary)" />
          Change Password
        </h3>
        <div className="space-y-3 max-w-md">
          {['Current Password', 'New Password', 'Confirm New Password']?.map((label) => (
            <div key={label}>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition-all"
              />
            </div>
          ))}
          <Button variant="outline" size="sm" iconName="Lock" iconPosition="left" iconSize={14}>
            Update Password
          </Button>
        </div>
      </div>
      {/* Account Email */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Mail" size={16} color="var(--color-primary)" />
          Account Email
        </h3>
        <div className="max-w-md space-y-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Email Address</label>
            <input
              type="email"
              defaultValue="alex.rivera@alumni.edu"
              className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition-all"
            />
          </div>
          <Button variant="outline" size="sm">Update Email</Button>
        </div>
      </div>
      {/* Save */}
      <div className="flex justify-end">
        <Button variant="default" iconName={saved ? 'Check' : 'Save'} iconPosition="left" iconSize={16} onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
