import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const FEED_POSTS = [
{
  id: 1,
  type: 'career',
  name: 'Sarah Johnson',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_118b236b8-1772642991917.png",
  avatarAlt: 'Professional woman with blonde hair in business casual attire smiling at camera',
  batch: '2015',
  role: 'Senior Product Manager',
  company: 'Google',
  time: '12 min ago',
  content: "Thrilled to share that I\'ve just been promoted to Senior Product Manager at Google! 🎉 Grateful for the alumni network that helped me land this role.",
  likes: 87,
  comments: 2,
  typeIcon: 'TrendingUp',
  typeColor: '#22C55E',
  typeBg: '#22C55E20',
  typeLabel: 'Career Update'
},
{
  id: 2,
  type: 'hiring',
  name: 'Michael Chen',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b12cece8-1763296037808.png",
  avatarAlt: 'Asian man with short black hair wearing casual tech company t-shirt in modern office',
  batch: '2018',
  role: 'Engineering Manager',
  company: 'Meta',
  time: '45 min ago',
  content: "We're hiring at Meta! Looking for talented alumni to join our infrastructure team. Alumni referrals get priority review — DM me if interested! 🚀",
  likes: 54,
  comments: 0,
  typeIcon: 'Briefcase',
  typeColor: '#E8C547',
  typeBg: '#E8C54720',
  typeLabel: 'Hiring'
},
{
  id: 3,
  type: 'event',
  name: 'James Whitfield',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15753ec4f-1763295707622.png",
  avatarAlt: 'Caucasian man with glasses and brown hair in casual business attire',
  batch: '2012',
  role: 'Alumni Chapter President',
  company: 'NYC Chapter',
  time: '2 hrs ago',
  content: "The Annual Alumni Gala 2026 is just around the corner! 🥂 Spots are filling up fast. Register now!",
  likes: 112,
  comments: 8,
  typeIcon: 'Calendar',
  typeColor: '#D4AF37',
  typeBg: '#D4AF3720',
  typeLabel: 'Event'
},
{
  id: 4,
  type: 'startup',
  name: 'Priya Sharma',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19205d2aa-1763296356182.png",
  avatarAlt: 'Professional Indian woman with dark hair smiling in office setting',
  batch: '2016',
  role: 'Founder & CEO',
  company: 'NovaTech',
  time: '5 hrs ago',
  content: "Excited to announce NovaTech just closed our Series A! 🚀 Thank you to every alumni mentor who believed in us from day one.",
  likes: 203,
  comments: 31,
  typeIcon: 'Rocket',
  typeColor: '#F59E0B',
  typeBg: '#F59E0B20',
  typeLabel: 'Startup Launch'
}];


export default function FeedWidget() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});

  const toggleLike = (e, id) => {
    e?.stopPropagation();
    setLiked((prev) => ({ ...prev, [id]: !prev?.[id] }));
  };

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-base md:text-lg text-foreground">Feed</h2>
          <span className="text-xs text-text-secondary bg-muted px-2 py-0.5 rounded-full">Community</span>
        </div>
        <button
          onClick={() => navigate('/community-feed')}
          className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-accent)' }}>
          View all
          <Icon name="ArrowRight" size={13} color="var(--color-accent)" />
        </button>
      </div>

      {/* Post Composer Teaser */}
      <div
        className="flex items-center gap-3 p-3 rounded-xl border border-border mb-5 cursor-pointer hover:border-yellow-300 transition-colors"
        onClick={() => navigate('/community-feed')}>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="var(--color-text-secondary)" />
        </div>
        <span className="text-sm text-text-secondary">Share something with the community…</span>
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {FEED_POSTS?.map((post) =>
        <div
          key={post?.id}
          className="cursor-pointer group"
          onClick={() => navigate('/community-feed')}>
            {/* Author Row */}
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image src={post?.avatar} alt={post?.avatarAlt} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{post?.name}</span>
                  {post?.batch &&
                <span className="text-xs text-text-secondary">'{post?.batch?.slice(2)}</span>
                }
                  <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: post?.typeBg, color: post?.typeColor }}>
                    <Icon name={post?.typeIcon} size={10} color={post?.typeColor} />
                    {post?.typeLabel}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{post?.role} · {post?.company} · {post?.time}</p>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-foreground mt-2 ml-13 line-clamp-2 pl-[52px]">{post?.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-2 pl-[52px]">
              <button
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: liked?.[post?.id] ? '#E8C547' : 'var(--color-text-secondary)' }}
              onClick={(e) => toggleLike(e, post?.id)}>
                <Icon name="Heart" size={13} color={liked?.[post?.id] ? '#E8C547' : 'var(--color-text-secondary)'} />
                <span>{(post?.likes || 0) + (liked?.[post?.id] ? 1 : 0)}</span>
              </button>
              <button
              className="flex items-center gap-1 text-xs text-text-secondary hover:text-foreground transition-colors"
              onClick={(e) => {e?.stopPropagation();navigate('/community-feed');}}>
                <Icon name="MessageCircle" size={13} color="var(--color-text-secondary)" />
                <span>{post?.comments}</span>
              </button>
              <button
              className="flex items-center gap-1 text-xs text-text-secondary hover:text-foreground transition-colors"
              onClick={(e) => {e?.stopPropagation();}}>
                <Icon name="Share2" size={13} color="var(--color-text-secondary)" />
                Share
              </button>
            </div>

            {/* Divider */}
            <div className="border-b border-border mt-4" />
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        className="w-full mt-4 text-center text-sm font-medium py-2 rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-1"
        style={{ color: 'var(--color-accent)' }}
        onClick={() => navigate('/community-feed')}>
        <Icon name="ExternalLink" size={14} color="var(--color-accent)" />
        Go to Community Feed
      </button>
    </div>);

}