import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function FeaturedJobs({ jobs, onView, onSave, savedJobs }) {
  if (!jobs?.length) return null;
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="Star" size={16} color="var(--color-accent)" />
        <h2 className="font-semibold text-sm md:text-base text-foreground">Featured Opportunities</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {jobs?.map(job => (
          <div
            key={job?.id}
            className="relative bg-card border-2 rounded-xl p-3 sm:p-4 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: 'var(--color-primary)', boxShadow: '0 4px 20px rgba(232,197,71,0.15)' }}
            onClick={() => onView(job)}
          >
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              ⭐ Featured
            </div>
            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-muted">
                <Image src={job?.companyLogo} alt={`${job?.company} company logo`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 pr-10 sm:pr-12">
                <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1 group-hover:text-accent transition-colors">{job?.title}</h3>
                <p className="text-xs text-text-secondary truncate">{job?.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
              <span className="flex items-center gap-1 text-xs text-text-secondary"><Icon name="MapPin" size={10} color="currentColor" /><span className="truncate max-w-[100px]">{job?.location}</span></span>
              <span className="flex items-center gap-1 text-xs text-text-secondary"><Icon name="DollarSign" size={10} color="currentColor" />{job?.salary}</span>
            </div>
            <div className="flex items-center justify-between" onClick={e => e?.stopPropagation()}>
              <span className="text-xs text-text-secondary">{job?.postedDate}</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button onClick={() => onSave(job?.id)} className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${savedJobs?.has(job?.id) ? 'border-accent' : 'border-border'}`}
                  style={savedJobs?.has(job?.id) ? { background: 'var(--color-accent)', color: '#fff' } : {}}>
                  <Icon name="Bookmark" size={12} color={savedJobs?.has(job?.id) ? '#fff' : 'var(--color-text-secondary)'} />
                </button>
                <Button variant="default" size="xs">Apply</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}