import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const TABS = ['About', 'Members', 'Discussions', 'Events'];

const MOCK_MEMBERS = [
{ id: 1, name: 'Sarah Johnson', role: 'Product Manager, Google', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_123050df3-1772207174903.png", avatarAlt: 'Professional woman with warm smile in business casual attire', groupRole: 'Admin', batch: '2015' },
{ id: 2, name: 'Michael Chen', role: 'Staff Engineer, Meta', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13f854515-1763293689585.png", avatarAlt: 'Asian man in professional attire with confident expression', groupRole: 'Moderator', batch: '2018' },
{ id: 3, name: 'Emily Rodriguez', role: 'VP Marketing, Stripe', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b14899b2-1763294769391.png", avatarAlt: 'Latina woman with bright smile in professional setting', groupRole: 'Member', batch: '2013' },
{ id: 4, name: 'David Kim', role: 'Data Scientist, Amazon', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1106c011c-1772526778426.png", avatarAlt: 'Korean-American man in smart casual clothing', groupRole: 'Member', batch: '2016' },
{ id: 5, name: 'Jessica Park', role: 'UX Lead, Apple', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3dcc45f-1772203448327.png", avatarAlt: 'Young professional woman with glasses and confident smile', groupRole: 'Member', batch: '2019' },
{ id: 6, name: 'Ryan Thompson', role: 'Investment Director, Goldman', avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d6c8dc3c-1772920738288.png', avatarAlt: 'Caucasian man in business casual attire smiling in bright office', groupRole: 'Member', batch: '2012' }];


const MOCK_DISCUSSIONS = [
{ id: 1, author: 'Sarah Johnson', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_141e51895-1763296519617.png", avatarAlt: 'Sarah Johnson profile photo', title: 'Best co-working spaces in NYC for remote alumni?', body: 'Looking for recommendations on co-working spaces near Midtown. Anyone have a favorite spot with good networking vibes?', replies: 14, likes: 28, time: '2h ago', pinned: true },
{ id: 2, author: 'Michael Chen', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5f5dfa8-1763292069790.png", avatarAlt: 'Michael Chen profile photo', title: 'Upcoming happy hour at The Standard — who\'s in?', body: 'Planning an informal meetup next Friday evening at The Standard High Line. Drop a comment if you\'re interested!', replies: 22, likes: 41, time: '1d ago', pinned: false },
{ id: 3, author: 'Emily Rodriguez', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png", avatarAlt: 'Emily Rodriguez profile photo', title: 'Job board: Fintech openings in NYC Q2 2026', body: 'Sharing a curated list of fintech roles I\'ve come across this week. DM me if you want intros to any of these companies.', replies: 9, likes: 35, time: '3d ago', pinned: false },
{ id: 4, author: 'David Kim', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12845b898-1763301182465.png", avatarAlt: 'David Kim profile photo', title: 'AI/ML study group forming — interested?', body: 'Thinking of starting a bi-weekly study group on applied ML. Would love to have 6–8 people. Reply if you want to join!', replies: 17, likes: 52, time: '5d ago', pinned: false }];


const MOCK_EVENTS = [
{ id: 1, title: 'NYC Alumni Rooftop Mixer', date: 'Apr 18, 2026', time: '6:00 PM', venue: 'The Top of the Standard, NYC', attendees: 64, type: 'Networking' },
{ id: 2, title: 'Career Panel: Finance & Tech Crossover', date: 'May 3, 2026', time: '7:00 PM', venue: 'WeWork SoHo, NYC', attendees: 38, type: 'Panel' },
{ id: 3, title: 'Annual NYC Chapter Gala', date: 'Jun 14, 2026', time: '7:30 PM', venue: 'Cipriani 42nd Street, NYC', attendees: 210, type: 'Gala' }];


export default function GroupDetailModal({ group, onClose }) {
  const [activeTab, setActiveTab] = useState('About');
  const [joined, setJoined] = useState(group?.isMember || false);

  if (!group) return null;

  return (
    <div
      className="fixed left-0 right-0 bottom-0 flex items-start justify-center z-50 px-4 py-4"
      style={{ top: 'var(--nav-height)' }}
      onClick={onClose}>
      
      <div
        className="bg-[var(--color-card)] rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col"
        style={{
          boxShadow: 'var(--shadow-xl)',
          maxHeight: 'calc(100vh - var(--nav-height) - 2rem)'
        }}
        onClick={(e) => e?.stopPropagation()}>
        
        {/* Banner */}
        <div className="relative h-40 flex-shrink-0 overflow-hidden">
          <Image src={group?.banner} alt={group?.bannerAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all">
            
            <Icon name="X" size={16} color="currentColor" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-[var(--color-primary-foreground)] border-2 border-white/30"
                style={{ background: group?.color || 'var(--color-primary)' }}>
                
                {group?.emoji || group?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">{group?.name}</h2>
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <Icon name="MapPin" size={10} color="currentColor" />
                  {group?.location} · {group?.memberCount?.toLocaleString()} members
                </p>
              </div>
            </div>
            <Button
              variant={joined ? 'secondary' : 'default'}
              size="sm"
              iconName={joined ? 'UserCheck' : 'UserPlus'}
              iconPosition="left"
              iconSize={14}
              onClick={() => setJoined(!joined)}>
              
              {joined ? 'Joined' : 'Join'}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border)] flex-shrink-0 px-4">
          {TABS?.map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
            activeTab === tab ?
            'border-[var(--color-primary)] text-[var(--color-foreground)]' :
            'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]'}`
            }>
            
              {tab}
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'About' &&
          <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-[var(--color-foreground)] mb-2 text-sm">About this Group</h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{group?.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
              { label: 'Members', value: group?.memberCount?.toLocaleString(), icon: 'Users' },
              { label: 'Posts/Month', value: group?.postCount, icon: 'MessageCircle' },
              { label: 'Events', value: group?.eventCount, icon: 'Calendar' }]?.
              map((stat) =>
              <div key={stat?.label} className="bg-[var(--color-muted)] rounded-xl p-3 text-center">
                    <Icon name={stat?.icon} size={18} color="var(--color-primary)" className="mx-auto mb-1" />
                    <p className="font-bold text-[var(--color-foreground)] text-lg">{stat?.value}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{stat?.label}</p>
                  </div>
              )}
              </div>
              <div>
                <h4 className="font-semibold text-[var(--color-foreground)] mb-3 text-sm">Leadership</h4>
                <div className="space-y-2">
                  {MOCK_MEMBERS?.filter((m) => m?.groupRole !== 'Member')?.map((leader) =>
                <div key={leader?.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)]">
                      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={leader?.avatar} alt={leader?.avatarAlt} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-foreground)]">{leader?.name}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] truncate">{leader?.role}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                        {leader?.groupRole}
                      </span>
                    </div>
                )}
                </div>
              </div>
            </div>
          }

          {activeTab === 'Members' &&
          <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[var(--color-text-secondary)]">{group?.memberCount?.toLocaleString()} members</p>
                <Button variant="outline" size="sm" iconName="Search" iconPosition="left" iconSize={14}>Search</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_MEMBERS?.map((member) =>
              <div key={member?.id} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-all">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={member?.avatar} alt={member?.avatarAlt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-foreground)] truncate">{member?.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate">{member?.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {member?.groupRole !== 'Member' &&
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                          {member?.groupRole}
                        </span>
                  }
                      <span className="text-xs text-[var(--color-text-secondary)]">{member?.batch}</span>
                    </div>
                  </div>
              )}
              </div>
            </div>
          }

          {activeTab === 'Discussions' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--color-text-secondary)]">Recent discussions</p>
                <Button variant="default" size="sm" iconName="Plus" iconPosition="left" iconSize={14}>New Post</Button>
              </div>
              {MOCK_DISCUSSIONS?.map((post) =>
            <div key={post?.id} className="p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all cursor-pointer">
                  {post?.pinned &&
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] mb-2">
                      <Icon name="Pin" size={11} color="currentColor" /> Pinned
                    </span>
              }
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={post?.avatar} alt={post?.avatarAlt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-foreground)] mb-0.5">{post?.title}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-2">{post?.body}</p>
                      <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                        <span>{post?.author} · {post?.time}</span>
                        <span className="flex items-center gap-1"><Icon name="MessageCircle" size={11} color="currentColor" />{post?.replies}</span>
                        <span className="flex items-center gap-1"><Icon name="Heart" size={11} color="currentColor" />{post?.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
            )}
            </div>
          }

          {activeTab === 'Events' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--color-text-secondary)]">Upcoming group events</p>
                <Button variant="default" size="sm" iconName="Plus" iconPosition="left" iconSize={14}>Create Event</Button>
              </div>
              {MOCK_EVENTS?.map((event) =>
            <div key={event?.id} className="p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'var(--color-primary)' }}>
                        <span className="text-xs font-bold text-[var(--color-primary-foreground)] leading-none">{event?.date?.split(' ')?.[0]}</span>
                        <span className="text-lg font-bold text-[var(--color-primary-foreground)] leading-none">{event?.date?.split(' ')?.[1]?.replace(',', '')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-foreground)]">{event?.title}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 flex items-center gap-1">
                          <Icon name="Clock" size={11} color="currentColor" />{event?.time}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
                          <Icon name="MapPin" size={11} color="currentColor" />{event?.venue}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 mt-1">
                          <Icon name="Users" size={11} color="currentColor" />{event?.attendees} attending
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">RSVP</Button>
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </div>);

}