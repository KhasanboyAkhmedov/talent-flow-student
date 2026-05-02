import React from 'react';
import { 
  ClockCircleOutlined, 
  CalendarOutlined, 
  BarChartOutlined, 
  ArrowRightOutlined,
  CheckCircleFilled,
  LockOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Progress, Tag } from 'antd';

interface AssessmentCardProps {
  title: string;
  description: string;
  type: 'Technical' | 'Behavioral' | 'Cognitive' | 'Personality';
  status: 'Action Required' | 'In Review' | 'Completed' | 'Draft' | 'Locked';
  duration: string;
  difficulty?: 'Easy' | 'Med' | 'Hard';
  dueDate?: string;
  score?: number;
  dateInfo?: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ 
  title, description, type, status, duration, difficulty, dueDate, score, dateInfo 
}) => {
  const isUrgent = status === 'Action Required';
  const isCompleted = status === 'Completed';
  const isLocked = status === 'Locked';

  return (
    <article className={`bg-white rounded-2xl border ${isUrgent ? 'border-red-100 shadow-red-500/5' : 'border-gray-100'} p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group`}>
      {isUrgent && <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />}
      
      <div className="flex justify-between items-start mb-5">
        <Tag className="m-0! border-0! bg-blue-50! text-blue-600! font-bold uppercase text-[10px] tracking-wider px-2 py-0.5">
          {type}
        </Tag>
        
        <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
          isUrgent ? 'bg-red-50 text-red-600' : 
          isCompleted ? 'bg-emerald-50 text-emerald-600' : 
          status === 'In Review' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'
        }`}>
          {isUrgent && <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />}
          {isCompleted && <CheckCircleFilled />}
          {isLocked && <LockOutlined />}
          {status}
        </span>
      </div>

      <div className="mb-6 flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        {isCompleted && score !== undefined && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <Progress percent={score} showInfo={false} strokeColor="#10b981" size="small" />
            </div>
            <span className="text-xs font-black text-emerald-600">{score}%</span>
          </div>
        )}
        
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 mb-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <ClockCircleOutlined /> {duration}
          </div>
          {dueDate && (
            <div className={`flex items-center gap-1.5 ${isUrgent ? 'text-red-500' : ''}`}>
              <CalendarOutlined /> Due {dueDate}
            </div>
          )}
          {dateInfo && (
            <div className="flex items-center gap-1.5">
              <CalendarOutlined /> {dateInfo}
            </div>
          )}
          {difficulty && (
            <div className="flex items-center gap-1.5 ml-auto text-gray-500 uppercase tracking-tighter">
              <BarChartOutlined /> {difficulty}
            </div>
          )}
        </div>

        {isUrgent && (
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 group-hover:translate-y-px">
            Start Assessment <ArrowRightOutlined className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        {isCompleted && (
          <button className="w-full py-3 bg-white border border-gray-200 text-gray-900 text-[13px] font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <EyeOutlined /> View Report
          </button>
        )}
        {status === 'Draft' && (
          <button className="w-full py-3 border border-blue-600 text-blue-600 text-[13px] font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            Continue Assessment
          </button>
        )}
        {(status === 'In Review' || isLocked) && (
          <button className="w-full py-3 bg-gray-50 text-gray-300 text-[13px] font-bold rounded-xl cursor-not-allowed border border-gray-100" disabled>
            {isLocked ? 'Available Soon' : 'Awaiting Results'}
          </button>
        )}
      </div>
    </article>
  );
};

export default AssessmentCard;