import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CATEGORIES = ['Technology', 'Finance', 'Healthcare', 'Education', 'E-Commerce', 'Consulting', 'Media', 'Real Estate', 'Food & Beverage', 'Other'];

export default function AddBusinessModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', category: '', city: '', description: '', website: '', email: '', services: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e?.target?.name]: e?.target?.value }));

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);
    setTimeout(() => { onClose(); }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
        style={{ top: 'var(--nav-height)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-[var(--color-card)] rounded-2xl w-full max-w-lg overflow-hidden flex flex-col my-4"
          style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)' }}
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] flex-shrink-0">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-foreground)]">List Your Business</h2>
              <p className="text-xs text-[var(--color-text-secondary)]">Share your alumni-owned business with the community</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[var(--color-muted)] flex items-center justify-center transition-colors">
              <Icon name="X" size={16} color="var(--color-text-secondary)" />
            </button>
          </div>

          {/* Form */}
          <div className="overflow-y-auto flex-1 px-6 py-5">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <Icon name="CheckCircle" size={32} color="var(--color-success)" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-1">Business Listed!</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Your business has been submitted for review.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">Business Name *</label>
                  <input name="name" value={form?.name} onChange={handleChange} required placeholder="e.g. Acme Solutions" className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">Category *</label>
                    <select name="category" value={form?.category} onChange={handleChange} required className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                      <option value="">Select...</option>
                      {CATEGORIES?.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">City *</label>
                    <input name="city" value={form?.city} onChange={handleChange} required placeholder="e.g. San Francisco" className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">Short Description *</label>
                  <textarea name="description" value={form?.description} onChange={handleChange} required rows={3} placeholder="Describe what your business does..." className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">Services (comma-separated)</label>
                  <input name="services" value={form?.services} onChange={handleChange} placeholder="e.g. Consulting, Design, Development" className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">Website</label>
                    <input name="website" value={form?.website} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-1">Contact Email</label>
                    <input name="email" value={form?.email} onChange={handleChange} type="email" placeholder="hello@..." className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" fullWidth onClick={onClose}>Cancel</Button>
                  <Button type="submit" variant="default" fullWidth iconName="Plus" iconPosition="left" iconSize={15}>List Business</Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
