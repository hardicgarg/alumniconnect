import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const INITIAL = {
  bio: 'Senior software engineer with 9+ years of experience building scalable cloud infrastructure at Salesforce. Passionate about distributed systems, developer tooling, and mentoring early-career engineers.',
  role: 'Senior Software Engineer',
  company: 'Salesforce',
  location: 'San Francisco, CA',
  website: 'alexrivera.dev',
  linkedin: 'linkedin.com/in/alexrivera',
  expertise: ['React', 'Node.js', 'AWS', 'System Design', 'TypeScript', 'GraphQL'],
  interests: ['Open Source', 'Hiking', 'Photography', 'Startups'],
};

export default function ProfileInfoTab() {
  const [form, setForm] = useState(INITIAL);
  const [saved, setSaved] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const removeTag = (tag, field) => {
    setForm((f) => ({ ...f, [field]: f?.[field]?.filter((t) => t !== tag) }));
  };

  const addTag = (field, value, setter) => {
    if (value?.trim() && !form?.[field]?.includes(value?.trim())) {
      setForm((f) => ({ ...f, [field]: [...f?.[field], value?.trim()] }));
    }
    setter('');
  };

  return (
    <div className="space-y-6">
      {/* Bio */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
          <Icon name="FileText" size={16} color="var(--color-primary)" />
          About / Bio
        </h3>
        <textarea
          value={form?.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e?.target?.value }))}
          rows={4}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] resize-none transition-all"
          placeholder="Tell your alumni story..."
        />
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">{form?.bio?.length}/500 characters</p>
      </div>
      {/* Current Role */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <Icon name="Briefcase" size={16} color="var(--color-primary)" />
          Current Position
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Job Title', key: 'role', placeholder: 'e.g. Senior Software Engineer', icon: 'User' },
            { label: 'Company', key: 'company', placeholder: 'e.g. Salesforce', icon: 'Building2' },
            { label: 'Location', key: 'location', placeholder: 'e.g. San Francisco, CA', icon: 'MapPin' },
            { label: 'Website', key: 'website', placeholder: 'e.g. yoursite.com', icon: 'Globe' },
            { label: 'LinkedIn', key: 'linkedin', placeholder: 'linkedin.com/in/yourprofile', icon: 'Linkedin' },
          ]?.map((field) => (
            <div key={field?.key} className={field?.key === 'linkedin' ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">{field?.label}</label>
              <div className="relative">
                <Icon name={field?.icon} size={14} color="var(--color-text-secondary)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={form?.[field?.key]}
                  onChange={(e) => setForm((f) => ({ ...f, [field?.key]: e?.target?.value }))}
                  placeholder={field?.placeholder}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Expertise Tags */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
          <Icon name="Tag" size={16} color="var(--color-primary)" />
          Expertise & Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {form?.expertise?.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]">
              {tag}
              <button onClick={() => removeTag(tag, 'expertise')} className="hover:text-red-500 transition-colors">
                <Icon name="X" size={11} color="currentColor" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e?.target?.value)}
            onKeyDown={(e) => e?.key === 'Enter' && addTag('expertise', newTag, setNewTag)}
            placeholder="Add a skill (press Enter)"
            className="flex-1 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition-all"
          />
          <Button variant="outline" size="sm" onClick={() => addTag('expertise', newTag, setNewTag)}>Add</Button>
        </div>
      </div>
      {/* Interests */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
          <Icon name="Heart" size={16} color="var(--color-primary)" />
          Interests & Hobbies
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {form?.interests?.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-foreground)] border border-[var(--color-primary)]/20">
              {tag}
              <button onClick={() => removeTag(tag, 'interests')} className="hover:text-red-500 transition-colors">
                <Icon name="X" size={11} color="currentColor" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e?.target?.value)}
            onKeyDown={(e) => e?.key === 'Enter' && addTag('interests', newInterest, setNewInterest)}
            placeholder="Add an interest (press Enter)"
            className="flex-1 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] transition-all"
          />
          <Button variant="outline" size="sm" onClick={() => addTag('interests', newInterest, setNewInterest)}>Add</Button>
        </div>
      </div>
      {/* Save */}
      <div className="flex justify-end">
        <Button
          variant="default"
          iconName={saved ? 'Check' : 'Save'}
          iconPosition="left"
          iconSize={16}
          onClick={handleSave}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
