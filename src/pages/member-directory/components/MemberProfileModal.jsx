import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

export default function MemberProfileModal({ member, onClose, onMessage }) {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(member?.isConnected || false);
  const [activeTab, setActiveTab] = useState('about');

  if (!member) return null;

  const tabs = [
    { value: 'about', label: 'About' },
    { value: 'career', label: 'Career' },
    { value: 'education', label: 'Education' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
        style={{ top: 'var(--nav-height)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          className="relative bg-[var(--color-card)] rounded-2xl w-full max-w-lg overflow-hidden flex flex-col my-4"
          style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)' }}
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header Banner */}
          <div className="relative h-28 flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }}>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={16} color="white" />
            </button>
            {/* Avatar absolutely positioned to overlap banner bottom */}
            <div className="absolute -bottom-10 left-5 md:left-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-[var(--color-card)]" style={{ boxShadow: 'var(--shadow-md)' }}>
                <Image src={member?.avatar} alt={member?.avatarAlt} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Avatar spacer + action buttons row */}
          <div className="px-5 md:px-6 pb-0 flex-shrink-0">
            <div className="flex items-center justify-end pt-3 pb-3 min-h-[44px]" style={{ paddingLeft: '88px' }}>
              <div className="flex gap-2">
                <Button
                  variant={connected ? 'secondary' : 'default'}
                  size="sm"
                  iconName={connected ? 'UserCheck' : 'UserPlus'}
                  iconPosition="left"
                  iconSize={14}
                  onClick={() => setConnected(!connected)}
                >
                  {connected ? 'Connected' : 'Connect'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                  iconSize={14}
                  onClick={() => { onClose(); navigate('/messaging-interface'); }}
                >
                  Message
                </Button>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg md:text-xl font-bold text-[var(--color-foreground)]">{member?.name}</h2>
                {member?.isOnline && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Online
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{member?.role} at {member?.company}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1"><Icon name="MapPin" size={12} color="currentColor" />{member?.location}</span>
                <span className="flex items-center gap-1"><Icon name="GraduationCap" size={12} color="currentColor" />{member?.batch}</span>
                <span className="flex items-center gap-1"><Icon name="Users" size={12} color="currentColor" />{member?.mutualConnections} mutual</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-[var(--color-border)]">
              {tabs?.map(tab => (
                <button
                  key={tab?.value}
                  onClick={() => setActiveTab(tab?.value)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === tab?.value
                      ? 'border-[var(--color-primary)] text-[var(--color-foreground)]'
                      : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]'
                  }`}
                >
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4">
            {activeTab === 'about' && (
              <div className="space-y-4">
                {member?.bio && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">About</h4>
                    <p className="text-sm text-[var(--color-foreground)] leading-relaxed">{member?.bio}</p>
                  </div>
                )}
                {member?.expertise && member?.expertise?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member?.expertise?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                {member?.chapter && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Chapter</h4>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-foreground)]">
                      <Icon name="Building2" size={14} color="var(--color-accent)" />
                      {member?.chapter} Chapter
                    </span>
                  </div>
                )}
                {member?.interests && member?.interests?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {member?.interests?.map(i => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs bg-yellow-50 text-yellow-800 border border-yellow-200">{i}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'career' && (
              <div className="space-y-3">
                {member?.careerHistory?.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-muted)] flex items-center justify-center flex-shrink-0">
                        <Icon name="Briefcase" size={14} color="var(--color-accent)" />
                      </div>
                      {idx < member?.careerHistory?.length - 1 && <div className="w-0.5 flex-1 bg-[var(--color-border)] mt-1" />}
                    </div>
                    <div className="pb-3">
                      <p className="font-semibold text-sm text-[var(--color-foreground)]">{item?.role}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{item?.company}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item?.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'education' && (
              <div className="space-y-3">
                {member?.education?.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-muted)] flex items-center justify-center flex-shrink-0">
                      <Icon name="GraduationCap" size={14} color="var(--color-accent)" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--color-foreground)]">{item?.degree}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{item?.school}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item?.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}