import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const MESSAGES = [
{
  id: 1,
  sender: 'Sarah Johnson',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png",
  avatarAlt: 'Professional woman with blonde hair in business casual attire smiling at camera',
  preview: 'Hey! Are you attending the gala this year?',
  time: '2m ago',
  unread: true
},
{
  id: 2,
  sender: 'Michael Chen',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b12cece8-1763296037808.png",
  avatarAlt: 'Asian man with short black hair wearing casual tech company t-shirt in modern office',
  preview: 'Thanks for connecting! Would love to catch up.',
  time: '1h ago',
  unread: true
},
{
  id: 3,
  sender: 'Fatima Al-Hassan',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1001de7f9-1763295922892.png",
  avatarAlt: 'Middle Eastern woman in professional business suit with confident expression in office',
  preview: 'The job posting looks great. I\'ll share it with my network.',
  time: '3h ago',
  unread: false
}];


export default function RecentMessages() {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">Messages</h2>
        <button
          onClick={() => navigate('/messaging-interface')}
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}>
          
          Open inbox <Icon name="ArrowRight" size={12} color="currentColor" />
        </button>
      </div>
      <div className="space-y-2">
        {MESSAGES?.map((msg) =>
        <div
          key={msg?.id}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors duration-200 ${msg?.unread ? 'bg-yellow-50' : 'hover:bg-muted'}`}
          onClick={() => navigate('/messaging-interface')}>
          
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src={msg?.avatar} alt={msg?.avatarAlt} className="w-full h-full object-cover" />
              </div>
              {msg?.unread &&
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-card" />
            }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm line-clamp-1 ${msg?.unread ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                  {msg?.sender}
                </p>
                <span className="text-xs text-text-secondary whitespace-nowrap ml-2">{msg?.time}</span>
              </div>
              <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">{msg?.preview}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm" fullWidth iconName="MessageSquare" iconPosition="left" onClick={() => navigate('/messaging-interface')}>
          New Message
        </Button>
      </div>
    </div>);

}