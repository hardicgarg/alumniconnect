import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const FUNCTION_OPTIONS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'Operations', 'HR', 'Legal', 'Other'];
const EXPERIENCE_OPTIONS = ['Entry Level (0-2 yrs)', 'Mid Level (3-5 yrs)', 'Senior (6-9 yrs)', 'Lead/Principal (10+ yrs)', 'Executive'];
const WORK_TYPE_OPTIONS = ['Remote', 'On-site', 'Hybrid'];
const JOB_TYPE_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];

export default function PostJobModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '', company: '', location: '', function: 'Engineering',
    experience: 'Mid Level (3-5 yrs)', workType: 'Remote', jobType: 'Full-time',
    salary: '', description: '', requirements: '', applyLink: '', applyEmail: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);
    setTimeout(() => { onSubmit(form); onClose(); }, 1500);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
        style={{ top: 'var(--nav-height)' }}
        onClick={onClose}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-foreground/40" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-card rounded-2xl w-full max-w-2xl my-4"
          style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)', overflowY: 'auto' }}
          onClick={e => e?.stopPropagation()}
        >
          <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="font-semibold text-lg text-foreground">Post a Job</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <Icon name="X" size={18} color="var(--color-text-secondary)" />
            </button>
          </div>

          {submitted ? (
            <div className="p-10 flex flex-col items-center justify-center text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--color-success)' }}>
                <Icon name="CheckCircle" size={32} color="#fff" />
              </motion.div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Job Posted Successfully!</h3>
              <p className="text-sm text-text-secondary">Your job listing is now live in the alumni community.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Job Title" type="text" placeholder="e.g. Senior Product Manager" value={form?.title} onChange={e => handleChange('title', e?.target?.value)} required />
                <Input label="Company Name" type="text" placeholder="e.g. Acme Corp" value={form?.company} onChange={e => handleChange('company', e?.target?.value)} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Location" type="text" placeholder="e.g. San Francisco, CA" value={form?.location} onChange={e => handleChange('location', e?.target?.value)} required />
                <Input label="Salary Range" type="text" placeholder="e.g. $120K - $160K" value={form?.salary} onChange={e => handleChange('salary', e?.target?.value)} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'function', label: 'Function', options: FUNCTION_OPTIONS },
                  { key: 'experience', label: 'Experience', options: EXPERIENCE_OPTIONS },
                  { key: 'workType', label: 'Work Type', options: WORK_TYPE_OPTIONS },
                  { key: 'jobType', label: 'Job Type', options: JOB_TYPE_OPTIONS },
                ]?.map(({ key, label, options }) => (
                  <div key={key}>
                    <label className="block text-xs text-text-secondary mb-1 font-medium">{label}</label>
                    <select value={form?.[key]} onChange={e => handleChange(key, e?.target?.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      {options?.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1 font-medium">Job Description <span className="text-error">*</span></label>
                <textarea value={form?.description} onChange={e => handleChange('description', e?.target?.value)} required rows={4}
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1 font-medium">Requirements (one per line)</label>
                <textarea value={form?.requirements} onChange={e => handleChange('requirements', e?.target?.value)} rows={3}
                  placeholder="5+ years of experience&#10;Strong communication skills&#10;Bachelor's degree required"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Apply Link (URL)" type="url" placeholder="https://careers.company.com/job" value={form?.applyLink} onChange={e => handleChange('applyLink', e?.target?.value)} />
                <Input label="Apply via Email" type="email" placeholder="hiring@company.com" value={form?.applyEmail} onChange={e => handleChange('applyEmail', e?.target?.value)} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="default" size="lg" fullWidth iconName="Send" iconPosition="right">
                  Post Job
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={onClose}>Cancel</Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}