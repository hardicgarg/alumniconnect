import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialProof from './components/SocialProof';
import TrustBadges from './components/TrustBadges';
import FeatureHighlight from './components/FeatureHighlight';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
};

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(232,197,71,0.35) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(232,197,71,0.5) 0%, transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* ── Left Panel: Feature Highlight (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="hidden lg:flex lg:w-1/2 xl:w-[55%] p-8 xl:p-12 flex-col justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(245,242,236,0.9) 0%, rgba(232,197,71,0.08) 100%)' }}
        >
          <FeatureHighlight />
        </motion.div>

        {/* ── Right Panel: Auth Form ── */}
        <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-10 xl:px-16">
          <motion.div
            {...fadeInUp}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-primary)', boxShadow: '0 4px 12px rgba(232,197,71,0.4)' }}
              >
                <Icon name="GraduationCap" size={22} color="var(--color-primary-foreground)" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-heading font-700" style={{ color: 'var(--color-foreground)' }}>
                Alumni<span style={{ color: 'var(--color-primary)' }}>Connect</span>
              </span>
            </div>

            {/* Card */}
            <div
              className="w-full rounded-2xl p-6 md:p-8 border"
              style={{
                background: 'var(--color-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Heading */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-heading font-700 mb-1" style={{ color: 'var(--color-foreground)' }}>
                  Welcome back
                </h2>
                <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                  Sign in to your alumni account to continue
                </p>
              </div>

              {/* Social Proof (mobile only) */}
              <div className="lg:hidden mb-5">
                <SocialProof />
              </div>

              {/* Form */}
              <LoginForm />

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                <span className="text-xs font-caption" style={{ color: 'var(--color-text-secondary)' }}>
                  New to AlumniConnect?
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              </div>

              {/* Sign Up CTA */}
              <button
                type="button"
                onClick={() => navigate('/sign-up')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-body font-500 text-sm transition-all duration-250 hover:shadow-md"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-foreground)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-muted)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                <Icon name="UserPlus" size={16} color="currentColor" />
                Create a free account
              </button>
            </div>

            {/* Social Proof (desktop) */}
            <div className="hidden lg:block mt-6">
              <SocialProof />
            </div>

            {/* Trust Badges */}
            <div className="mt-5">
              <TrustBadges />
            </div>

            {/* Footer links */}
            <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
              <button
                type="button"
                className="text-xs font-caption transition-colors duration-250 hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Privacy Policy
              </button>
              <span className="text-xs" style={{ color: 'var(--color-border)' }}>•</span>
              <button
                type="button"
                className="text-xs font-caption transition-colors duration-250 hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Terms of Service
              </button>
              <span className="text-xs" style={{ color: 'var(--color-border)' }}>•</span>
              <button
                type="button"
                className="text-xs font-caption transition-colors duration-250 hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Help Center
              </button>
            </div>

            <p className="text-center text-xs font-caption mt-3" style={{ color: 'var(--color-text-secondary)' }}>
              &copy; {new Date()?.getFullYear()} AlumniConnect. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}