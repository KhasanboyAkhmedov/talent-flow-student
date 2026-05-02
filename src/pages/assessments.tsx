import React from 'react';
import { SearchOutlined} from '@ant-design/icons';
import AssessmentCard from '../components/assessments/assessmentCard';

const AssessmentsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Filters & Search Row */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {['All', 'Active', 'Completed', 'Drafts'].map((tab, i) => (
            <button key={tab} className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
              i === 0 ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
            }`}>
              {tab} {tab === 'Active' && <span className="ml-1 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">2</span>}
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
          <div className="relative grow xl:w-72">
            <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white text-sm focus:ring-2 focus:ring-black/5 outline-none transition-all" 
              placeholder="Search assessments..." 
            />
          </div>
          <select className="px-4 py-2.5 rounded-xl border border-gray-100 bg-white text-sm font-semibold text-gray-600 outline-none cursor-pointer hover:border-gray-300">
            <option>Difficulty: All</option>
            <option>Beginner</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* Grid Assembly */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        <AssessmentCard 
          title="Full Stack System Design Challenge"
          description="Design a scalable backend architecture for a high-traffic social media application."
          type="Technical"
          status="Action Required"
          duration="90 mins"
          dueDate="Today, 5PM"
          difficulty="Hard"
        />
        <AssessmentCard 
          title="Leadership & Team Dynamics"
          description="Situational judgement test assessing your ability to lead small agile teams."
          type="Behavioral"
          status="In Review"
          duration="45 mins"
          dateInfo="Submitted Oct 24"
          difficulty="Med"
        />
        <AssessmentCard 
          title="React & Redux Essentials"
          description="Core concepts of React hooks, state management, and component lifecycles."
          type="Technical"
          status="Completed"
          duration="60 mins"
          score={92}
          dateInfo="Completed Oct 15"
        />
        <AssessmentCard 
          title="Logical Reasoning Series"
          description="Abstract reasoning questions involving patterns and shapes."
          type="Cognitive"
          status="Draft"
          duration="30 mins"
          dateInfo="Started Oct 28"
        />
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-12">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing <span className="text-black">1-4</span> of <span className="text-black">12</span>
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg text-gray-300 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition-all">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;