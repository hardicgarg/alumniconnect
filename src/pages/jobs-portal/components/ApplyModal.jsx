import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

export default function ApplyModal({ job, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: 'Alex Rivera', email: 'alex.rivera@email.com', phone: '', coverLetter: '', linkedIn: '' });

  if (!job) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    setStep(2);
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
          className="relative bg-card rounded-2xl w-full max-w-lg my-4"
          style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)', overflowY: 'auto' }}
          onClick={e => e?.stopPropagation()}
        >
          <div className="border-b border-border px-5 py-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-base text-foreground">Apply for Position</h2>
              <p className="text-xs text-text-secondary">{job?.title} · {job?.company}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <Icon name="X" size={18} color="var(--color-text-secondary)" />
            </button>
          </div>

          {step === 2 ? (
            <div className="p-8 flex flex-col items-center text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--color-success)' }}>
                <Icon name="CheckCircle" size={32} color="#fff" />
              </motion.div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Application Submitted!</h3>
              <p className="text-sm text-text-secondary mb-4">Your application for <strong>{job?.title}</strong> at <strong>{job?.company}</strong> has been sent.</p>
              <Button variant="default" onClick={onClose}>Done</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" type="text" value={form?.name} onChange={e => setForm(f => ({ ...f, name: e?.target?.value }))} required />
                <Input label="Email Address" type="email" value={form?.email} onChange={e => setForm(f => ({ ...f, email: e?.target?.value }))} required />
              </div>
              <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form?.phone} onChange={e => setForm(f => ({ ...f, phone: e?.target?.value }))} />
              <Input label="LinkedIn Profile" type="url" placeholder="https://linkedin.com/in/yourname" value={form?.linkedIn} onChange={e => setForm(f => ({ ...f, linkedIn: e?.target?.value }))} />
              <div>
                <label className="block text-xs text-text-secondary mb-1 font-medium">Cover Letter</label>
                <textarea value={form?.coverLetter} onChange={e => setForm(f => ({ ...f, coverLetter: e?.target?.value }))} rows={4}
                  placeholder="Tell them why you're a great fit..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="default" size="lg" fullWidth iconName="Send" iconPosition="right">Submit Application</Button>
                <Button type="button" variant="outline" size="lg" onClick={onClose}>Cancel</Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}