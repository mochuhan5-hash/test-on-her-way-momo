import React from 'react';
import { PublicProfile } from '../../types';

interface OnboardingProfilePopupProps {
  profile: PublicProfile;
  onContinue: () => void;
}

export const OnboardingProfilePopup: React.FC<OnboardingProfilePopupProps> = ({ profile, onContinue }) => {
  // Tag icons mapping
  const tagIcons: Record<string, React.ReactNode> = {
    role_detail: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    location: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    experience: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    hassle: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
    goal: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
  };

  const tagLabels: Record<string, string> = {
    role_detail: '身份',
    location: '位置',
    experience: '经历',
    hassle: '困扰',
    goal: '目标',
  };

  const tagColors: Record<string, string> = {
    role_detail: 'text-brand-blue',
    location: 'text-green-400',
    experience: 'text-brand-yellow',
    hassle: 'text-brand-orange',
    goal: 'text-nebula-pink',
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-space-900 border border-white/10 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white">你的探索者画像</h2>
          <p className="text-white/50 text-sm mt-1">基于对话生成的个人档案</p>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Left: Profile Card */}
          <div className="flex-1 space-y-4">
            {/* Avatar and Name */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-brand-yellow/30 overflow-hidden shadow-[0_0_20px_rgba(253,209,64,0.2)]">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                <p className="text-white/50 text-sm">探索者</p>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              {Object.entries(profile.tags).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                  <div className={`mt-0.5 ${tagColors[key] || 'text-white/50'}`}>
                    {tagIcons[key]}
                  </div>
                  <div className="flex-1">
                    <span className="text-white/40 text-xs uppercase tracking-wider">{tagLabels[key]}</span>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-white/10"></div>

          {/* Right: Timeline */}
          <div className="flex-1">
            <h4 className="text-white/70 text-sm font-bold uppercase tracking-wider mb-4">人生轨迹</h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-yellow via-brand-blue to-nebula-pink"></div>

              {/* Timeline entries */}
              <div className="space-y-4">
                {profile.lifeTimeline.map((entry, index) => (
                  <div key={entry.id} className="relative pl-8">
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 ${
                      index === 0 ? 'border-brand-yellow bg-brand-yellow/20' :
                      index === profile.lifeTimeline.length - 1 ? 'border-nebula-pink bg-nebula-pink/20' :
                      'border-brand-blue bg-brand-blue/20'
                    }`}></div>

                    {/* Content */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/40 text-xs">{entry.year}</span>
                        <h5 className="text-white font-medium text-sm">{entry.title}</h5>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-center">
          <button
            onClick={onContinue}
            className="group relative px-12 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow to-brand-orange"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-3 text-space-950 text-sm font-bold tracking-widest uppercase">
              创建MY WAY
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
