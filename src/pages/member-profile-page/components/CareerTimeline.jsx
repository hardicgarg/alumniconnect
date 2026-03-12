import React from 'react';
import Icon from 'components/AppIcon';

export default function CareerTimeline({ careerHistory, education }) {
  return (
    <div className="bg-[var(--color-card)] rounded-2xl p-5 md:p-6 border border-[var(--color-border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Career */}
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
        <Icon name="Briefcase" size={18} color="var(--color-primary)" />
        Career
      </h2>
      <div className="relative pl-5 mb-6">
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />
        {careerHistory?.map((item, i) => (
          <div key={i} className="relative mb-5 last:mb-0">
            <div className="absolute -left-5 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-card)]" />
            <div className="bg-[var(--color-muted)] rounded-xl p-3.5">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-foreground)]">{item?.role}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item?.company}</p>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-card)] px-2 py-1 rounded-lg border border-[var(--color-border)] whitespace-nowrap">{item?.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
        <Icon name="GraduationCap" size={18} color="var(--color-primary)" />
        Education
      </h2>
      <div className="relative pl-5">
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />
        {education?.map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <div className="absolute -left-5 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-card)]" />
            <div className="bg-[var(--color-muted)] rounded-xl p-3.5">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-foreground)]">{item?.degree}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item?.school}</p>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-card)] px-2 py-1 rounded-lg border border-[var(--color-border)]">{item?.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
