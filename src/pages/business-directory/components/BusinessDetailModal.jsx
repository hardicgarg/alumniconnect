import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function BusinessDetailModal({ business, onClose }) {
  const navigate = useNavigate();
  if (!business) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4"
        style={{ top: 'var(--nav-height)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-[var(--color-card)] rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col my-4"
          style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)' }}
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Banner + Logo — kept together outside scroll so logo is never clipped */}
          <div className="relative flex-shrink-0">
            {/* Banner */}
            <div className="h-32" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }} />
            {/* Close button */}
            <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors z-20">
              <Icon name="X" size={16} color="white" />
            </button>
            {/* Logo — absolutely positioned to straddle banner bottom */}
            <div className="absolute left-6 z-20" style={{ bottom: '-40px' }}>
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-[var(--color-card)] bg-[var(--color-muted)] flex items-center justify-center" style={{ boxShadow: 'var(--shadow-md)' }}>
                {business?.logo ? (
                  <Image src={business?.logo} alt={business?.name + ' logo'} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="Building2" size={28} color="var(--color-text-secondary)" />
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            <div className="px-6 pb-4">
              {/* Spacer so content starts below the overlapping logo */}
              <div className="pt-12 pb-1 mb-2">
                <h2 className="text-xl font-bold text-[var(--color-foreground)] leading-tight break-words">{business?.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(232,197,71,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(232,197,71,0.3)' }}>{business?.category}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-muted)] text-[var(--color-text-secondary)]">{business?.city}</span>
                </div>
              </div>

              {/* About */}
              <div className="mb-5">
                <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-2">About</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{business?.about || business?.description}</p>
              </div>

              {/* Services */}
              {business?.services?.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {business?.services?.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {business?.website && (
                  <a href={business?.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] transition-colors">
                    <Icon name="Globe" size={14} color="var(--color-primary)" />
                    {business?.website?.replace('https://', '')}
                  </a>
                )}
                {business?.email && (
                  <span className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <Icon name="Mail" size={14} color="var(--color-primary)" />
                    {business?.email}
                  </span>
                )}
              </div>

              {/* Founder Snippet */}
              <div className="p-4 rounded-xl bg-[var(--color-muted)] border border-[var(--color-border)]">
                <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">Founder</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--color-border)] flex-shrink-0">
                    <Image src={business?.founderAvatar} alt={business?.founderName + ' founder photo'} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[var(--color-foreground)]">{business?.founderName}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{business?.founderBatch} · {business?.founderRole}</p>
                  </div>
                  <Button variant="outline" size="sm" iconName="UserPlus" iconSize={13} onClick={() => navigate('/member-directory')}>
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer CTA */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-card)] flex gap-3">
            <Button variant="default" fullWidth iconName="MessageSquare" iconPosition="left" iconSize={15} onClick={() => { onClose(); navigate('/messaging-interface'); }}>
              Message Founder
            </Button>
            {business?.website && (
              <Button variant="outline" iconName="ExternalLink" iconSize={15} onClick={() => window.open(business?.website, '_blank')}>
                Visit
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
