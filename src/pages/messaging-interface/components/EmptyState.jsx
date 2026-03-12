import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

export default function EmptyState({ onNewMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full w-full px-8 text-center"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative mb-6"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            boxShadow: '0 8px 24px rgba(232, 197, 71, 0.3)'
          }}
        >
          <Icon name="MessageSquare" size={34} color="var(--color-primary-foreground)" />
        </div>
        {/* Decorative dots */}
        <div
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full"
          style={{ background: 'var(--color-primary)', opacity: 0.4 }}
        />
        <div
          className="absolute -bottom-1 -left-2 w-2.5 h-2.5 rounded-full"
          style={{ background: 'var(--color-accent)', opacity: 0.5 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <h3
          className="font-heading font-semibold text-xl mb-2"
          style={{ color: 'var(--color-foreground)' }}
        >
          Your Messages
        </h3>
        <p
          className="text-sm leading-relaxed max-w-[260px] mx-auto mb-7"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Select a conversation from the list to start chatting, or send a new message to connect with fellow alumni.
        </p>

        <button
          onClick={onNewMessage}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            boxShadow: '0 4px 12px rgba(232, 197, 71, 0.35)'
          }}
        >
          <Icon name="SquarePen" size={15} color="currentColor" />
          New Message
        </button>
      </motion.div>
    </motion.div>
  );
}