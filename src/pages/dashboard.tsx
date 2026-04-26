import React from 'react';
import { TeamOutlined, FileDoneOutlined, CheckCircleOutlined, ThunderboltFilled, PlusOutlined } from '@ant-design/icons';
import StatCard from '../components/dashboard/statCard';
import ActivityTable from '../components/dashboard/activityTable';
import PipelineOverview from '../components/dashboard/pipelineOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Title & Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter text-gray-900 leading-none mb-3">Overview</h2>
          <p className="text-gray-500 font-medium italic">Welcome back. Here is the latest from your recruitment pipeline.</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-[13px] hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
          <PlusOutlined /> Create New Test
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Candidates" value="1,248" percentage="12%" icon={<TeamOutlined />} />
        <StatCard title="Active Tests" value="14" percentage="2%" icon={<FileDoneOutlined />} />
        <StatCard title="Avg. Pass Rate" value="68%" percentage="5%" icon={<CheckCircleOutlined />} />
        <StatCard title="AI Efficiency" value="94" percentage="15%" icon={<ThunderboltFilled />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2"><ActivityTable /></div>
        <div className="xl:col-span-1"><PipelineOverview /></div>
      </div>
    </div>
  );
};

export default Dashboard;