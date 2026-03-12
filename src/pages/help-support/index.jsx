import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';

const FAQ_ITEMS = [
  {
    question: 'How do I update my profile information?',
    answer: 'Navigate to My Profile from the top-right dropdown menu. Click on the "Profile Info" tab to edit your personal details, work experience, education, and skills. Changes are saved automatically.',
  },
  {
    question: 'How can I connect with other alumni?',
    answer: 'Visit the Member Directory to search for alumni by name, batch year, industry, or location. Click "Connect" on any profile to send a connection request. You can also discover alumni through the Community Feed.',
  },
  {
    question: 'How do I post a job opportunity for fellow alumni?',
    answer: 'Go to the Jobs Portal and click the "Post a Job" button in the top-right corner. Fill in the job details including title, company, location, and description. Your posting will be visible to all alumni immediately.',
  },
  {
    question: 'Can I create or manage alumni events?',
    answer: 'Yes! Visit the Events Hub and click "Create Event". You can set up reunions, networking sessions, webinars, or any alumni gathering. Attendees can RSVP directly through the platform.',
  },
  {
    question: 'How do I join a chapter or interest group?',
    answer: 'Head to the Groups & Chapters section from the navigation menu. Browse available groups by region, industry, or interest. Click "Join Group" to become a member and start participating in discussions.',
  },
  {
    question: 'How do I list my business in the Business Directory?',
    answer: 'Open the Business Directory and click "Add Your Business". Provide your business name, category, description, and contact details. Your listing helps fellow alumni discover and support your venture.',
  },
  {
    question: 'How do I control who can see my profile?',
    answer: 'Go to My Profile and select the "Privacy Controls" tab. You can customize visibility settings for your contact info, work history, and activity. You can also manage who can send you connection requests.',
  },
  {
    question: 'I forgot my password. How do I reset it?',
    answer: 'On the login page, click "Forgot Password?" and enter your registered email address. You will receive a password reset link within a few minutes. Check your spam folder if you don\'t see it in your inbox.',
  },
];

const QUICK_LINKS = [
  { title: 'Getting Started Guide', description: 'New to the platform? Learn the basics in 5 minutes.', icon: 'BookOpen', color: 'text-blue-600 bg-blue-50' },
  { title: 'Profile Setup Tips', description: 'Make your profile stand out to recruiters and peers.', icon: 'UserCheck', color: 'text-green-600 bg-green-50' },
  { title: 'Networking Best Practices', description: 'How to build meaningful alumni connections.', icon: 'Users', color: 'text-purple-600 bg-purple-50' },
  { title: 'Privacy & Security', description: 'Keep your account and data safe.', icon: 'Shield', color: 'text-orange-600 bg-orange-50' },
  { title: 'Event Hosting Guide', description: 'Step-by-step guide to organizing alumni events.', icon: 'Calendar', color: 'text-pink-600 bg-pink-50' },
  { title: 'Jobs Portal Guide', description: 'Post jobs and find opportunities effectively.', icon: 'Briefcase', color: 'text-indigo-600 bg-indigo-50' },
];

const COMMUNITY_CHANNELS = [
  { name: 'Alumni Forum', description: 'Ask questions and share experiences with the broader alumni community.', members: '4,200+', icon: 'MessageSquare' },
  { name: 'Batch WhatsApp Groups', description: 'Connect with your batch mates on WhatsApp for quick conversations.', members: 'By batch year', icon: 'MessageCircle' },
  { name: 'LinkedIn Alumni Group', description: 'Join our official LinkedIn group for professional networking and updates.', members: '12,500+', icon: 'Linkedin' },
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-600 text-foreground">Help & Support</h1>
          <p className="text-sm text-text-secondary mt-1">Find answers, get in touch, or connect with the alumni community.</p>
        </div>

        {/* Quick Links */}
        <section className="mb-10">
          <h2 className="text-lg font-heading font-600 text-foreground mb-4">Quick Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_LINKS?.map((link) => (
              <div
                key={link?.title}
                className="bg-card border border-border rounded-lg p-4 flex items-start gap-3 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${link?.color}`}>
                  <Icon name={link?.icon} size={20} color="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-body font-500 text-foreground">{link?.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{link?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-lg font-heading font-600 text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="bg-card border border-border rounded-lg divide-y divide-border overflow-hidden">
            {FAQ_ITEMS?.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted transition-colors duration-200"
                >
                  <span className="text-sm font-body font-500 text-foreground pr-4">{item?.question}</span>
                  <Icon
                    name={openFaq === index ? 'ChevronUp' : 'ChevronDown'}
                    size={16}
                    color="var(--color-text-secondary)"
                    className="flex-shrink-0"
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{item?.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Two-column: Contact Form + Community Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Support Form */}
          <section>
            <h2 className="text-lg font-heading font-600 text-foreground mb-4">Contact Support</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={28} color="#16a34a" />
                  </div>
                  <h3 className="text-base font-body font-500 text-foreground mb-1">Message Sent!</h3>
                  <p className="text-sm text-text-secondary mb-4">Our support team will get back to you within 24–48 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-body text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-body font-500 text-text-secondary mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData?.name}
                      onChange={handleChange}
                      required
                      placeholder="Alex Rivera"
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-500 text-text-secondary mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-500 text-text-secondary mb-1">Subject</label>
                    <select
                      name="subject"
                      value={formData?.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      <option value="account">Account & Login Issues</option>
                      <option value="profile">Profile & Privacy</option>
                      <option value="events">Events & RSVPs</option>
                      <option value="jobs">Jobs & Opportunities</option>
                      <option value="groups">Groups & Chapters</option>
                      <option value="technical">Technical Problem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-body font-500 text-text-secondary mb-1">Message</label>
                    <textarea
                      name="message"
                      value={formData?.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe your issue or question in detail..."
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-primary text-white text-sm font-body font-500 rounded-md hover:opacity-90 transition-opacity duration-200"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Community Support */}
          <section>
            <h2 className="text-lg font-heading font-600 text-foreground mb-4">Community Support</h2>
            <div className="space-y-4">
              {COMMUNITY_CHANNELS?.map((channel) => (
                <div key={channel?.name} className="bg-card border border-border rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={channel?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-500 text-foreground">{channel?.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{channel?.description}</p>
                    <p className="text-xs text-primary mt-1 font-500">{channel?.members} members</p>
                  </div>
                  <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" className="flex-shrink-0 mt-1" />
                </div>
              ))}

              {/* Support hours */}
              <div className="bg-muted border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
                  <p className="text-sm font-body font-500 text-foreground">Support Hours</p>
                </div>
                <p className="text-xs text-text-secondary">Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                <p className="text-xs text-text-secondary mt-0.5">Weekend: Limited support via community channels</p>
                <p className="text-xs text-text-secondary mt-2">Average response time: <span className="text-foreground font-500">under 24 hours</span></p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
