import React, { useState } from 'react';
import Header from 'components/ui/Header';
import PostComposer from './components/PostComposer';
import FeedPost from './components/FeedPost';
import SuggestedAlumni from './components/SuggestedAlumni';
import RightSidebar from './components/RightSidebar';
import Icon from 'components/AppIcon';

const INITIAL_POSTS = [
{
  id: 1,
  type: 'career',
  name: 'Sarah Johnson',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1524d4e24-1765100299251.png",
  avatarAlt: 'Professional woman with blonde hair in business casual attire smiling at camera',
  batch: '2015',
  role: 'Senior Product Manager',
  company: 'Google',
  time: '12 min ago',
  content: "Thrilled to share that I've just been promoted to Senior Product Manager at Google! 🎉 It's been an incredible journey since graduating from our alma mater. Grateful for the alumni network that helped me land this role — especially the mentorship from David Park and Fatima Al-Hassan. If you're looking to break into product management, feel free to reach out!",
  likes: 87,
  comments: [
  { id: 1, user: 'Michael Chen', text: 'Huge congratulations Sarah! Well deserved! 🙌', time: '5 min ago' },
  { id: 2, user: 'Aisha Okonkwo', text: 'So proud of you! The PM community is lucky to have you.', time: '3 min ago' }]

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
  content: "We're hiring at Meta! Looking for talented alumni to join our infrastructure team. Great culture, competitive comp, and you'll be working on systems that scale to billions of users. Alumni referrals get priority review — DM me if interested! 🚀",
  jobCard: {
    title: 'Senior Software Engineer – Infrastructure',
    company: 'Meta',
    location: 'Menlo Park, CA (Hybrid)',
    salary: '$180K–$240K + RSUs'
  },
  likes: 54,
  comments: []
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
  content: "The Annual Alumni Gala 2026 is just around the corner! 🥂 We've got an incredible lineup — keynote by our very own Priya Sharma (Class of '16), live jazz, and a special tribute to the Class of 2001 on their 25th anniversary. Spots are filling up fast. Register now!",
  eventCard: {
    title: 'Annual Alumni Gala 2026',
    month: 'MAR',
    day: '20',
    venue: 'Grand Hyatt, New York City',
    attendees: 214
  },
  likes: 132,
  comments: [
  { id: 1, user: 'Rachel Kim', text: "Can\'t wait! Already registered 🎉", time: '1 hr ago' }]

},
{
  id: 4,
  type: 'startup',
  name: 'David Park',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1904d9a5f-1772472654268.png",
  avatarAlt: 'Korean American man with casual attire standing in startup office with whiteboards',
  batch: '2013',
  role: 'Founder & CEO',
  company: 'NovaTech AI',
  time: '4 hrs ago',
  content: "Big news! 🚀 NovaTech AI just closed our Series A — $12M led by Sequoia Capital! We're building the next generation of AI-powered supply chain tools, and we couldn't have done it without the incredible support from this alumni community. Special shoutout to everyone who made introductions and provided feedback during our early days. We're hiring across engineering, sales, and design — check the Jobs Portal for open roles!",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12fdef826-1773093288796.png",
  imageAlt: 'Startup team celebrating funding announcement in modern office with champagne and confetti',
  likes: 203,
  comments: [
  { id: 1, user: 'Sarah Johnson', text: 'Incredible milestone David! Rooting for you all the way! 🙌', time: '3 hrs ago' },
  { id: 2, user: 'Fatima Al-Hassan', text: 'This is just the beginning. Congrats to the whole NovaTech team!', time: '2 hrs ago' }]

},
{
  id: 5,
  type: 'reunion',
  name: 'Alumni Connect',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_139a170a9-1765430406255.png",
  avatarAlt: 'University campus building with green lawn and blue sky in background',
  batch: '',
  role: 'Official Account',
  company: 'AlumniConnect',
  time: '6 hrs ago',
  content: "What a weekend! 🎓 The Class of 2015 10-Year Reunion brought together over 200 alumni from across the globe. From San Francisco to Singapore, it was incredible to see how far our community has come. Thank you to everyone who made the trip — your stories, achievements, and laughter made this unforgettable. See you at the 15-year! 💛",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png",
  imageAlt: 'Large group of alumni gathered on university campus lawn for class reunion photo with banners',
  likes: 318,
  comments: [
  { id: 1, user: 'Carlos Mendez', text: 'Best weekend of the year! Already counting down to the next one.', time: '5 hrs ago' }]

},
{
  id: 6,
  type: 'institute',
  name: 'Alumni Connect',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_139a170a9-1765430406255.png",
  avatarAlt: 'University campus building with green lawn and blue sky in background',
  batch: '',
  role: 'Official Account',
  company: 'AlumniConnect',
  time: '1 day ago',
  content: "📣 Institute Update: We're proud to announce that our university has been ranked #3 in the nation for Computer Science programs by US News & World Report 2026! This achievement reflects the hard work of our faculty, students, and the continued support of our alumni community. Thank you for making us proud every day. 🏆",
  likes: 445,
  comments: []
},
{
  id: 7,
  type: 'hiring',
  name: 'Fatima Al-Hassan',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1001de7f9-1763295922892.png",
  avatarAlt: 'Middle Eastern woman in professional business suit with confident expression in office',
  batch: '2016',
  role: 'VP of Investments',
  company: 'Goldman Sachs',
  time: '1 day ago',
  content: "Goldman Sachs is looking for exceptional talent to join our Investment Banking division. We have a strong preference for candidates from our alumni network — the analytical rigor and collaborative spirit you bring is exactly what we value. Applications open now for Analyst and Associate roles. Feel free to reach out directly if you have questions about the process!",
  jobCard: {
    title: 'Investment Banking Analyst',
    company: 'Goldman Sachs',
    location: 'New York, NY',
    salary: '$110K–$140K + Bonus'
  },
  likes: 76,
  comments: []
}];


const FILTER_TABS = [
{ label: 'All Posts', value: 'all' },
{ label: 'Career', value: 'career' },
{ label: 'Hiring', value: 'hiring' },
{ label: 'Events', value: 'event' },
{ label: 'Startups', value: 'startup' },
{ label: 'Reunions', value: 'reunion' }];


export default function CommunityFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleNewPost = ({ text }) => {
    const newPost = {
      id: Date.now(),
      type: 'career',
      name: 'Alex Rivera',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b36fc5ef-1763299506190.png",
      avatarAlt: 'Professional male alumni with warm smile wearing formal dark blazer and white shirt in office setting',
      batch: '2015',
      role: 'Senior Software Engineer',
      company: 'Salesforce',
      time: 'just now',
      content: text,
      likes: 0,
      comments: []
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const filteredPosts = activeFilter === 'all' ?
  posts :
  posts?.filter((p) => p?.type === activeFilter);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-bold text-xl md:text-2xl text-foreground">Community Feed</h1>
          <p className="text-sm text-text-secondary mt-1">Stay connected with your alumni network</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <SuggestedAlumni />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Post Composer */}
            <PostComposer onPost={handleNewPost} />

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {FILTER_TABS?.map((tab) =>
              <button
                key={tab?.value}
                onClick={() => setActiveFilter(tab?.value)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeFilter === tab?.value ?
                'text-card' : 'text-text-secondary hover:text-foreground hover:bg-muted'}`
                }
                style={activeFilter === tab?.value ? { background: 'var(--color-foreground)' } : {}}>
                
                  {tab?.label}
                </button>
              )}
            </div>

            {/* Posts */}
            {filteredPosts?.length > 0 ?
            filteredPosts?.map((post) =>
            <FeedPost key={post?.id} post={post} />
            ) :

            <div className="bg-card rounded-2xl p-10 text-center" style={{ boxShadow: 'var(--shadow-md)' }}>
                <Icon name="Rss" size={32} color="var(--color-text-secondary)" />
                <p className="mt-3 text-sm text-text-secondary">No posts in this category yet.</p>
              </div>
            }

            {/* Load More */}
            <button
              className="w-full py-3 rounded-2xl text-sm font-medium text-text-secondary hover:text-foreground hover:bg-card transition-all duration-200 border border-border">
              
              Load more posts
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </div>
        </div>

        {/* Mobile: Suggested Alumni below feed */}
        <div className="lg:hidden mt-6">
          <SuggestedAlumni />
        </div>
      </main>
    </div>);

}