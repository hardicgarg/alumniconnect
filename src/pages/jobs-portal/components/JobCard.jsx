import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function JobCard({ job, onSave, onApply, onView, isSaved }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 md:p-5 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 relative"
      style={{ boxShadow: 'var(--shadow-sm)' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
      onClick={() => onView(job)}
    >
      {job?.featured && (
        <div className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
          Featured
        </div>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-muted">
          <Image src={job?.companyLogo} alt={`${job?.company} company logo with brand colors`} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1 group-hover:text-accent transition-colors">{job?.title}</h3>
          <p className="text-xs md:text-sm text-text-secondary">{job?.company}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="flex items-center gap-1 text-xs text-text-secondary">
          <Icon name="MapPin" size={11} color="currentColor" />
          {job?.location}
        </span>
        <span className="flex items-center gap-1 text-xs text-text-secondary">
          <Icon name="Briefcase" size={11} color="currentColor" />
          {job?.function}
        </span>
        <span className="flex items-center gap-1 text-xs text-text-secondary">
          <Icon name="Clock" size={11} color="currentColor" />
          {job?.experience}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs px-2 py-0.5 rounded-full border border-border text-text-secondary">{job?.workType}</span>
        <span className="text-xs px-2 py-0.5 rounded-full border border-border text-text-secondary">{job?.jobType}</span>
        {job?.salary && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-muted)', color: 'var(--color-text-primary)' }}>
            {job?.salary}
          </span>
        )}
      </div>
      {job?.postedByAlumni && (
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg" style={{ background: 'var(--color-muted)' }}>
          <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
            <Image src={job?.posterAvatar} alt={`Alumni ${job?.postedBy} professional headshot`} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs text-text-secondary">
            Posted by <span className="font-medium text-foreground">{job?.postedBy}</span>
            <span className="ml-1 text-xs px-1.5 py-0.5 rounded-sm" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>Alumni</span>
          </span>
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-text-secondary">{job?.postedDate}</span>
        <div className="flex items-center gap-2" onClick={e => e?.stopPropagation()}>
          <button
            onClick={() => onSave(job?.id)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 ${isSaved ? 'border-accent' : 'border-border hover:border-foreground'}`}
            style={isSaved ? { background: 'var(--color-accent)', color: '#fff' } : {}}
            aria-label="Save job"
          >
            <Icon name="Bookmark" size={14} color={isSaved ? '#fff' : 'var(--color-text-secondary)'} />
          </button>
          <Button variant="default" size="sm" onClick={() => onApply(job)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}