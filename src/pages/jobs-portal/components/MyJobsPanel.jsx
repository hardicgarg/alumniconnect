import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function MyJobsPanel({ savedJobs, postedJobs, allJobs, onView, onUnsave }) {
  const savedJobsList = allJobs?.filter(j => savedJobs?.has(j?.id));

  return (
    <div className="space-y-6">
      {/* Saved Jobs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Bookmark" size={16} color="var(--color-accent)" />
          <h3 className="font-semibold text-sm text-foreground">Saved Jobs ({savedJobsList?.length})</h3>
        </div>
        {savedJobsList?.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Icon name="Bookmark" size={32} color="var(--color-text-secondary)" className="mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No saved jobs yet. Bookmark jobs to find them here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedJobsList?.map(job => (
              <div key={job?.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-muted">
                  <Image src={job?.companyLogo} alt={`${job?.company} logo`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground line-clamp-1">{job?.title}</p>
                  <p className="text-xs text-text-secondary">{job?.company} · {job?.location}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="outline" size="xs" onClick={() => onView(job)}>View</Button>
                  <button onClick={() => onUnsave(job?.id)} className="w-7 h-7 rounded-lg flex items-center justify-center border border-border hover:border-error transition-colors">
                    <Icon name="X" size={12} color="var(--color-text-secondary)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Posted Jobs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Send" size={16} color="var(--color-accent)" />
          <h3 className="font-semibold text-sm text-foreground">Jobs I Posted ({postedJobs?.length})</h3>
        </div>
        {postedJobs?.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Icon name="PlusCircle" size={32} color="var(--color-text-secondary)" className="mx-auto mb-3" />
            <p className="text-sm text-text-secondary">You haven&apos;t posted any jobs yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {postedJobs?.map((job, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm text-foreground">{job?.title}</p>
                    <p className="text-xs text-text-secondary">{job?.company} · {job?.location}</p>
                    <p className="text-xs text-text-secondary mt-1">{job?.workType} · {job?.jobType}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-success)', color: '#fff' }}>Live</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}