import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';

import Button from 'components/ui/Button';

export default function WelcomeBanner({ user }) {
  const navigate = useNavigate();
  const completionPct = user?.profileCompletion;

  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (completionPct / 100) * circumference;

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 60%, #3a3000 100%)',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="150" cy="50" r="80" fill="#E8C547" />
        </svg>
      </div>
      <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
        {/* Avatar + info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-yellow-400">
              <Image src={user?.avatar} alt={user?.avatarAlt} className="w-full h-full object-cover" />
            </div>
            {/* Donut ring */}
            <svg className="absolute -inset-1.5 w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] md:w-[92px] md:h-[92px] -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <circle
                cx="24" cy="24" r="20" fill="none"
                stroke="#E8C547" strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-yellow-400 text-xs font-medium mb-0.5 sm:mb-1">Welcome back 👋</p>
            <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight truncate">{user?.name}</h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">{user?.role} · {user?.company}</p>
            <p className="text-gray-500 text-xs mt-0.5 truncate">Class of {user?.batch} · {user?.city}</p>
          </div>
        </div>

        {/* Profile completion */}
        <div className="lg:ml-auto flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:items-end">
          <div className="bg-white/10 rounded-xl p-3 sm:p-4 w-full sm:min-w-[180px] sm:w-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-xs sm:text-sm font-medium">Profile Completion</span>
              <span className="text-yellow-400 font-bold text-xs sm:text-sm">{completionPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${completionPct}%`, background: '#E8C547' }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-2">Add your skills to complete</p>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="UserCheck"
            iconPosition="left"
            onClick={() => navigate('/my-profile-page')}
          >
            Complete Profile
          </Button>
        </div>
      </div>
    </div>
  );
}