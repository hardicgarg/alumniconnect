import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const TYPE_CONFIG = {
  career: { icon: 'TrendingUp', color: '#22C55E', bg: '#22C55E20', label: 'Career Update' },
  hiring: { icon: 'Briefcase', color: '#E8C547', bg: '#E8C54720', label: 'Hiring' },
  event: { icon: 'Calendar', color: '#D4AF37', bg: '#D4AF3720', label: 'Event' },
  reunion: { icon: 'Users', color: '#8B5CF6', bg: '#8B5CF620', label: 'Reunion' },
  startup: { icon: 'Rocket', color: '#F59E0B', bg: '#F59E0B20', label: 'Startup Launch' },
  institute: { icon: 'GraduationCap', color: '#3B82F6', bg: '#3B82F620', label: 'Institute Update' }
};

function PostTypeTag({ type }) {
  const cfg = TYPE_CONFIG?.[type] || TYPE_CONFIG?.career;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: cfg?.bg, color: cfg?.color }}>
      
      <Icon name={cfg?.icon} size={11} color={cfg?.color} />
      {cfg?.label}
    </span>);

}

function JobPreviewCard({ job }) {
  const navigate = useNavigate();
  return (
    <div
      className="mt-3 border border-border rounded-xl p-3 hover:border-yellow-300 cursor-pointer transition-all duration-200"
      onClick={() => navigate('/jobs-portal')}>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-muted)' }}>
          <Icon name="Briefcase" size={16} color="var(--color-primary)" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{job?.title}</p>
          <p className="text-xs text-text-secondary">{job?.company} · {job?.location} · {job?.salary}</p>
        </div>
      </div>
      <button
        className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-90"
        style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
        onClick={(e) => {e?.stopPropagation();navigate('/jobs-portal');}}>
        
        View Job
      </button>
    </div>);

}

function EventPreviewCard({ event }) {
  const navigate = useNavigate();
  return (
    <div
      className="mt-3 border border-border rounded-xl p-3 hover:border-yellow-300 cursor-pointer transition-all duration-200"
      onClick={() => navigate('/events-hub')}>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'var(--color-primary)' }}>
          <span className="text-xs font-bold" style={{ color: 'var(--color-primary-foreground)' }}>{event?.month}</span>
          <span className="text-lg font-black leading-none" style={{ color: 'var(--color-primary-foreground)' }}>{event?.day}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{event?.title}</p>
          <p className="text-xs text-text-secondary">{event?.venue}</p>
          <p className="text-xs text-text-secondary">{event?.attendees} alumni attending</p>
        </div>
      </div>
      <button
        className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold border border-border hover:bg-muted transition-all duration-200"
        onClick={(e) => {e?.stopPropagation();navigate('/events-hub');}}>
        
        RSVP Now
      </button>
    </div>);

}

export default function FeedPost({ post }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post?.comments || []);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  const handleComment = () => {
    if (!commentText?.trim()) return;
    setComments((prev) => [...prev, { id: Date.now(), user: 'Alex Rivera', text: commentText, time: 'just now' }]);
    setCommentText('');
  };

  return (
    <div className="bg-card rounded-2xl p-3 sm:p-4 md:p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div
          className="flex items-start gap-2 sm:gap-3 cursor-pointer group flex-1 min-w-0"
          onClick={() => navigate('/member-profile-page')}>
          
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent group-hover:ring-yellow-300 transition-all duration-200">
            <Image src={post?.avatar} alt={post?.avatarAlt} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-semibold text-sm text-foreground group-hover:underline">{post?.name}</span>
              <PostTypeTag type={post?.type} />
            </div>
            <p className="text-xs text-text-secondary truncate">{post?.role} · {post?.company}</p>
            <p className="text-xs text-text-secondary">{post?.batch ? `Class of ${post?.batch} · ` : ''}{post?.time}</p>
          </div>
        </div>
        <button className="text-text-secondary hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted flex-shrink-0">
          <Icon name="MoreHorizontal" size={18} color="currentColor" />
        </button>
      </div>
      {/* Content */}
      <div className="mt-3">
        <p className="text-sm text-foreground leading-relaxed">{post?.content}</p>
      </div>
      {/* Embedded card */}
      {post?.jobCard && <JobPreviewCard job={post?.jobCard} />}
      {post?.eventCard && <EventPreviewCard event={post?.eventCard} />}
      {/* Image */}
      {post?.image &&
      <div className="mt-3 rounded-xl overflow-hidden">
          <Image src={post?.image} alt={post?.imageAlt || 'Post image'} className="w-full object-cover max-h-56 sm:max-h-72" />
        </div>
      }
      {/* Stats */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-text-secondary">
        <span>{likeCount > 0 ? `${likeCount} likes` : ''}</span>
        <button onClick={() => setShowComments((v) => !v)} className="hover:underline">
          {comments?.length > 0 ? `${comments?.length} comment${comments?.length > 1 ? 's' : ''}` : ''}
        </button>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-0.5 sm:gap-1 mt-2 pt-2 border-t border-border">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-muted ${liked ? '' : 'text-text-secondary'}`}
          style={liked ? { color: 'var(--color-primary)' } : {}}>
          
          <Icon name="ThumbsUp" size={15} color={liked ? 'var(--color-primary)' : 'currentColor'} />
          <span className="hidden xs:inline sm:inline">Like</span>
        </button>
        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-xl text-xs sm:text-sm font-medium text-text-secondary hover:bg-muted transition-all duration-200">
          
          <Icon name="MessageCircle" size={15} color="currentColor" />
          <span className="hidden xs:inline sm:inline">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-xl text-xs sm:text-sm font-medium text-text-secondary hover:bg-muted transition-all duration-200">
          <Icon name="Share2" size={15} color="currentColor" />
          <span className="hidden xs:inline sm:inline">Share</span>
        </button>
      </div>
      {/* Comments */}
      {showComments &&
      <div className="mt-3 space-y-3">
          {comments?.map((c) =>
        <div key={c?.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full flex-shrink-0 overflow-hidden" style={{ background: 'var(--color-muted)' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={14} color="var(--color-text-secondary)" />
                </div>
              </div>
              <div className="flex-1 min-w-0 bg-muted rounded-xl px-3 py-2">
                <p className="text-xs font-semibold text-foreground">{c?.user}</p>
                <p className="text-xs text-text-secondary">{c?.text}</p>
              </div>
            </div>
        )}
          <div className="flex gap-2 mt-2">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <Image src="https://img.rocket.new/generatedImages/rocket_gen_img_16f8320e4-1768506249957.png" alt="Your avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 flex gap-2">
              <input
              value={commentText}
              onChange={(e) => setCommentText(e?.target?.value)}
              onKeyDown={(e) => e?.key === 'Enter' && handleComment()}
              placeholder="Write a comment..."
              className="flex-1 min-w-0 rounded-xl px-3 py-1.5 text-xs border border-border focus:outline-none focus:border-yellow-400 transition-all"
              style={{ background: 'var(--color-muted)' }} />
            
              <button
              onClick={handleComment}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex-shrink-0"
              style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              
                Post
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}