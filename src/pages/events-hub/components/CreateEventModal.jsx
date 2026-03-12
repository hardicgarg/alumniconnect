import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const EVENT_TYPES = ['Networking', 'Workshop', 'Reunion', 'Webinar', 'Conference', 'Social'];

export default function CreateEventModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '', type: 'Networking', date: '', time: '', venue: '', city: '',
    description: '', organizer: 'Alex Rivera', maxAttendees: '', isVirtual: false,
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form?.title?.trim()) e.title = 'Title is required';
    if (!form?.date) e.date = 'Date is required';
    if (!form?.time) e.time = 'Time is required';
    if (!form?.venue?.trim()) e.venue = 'Venue is required';
    if (!form?.city?.trim()) e.city = 'City is required';
    if (!form?.description?.trim()) e.description = 'Description is required';
    setErrors(e);
    return !Object.keys(e)?.length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onCreate(form);
    onClose();
  };

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ top: 'var(--nav-height)' }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl w-full max-w-xl my-4 overflow-hidden flex flex-col"
        style={{ boxShadow: 'var(--shadow-xl)', maxHeight: 'calc(100vh - var(--nav-height) - 2rem)' }}
        onClick={e => e?.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-bold text-foreground">Create New Event</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-all" aria-label="Close">
            <Icon name="X" size={18} color="var(--color-text-secondary)" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Banner placeholder */}
          <div className="border-2 border-dashed border-border rounded-xl h-28 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-amber-400 transition-all">
            <Icon name="ImagePlus" size={24} color="var(--color-text-secondary)" />
            <p className="text-sm text-text-secondary">Upload Event Banner</p>
            <p className="text-xs text-text-secondary">Recommended: 1200×400px</p>
          </div>

          <Input label="Event Title" type="text" placeholder="e.g. Annual Alumni Networking Gala" value={form?.title} onChange={e => set('title', e?.target?.value)} error={errors?.title} required />

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Event Type <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES?.map(t => (
                <button
                  key={t}
                  onClick={() => set('type', t)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-all font-medium ${form?.type === t ? '' : 'border-border text-text-secondary hover:border-amber-300'}`}
                  style={form?.type === t ? { background: 'var(--color-primary)', color: 'var(--color-primary-foreground)', borderColor: 'var(--color-primary)' } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" value={form?.date} onChange={e => set('date', e?.target?.value)} error={errors?.date} required />
            <Input label="Time" type="time" value={form?.time} onChange={e => set('time', e?.target?.value)} error={errors?.time} required />
          </div>

          <Input label="Venue / Location" type="text" placeholder="e.g. Grand Ballroom, Marriott Hotel" value={form?.venue} onChange={e => set('venue', e?.target?.value)} error={errors?.venue} required />
          <Input label="City" type="text" placeholder="e.g. San Francisco" value={form?.city} onChange={e => set('city', e?.target?.value)} error={errors?.city} required />
          <Input label="Max Attendees" type="number" placeholder="e.g. 200" value={form?.maxAttendees} onChange={e => set('maxAttendees', e?.target?.value)} />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description <span className="text-red-500">*</span></label>
            <textarea
              rows={4}
              placeholder="Describe your event..."
              value={form?.description}
              onChange={e => set('description', e?.target?.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none transition-all"
            />
            {errors?.description && <p className="text-xs text-red-500 mt-1">{errors?.description}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => set('isVirtual', !form?.isVirtual)}
              className={`w-11 h-6 rounded-full transition-all relative ${form?.isVirtual ? '' : 'bg-muted'}`}
              style={form?.isVirtual ? { background: 'var(--color-primary)' } : {}}
              aria-label="Toggle virtual event"
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form?.isVirtual ? 'left-5' : 'left-0.5'}`} />
            </button>
            <span className="text-sm text-foreground">Virtual / Online Event</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-border p-4 flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>Cancel</Button>
          <Button variant="default" fullWidth iconName="Plus" iconPosition="left" onClick={handleSubmit}>Create Event</Button>
        </div>
      </div>
    </div>
  );
}