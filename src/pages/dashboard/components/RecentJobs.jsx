import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const JOBS = [
{
  id: 1,
  title: 'Senior Product Manager',
  company: 'Stripe',
  location: 'Remote',
  salary: '$160K–$200K',
  type: 'Full-time',
  postedBy: 'Priya Sharma',
  postedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19205d2aa-1763296356182.png",
  postedByAvatarAlt: 'Professional Indian woman with dark hair smiling in office setting',
  batch: '2016',
  logo: 'https://logo.clearbit.com/stripe.com',
  logoAlt: 'Stripe company logo with purple gradient background',
  posted: '2 days ago'
},
{
  id: 2,
  title: 'UX Design Lead',
  company: 'Figma',
  location: 'San Francisco, CA',
  salary: '$140K–$175K',
  type: 'Full-time',
  postedBy: 'Rachel Kim',
  postedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1230b9d-1763294070661.png",
  postedByAvatarAlt: 'Asian woman with shoulder-length hair in professional setting with warm lighting',
  batch: '2017',
  logo: 'https://logo.clearbit.com/figma.com',
  logoAlt: 'Figma design tool company logo with colorful geometric shapes',
  posted: '3 days ago'
},
{
  id: 3,
  title: 'Data Scientist',
  company: 'Airbnb',
  location: 'Hybrid · NYC',
  salary: '$130K–$160K',
  type: 'Full-time',
  postedBy: 'Tom Bradley',
  postedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18bd60820-1763295903886.png",
  postedByAvatarAlt: 'Caucasian man with brown hair and beard in casual office environment',
  batch: '2015',
  logo: 'https://logo.clearbit.com/airbnb.com',
  logoAlt: 'Airbnb company logo with red Belo symbol on white background',
  posted: '5 days ago'
}];


export default function RecentJobs() {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base md:text-lg text-foreground">Recent Job Opportunities</h2>
        <button
          onClick={() => navigate('/jobs-portal')}
          className="text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-accent)' }}>
          
          View all <Icon name="ArrowRight" size={12} color="currentColor" />
        </button>
      </div>
      <div className="space-y-3">
        {JOBS?.map((job) =>
        <div
          key={job?.id}
          className="flex gap-3 p-3 rounded-xl border border-border hover:border-yellow-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
          onClick={() => navigate('/jobs-portal')}>
          
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-border flex-shrink-0 bg-white flex items-center justify-center">
              <Image src={job?.logo} alt={job?.logoAlt} className="w-9 h-9 object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground line-clamp-1">{job?.title}</p>
              <p className="text-xs text-text-secondary">{job?.company} · {job?.location}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-text-secondary">{job?.type}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{job?.salary}</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between flex-shrink-0">
              <span className="text-xs text-text-secondary whitespace-nowrap">{job?.posted}</span>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-5 h-5 rounded-full overflow-hidden">
                  <Image src={job?.postedByAvatar} alt={job?.postedByAvatarAlt} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-text-secondary hidden sm:block">Alumni</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm" fullWidth iconName="Briefcase" iconPosition="left" onClick={() => navigate('/jobs-portal')}>
          Post a Job
        </Button>
      </div>
    </div>);

}