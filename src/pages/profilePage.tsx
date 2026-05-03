import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { 
  LockFilled, 
  InfoCircleOutlined, 
  LinkedinFilled, 
  CheckCircleFilled, 
  ThunderboltFilled, 
  UserOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';

const ProfilePage: React.FC = () => {
  const { data: user, isLoading } = useUser();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  if (isLoading || !user) return <div className="p-20 text-center animate-pulse">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 lg:p-10 transition-colors">
      
      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
            <div className="size-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-primary mb-6">
              <ThunderboltFilled className="text-3xl" />
            </div>
            <h2 className="text-2xl font-black mb-2 dark:text-white">Unlock Premium Features</h2>
            <p className="text-text-secondary my-2">LinkedIn optimization and AI-driven career roadmaps are available exclusively for Pro members.</p>
            <div>
              <button className=" cursor-pointer w-full py-3 font-bold rounded-xl transition-all">Upgrade Now</button>
              <button onClick={() => setShowPremiumModal(false)} className="cursor-pointer w-full text-gray-400 font-semibold hover:text-gray-600 transition-all">Maybe Later</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-300 mx-auto space-y-8">
        
        {/* Profile Hero */}
        <section className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-nexus-purple" />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="size-28 rounded-full border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden bg-gray-50">
              <Avatar 
                className="w-full cursor-pointer bg-gray-100 border border-gray-200 shadow-sm"
                icon={<UserOutlined className="text-gray-400" />}
                size={106}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-3xl font-black dark:text-white">{user.name} {user.surname}</h1>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100">Open to Work</span>
              </div>
              <p className="text-text-secondary text-lg mb-4">Full Stack Developer • {user.age} Years Old</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 font-medium">
                <span className="flex items-center gap-1.5"><InfoCircleOutlined /> {user.email}</span>
                <span className="flex items-center gap-1.5 text-primary">@ {user.username}</span>
              </div>
            </div>
            
            {/* LinkedIn Surgeon Button (Protected) */}
            <button 
              onClick={() => setShowPremiumModal(true)}
              className="flex items-center gap-3 px-6 py-4 bg-[#0a66c2] text-white font-bold rounded-2xl hover:bg-[#004182] transition-all shadow-lg shadow-blue-500/20"
            >
              <LinkedinFilled className="text-xl" />
              Optimize via LinkedIn
              <LockFilled className="text-xs opacity-50" />
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* AI Review Section (Blurred) */}
          <div className="lg:col-span-7 group relative">
            <PremiumOverlay message="Pro Resume Analysis" onAction={() => setShowPremiumModal(true)} />
            <div className="bg-surface-light dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden blur-xs group-hover:blur-[6px] transition-all pointer-events-none select-none">
              <div className="p-6 border-b border-gray-50 dark:border-gray-800">
                <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                   NEXUS AI Professional Review
                </h3>
              </div>
              <div className="p-8 space-y-8">
                <MockReviewItem icon="check" title="Frontend Architecture" color="text-emerald-500" />
                <MockReviewItem icon="warning" title="Query Optimization" color="text-amber-500" />
                <MockReviewItem icon="message" title="Communication Pattern" color="text-blue-500" />
              </div>
            </div>
          </div>

          {/* Career Roadmap (Blurred) */}
          <div className="lg:col-span-5 group relative">
            <PremiumOverlay message="Unlock Your Career Path" onAction={() => setShowPremiumModal(true)} />
            <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm blur-xs group-hover:blur-[6px] transition-all pointer-events-none select-none">
              <h3 className="text-lg font-bold mb-8 dark:text-white">Career Roadmap</h3>
              <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-800">
                <MockRoadmapStep title="Frontend Certification" active />
                <MockRoadmapStep title="Full Stack Mastery" />
                <MockRoadmapStep title="Senior Systems Architect" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const PremiumOverlay = ({ message, onAction }: { message: string, onAction: () => void }) => (
  <div 
    onClick={onAction}
    className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer group/overlay transition-all"
  >
    <div className="bg-white/90 dark:bg-surface-dark/90 px-6 py-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-2 transform group-hover/overlay:scale-110 transition-transform">
      <LockFilled className="text-primary text-xl" />
      <span className="font-black text-sm uppercase tracking-widest dark:text-white text-center">{message}</span>
      <p className="text-[10px] font-bold text-primary animate-pulse uppercase">Click to Upgrade</p>
    </div>
  </div>
);

const MockReviewItem = ({ color }: { title: string, icon: string, color: string }) => (
  <div className="flex gap-4 opacity-40">
    <div className={`size-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${color}`}>
       <CheckCircleFilled />
    </div>
    <div className="flex-1">
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
      <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded" />
    </div>
  </div>
);

const MockRoadmapStep = ({ title, active = false }: { title: string, active?: boolean }) => (
  <div className="flex gap-4 pl-6 opacity-30">
    <div className={`absolute left-0 size-4 rounded-full border-4 border-white dark:border-surface-dark ${active ? 'bg-primary' : 'bg-gray-200'}`} />
    <div className="flex-1">
       <h4 className="text-sm font-bold">{title}</h4>
       <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded mt-2" />
    </div>
  </div>
);

export default ProfilePage;