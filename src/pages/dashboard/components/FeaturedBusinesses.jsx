import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const BUSINESSES = [
{
  id: 1,
  name: 'Mendez Digital Agency',
  founder: 'Carlos Mendez',
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1273e1aa3-1763301484122.png",
  founderAvatarAlt: 'Hispanic man with short dark hair in navy blazer against white background',
  category: 'Marketing & Branding',
  city: 'Austin, TX',
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1172cc5df-1769273139967.png",
  logoAlt: 'Modern digital agency logo with abstract geometric design in blue and white',
  batch: '2014'
},
{
  id: 2,
  name: 'GreenLeaf Consulting',
  founder: 'Aisha Okonkwo',
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eac4bd5f-1772658508857.png",
  founderAvatarAlt: 'African woman with natural hair wearing professional blazer in bright office',
  category: 'Sustainability & ESG',
  city: 'Chicago, IL',
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea34c0de-1773231805912.png",
  logoAlt: 'Green leaf consulting firm logo with nature-inspired design on white background',
  batch: '2019'
},
{
  id: 3,
  name: 'Park Ventures',
  founder: 'David Park',
  founderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1904d9a5f-1772472654268.png",
  founderAvatarAlt: 'Korean American man with casual attire standing in startup office with whiteboards',
  category: 'Venture Capital',
  city: 'Austin, TX',
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1802775fb-1773231808916.png",
  logoAlt: 'Venture capital firm logo with abstract upward arrow design in gold and black',
  batch: '2013'
}];


export default function FeaturedBusinesses() {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">Alumni Businesses</h2>
        <button
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}
          onClick={() => navigate('/business-directory')}>
          
          View all <Icon name="ArrowRight" size={12} color="currentColor" />
        </button>
      </div>
      <div className="space-y-3">
        {BUSINESSES?.map((biz) =>
        <div
          key={biz?.id}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200 cursor-pointer"
          onClick={() => navigate('/business-directory')}>
          
            <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-border">
              <Image src={biz?.logo} alt={biz?.logoAlt} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground line-clamp-1">{biz?.name}</p>
              <p className="text-xs text-text-secondary">{biz?.category} · {biz?.city}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-4 h-4 rounded-full overflow-hidden">
                  <Image src={biz?.founderAvatar} alt={biz?.founderAvatarAlt} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-text-secondary">{biz?.founder} · '{biz?.batch?.slice(2)}</span>
              </div>
            </div>
            <Icon name="ExternalLink" size={14} color="var(--color-text-secondary)" />
          </div>
        )}
      </div>
    </div>);

}