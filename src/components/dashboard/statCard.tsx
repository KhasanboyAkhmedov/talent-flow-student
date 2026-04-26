import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, icon, suffix }) => (
  <div className="flex flex-col justify-between bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      <div className="text-gray-400 text-lg">{icon}</div>
    </div>
    <div className="flex items-baseline gap-3">
      <p className="text-3xl font-bold text-gray-900 tracking-tighter">
        {value}{suffix && <span className="text-base text-gray-400 font-medium tracking-normal ml-1">{suffix}</span>}
      </p>
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
        <ArrowUpOutlined /> {percentage}
      </span>
    </div>
  </div>
);

export default StatCard;