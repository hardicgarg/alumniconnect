import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FEATURES = [
{
  icon: 'Users',
  title: 'Network with Alumni',
  description: 'Connect with 12,400+ graduates across 80+ countries and industries.'
},
{
  icon: 'Briefcase',
  title: 'Career Opportunities',
  description: 'Discover exclusive jobs posted by fellow alumni at top companies.'
},
{
  icon: 'Calendar',
  title: 'Events & Reunions',
  description: 'RSVP to alumni galas, networking nights, and virtual meetups.'
},
{
  icon: 'MessageSquare',
  title: 'Direct Messaging',
  description: 'Reach out to mentors, collaborators, and old classmates directly.'
}];


const TESTIMONIAL = {
  quote: "AlumniConnect helped me land my dream role at Google through a referral from a batchmate I reconnected with here.",
  name: 'Priya Sharma',
  role: 'Product Manager, Google · Class of 2017',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1524059f7-1763300494995.png",
  avatarAlt: 'Professional Indian woman with dark hair in business casual attire smiling confidently'
};

export default function FeatureHighlight() {
  return (
    <div className="flex flex-col h-full justify-between gap-8 lg:gap-10">
      {/* Header */}
      <div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-caption font-500 mb-4"
          style={{ background: 'rgba(232,197,71,0.18)', color: 'var(--color-accent)' }}>
          
          <Icon name="Sparkles" size={12} color="currentColor" />
          Alumni Community Platform
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-700 leading-tight mb-3" style={{ color: 'var(--color-foreground)' }}>
          Stay Connected.<br />
          <span style={{ color: 'var(--color-primary)' }}>Grow Together.</span>
        </h1>
        <p className="text-sm md:text-base font-body leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Your private alumni community — network, discover opportunities, and celebrate milestones with fellow graduates.
        </p>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {FEATURES?.map((feature) =>
        <div
          key={feature?.title}
          className="flex items-start gap-3 p-3 md:p-4 rounded-xl border transition-all duration-250 hover:shadow-md"
          style={{
            background: 'rgba(255,255,255,0.7)',
            borderColor: 'var(--color-border)',
            backdropFilter: 'blur(8px)'
          }}>
          
            <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--color-primary)' }}>
            
              <Icon name={feature?.icon} size={16} color="var(--color-primary-foreground)" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-body font-500 mb-0.5" style={{ color: 'var(--color-foreground)' }}>
                {feature?.title}
              </p>
              <p className="text-xs font-caption leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {feature?.description}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Testimonial */}
      <div
        className="p-4 md:p-5 rounded-2xl border"
        style={{
          background: 'rgba(255,255,255,0.85)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
        
        <div className="flex items-start gap-1 mb-3">
          {[1, 2, 3, 4, 5]?.map((s) =>
          <Icon key={s} name="Star" size={13} color="var(--color-primary)" />
          )}
        </div>
        <p className="text-sm font-body italic leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          &ldquo;{TESTIMONIAL?.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: 'var(--color-primary)' }}>
            <Image src={TESTIMONIAL?.avatar} alt={TESTIMONIAL?.avatarAlt} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-body font-500" style={{ color: 'var(--color-foreground)' }}>{TESTIMONIAL?.name}</p>
            <p className="text-xs font-caption" style={{ color: 'var(--color-text-secondary)' }}>{TESTIMONIAL?.role}</p>
          </div>
        </div>
      </div>
    </div>);

}