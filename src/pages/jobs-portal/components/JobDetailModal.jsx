import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function JobDetailModal({ job, onClose, onSave, isSaved, onApply }) {
  if (!job) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
        style={{ top: 'var(--nav-height)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/40"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-card rounded-2xl w-full max-w-2xl my-4"
          style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)', overflowY: 'auto' }}
          onClick={e => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-border bg-muted">
                <Image src={job?.companyLogo} alt={`${job?.company} company logo`} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-semibold text-base md:text-lg text-foreground">{job?.title}</h2>
                <p className="text-sm text-text-secondary">{job?.company}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <Icon name="X" size={18} color="var(--color-text-secondary)" />
            </button>
          </div>

          <div className="p-5">
            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-5">
              {[
                { icon: 'MapPin', text: job?.location },
                { icon: 'Briefcase', text: job?.function },
                { icon: 'Clock', text: job?.experience },
                { icon: 'Laptop', text: job?.workType },
                { icon: 'DollarSign', text: job?.salary },
              ]?.filter(m => m?.text)?.map((meta, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-text-secondary px-3 py-1.5 rounded-lg border border-border">
                  <Icon name={meta.icon} size={14} color="var(--color-accent)" />
                  {meta.text}
                </div>
              ))}
            </div>

            {/* Alumni Poster */}
            {job?.postedByAlumni && (
              <div className="flex items-center gap-3 p-3 rounded-xl mb-5" style={{ background: 'var(--color-muted)' }}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                  <Image src={job?.posterAvatar} alt={`Alumni ${job?.postedBy} professional headshot`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{job?.postedBy}</p>
                  <p className="text-xs text-text-secondary">{job?.posterRole} · {job?.posterBatch}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                  Alumni
                </span>
              </div>
            )}

            {/* Description */}
            <div className="mb-5">
              <h3 className="font-semibold text-sm text-foreground mb-2">About the Role</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{job?.description}</p>
            </div>

            {/* Requirements */}
            <div className="mb-5">
              <h3 className="font-semibold text-sm text-foreground mb-2">Requirements</h3>
              <ul className="space-y-1.5">
                {job?.requirements?.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            {job?.benefits && (
              <div className="mb-5">
                <h3 className="font-semibold text-sm text-foreground mb-2">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {job?.benefits?.map((b, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-border text-text-secondary">{b}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button variant="default" size="lg" fullWidth onClick={() => onApply(job)} iconName="ExternalLink" iconPosition="right">
                Apply Now
              </Button>
              <button
                onClick={() => onSave(job?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${isSaved ? 'border-accent' : 'border-border hover:border-foreground'}`}
                style={isSaved ? { background: 'var(--color-accent)', color: '#fff' } : {}}
              >
                <Icon name="Bookmark" size={16} color={isSaved ? '#fff' : 'var(--color-text-secondary)'} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}