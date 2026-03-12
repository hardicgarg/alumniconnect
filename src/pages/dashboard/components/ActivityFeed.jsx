import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';


const FEED = [
{
  id: 1,
  type: 'job',
  user: 'Priya Sharma',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19205d2aa-1763296356182.png",
  avatarAlt: 'Professional Indian woman with dark hair smiling in office setting',
  batch: '2016',
  action: 'posted a new job opportunity',
  content: 'Senior Product Manager at Stripe — Remote · $160K–$200K',
  time: '12 min ago',
  icon: 'Briefcase',
  iconColor: '#E8C547',
  path: '/jobs-portal'
},
{
  id: 2,
  type: 'event',
  user: 'James Whitfield',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15753ec4f-1763295707622.png",
  avatarAlt: 'Caucasian man with glasses and brown hair in casual business attire',
  batch: '2012',
  action: 'is hosting an event',
  content: 'Annual Alumni Gala 2026 — March 20 · Grand Hyatt, NYC',
  time: '1 hr ago',
  icon: 'Calendar',
  iconColor: '#D4AF37',
  path: '/events-hub'
},
{
  id: 3,
  type: 'connection',
  user: 'Aisha Okonkwo',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eac4bd5f-1772658508857.png",
  avatarAlt: 'African woman with natural hair wearing professional blazer in bright office',
  batch: '2019',
  action: 'joined the Tech Alumni Network group',
  content: 'Now part of 1,240 members in the Tech Alumni Network',
  time: '2 hrs ago',
  icon: 'Users',
  iconColor: '#22C55E',
  path: '/member-directory'
},
{
  id: 4,
  type: 'business',
  user: 'Carlos Mendez',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1273e1aa3-1763301484122.png",
  avatarAlt: 'Hispanic man with short dark hair in navy blazer against white background',
  batch: '2014',
  action: 'listed a new business',
  content: 'Mendez Digital Agency — Marketing & Branding · Austin, TX',
  time: '4 hrs ago',
  icon: 'Store',
  iconColor: '#F59E0B',
  path: '/business-directory'
},
{
  id: 5,
  type: 'job',
  user: 'Rachel Kim',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1230b9d-1763294070661.png",
  avatarAlt: 'Asian woman with shoulder-length hair in professional setting with warm lighting',
  batch: '2017',
  action: 'posted a new job opportunity',
  content: 'UX Design Lead at Figma — San Francisco · $140K–$175K',
  time: '6 hrs ago',
  icon: 'Briefcase',
  iconColor: '#E8C547',
  path: '/jobs-portal'
},
{
  id: 6,
  type: 'announcement',
  user: 'Alumni Connect',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_139a170a9-1765430406255.png",
  avatarAlt: 'University campus building with green lawn and blue sky in background',
  batch: '',
  action: 'shared a community update',
  content: 'Congratulations to our Class of 2015 on their 10-year reunion! 🎉 Over 200 alumni attended.',
  time: '1 day ago',
  icon: 'Megaphone',
  iconColor: '#E8C547',
  path: '/community-feed'
}];


export default function ActivityFeed() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">Community Activity</h2>
        <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">Live</span>
      </div>
      <div className="space-y-4">
        {FEED?.map((item) =>
        <div
          key={item?.id}
          className="flex gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200 cursor-pointer group"
          onClick={() => navigate(item?.path)}>
          
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src={item?.avatar} alt={item?.avatarAlt} className="w-full h-full object-cover" />
              </div>
              <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-card"
              style={{ background: item?.iconColor }}>
              
                <Icon name={item?.icon} size={10} color="#1C1C1C" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{item?.user}</span>
                {item?.batch && <span className="text-text-secondary text-xs ml-1">'{item?.batch?.slice(2)}</span>}
                <span className="text-text-secondary"> {item?.action}</span>
              </p>
              <p className="text-sm text-text-secondary mt-0.5 line-clamp-2">{item?.content}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-text-secondary">{item?.time}</span>
                <button
                className="flex items-center gap-1 text-xs text-text-secondary hover:text-yellow-500 transition-colors"
                onClick={(e) => {e?.stopPropagation();setLiked((p) => ({ ...p, [item?.id]: !p?.[item?.id] }));}}>
                
                  <Icon name={liked?.[item?.id] ? 'Heart' : 'Heart'} size={12} color={liked?.[item?.id] ? '#E8C547' : 'currentColor'} />
                  {liked?.[item?.id] ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="w-full mt-4 text-center text-sm font-medium py-2 rounded-xl hover:bg-muted transition-colors" style={{ color: 'var(--color-accent)' }}>
        Load more activity
      </button>
    </div>);

}