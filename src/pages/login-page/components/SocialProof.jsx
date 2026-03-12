import React from 'react';
import Image from 'components/AppImage';

const ALUMNI_AVATARS = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_115d61d2c-1765988781101.png",
  alt: 'Professional woman with curly brown hair smiling in office setting wearing blazer'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2a583b9-1763294070359.png",
  alt: 'Professional man with short dark hair in navy suit against neutral background'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1435898fb-1763296163763.png",
  alt: 'Young professional woman with straight black hair in white blouse at desk'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d48f38c8-1773144357397.png",
  alt: 'Middle-aged professional man with glasses and grey shirt in corporate setting'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_11d684987-1772697167208.png",
  alt: 'Professional woman with blonde hair in formal attire against light background'
}];


export default function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center">
        {ALUMNI_AVATARS?.map((avatar, idx) =>
        <div
          key={idx}
          className="w-8 h-8 rounded-full overflow-hidden border-2 border-card flex-shrink-0"
          style={{ marginLeft: idx === 0 ? 0 : '-8px', zIndex: ALUMNI_AVATARS?.length - idx }}>
          
            <Image
            src={avatar?.src}
            alt={avatar?.alt}
            className="w-full h-full object-cover" />
          
          </div>
        )}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-card flex-shrink-0 text-xs font-body font-500"
          style={{
            marginLeft: '-8px',
            background: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            zIndex: 0
          }}>
          
          +2k
        </div>
      </div>
      <p className="text-xs font-caption text-center" style={{ color: 'var(--color-text-secondary)' }}>
        Join <span className="font-500" style={{ color: 'var(--color-foreground)' }}>12,400+</span> alumni already connected
      </p>
    </div>);

}