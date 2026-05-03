import React from 'react';
import { CalendarOutlined, ArrowRightOutlined, CheckCircleFilled, EyeOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Progress, Tag } from 'antd';
import type { AssessmentItem } from '../../types/assessments';
import { useNavigate } from 'react-router-dom';

interface AssessmentCardProps {
  item: AssessmentItem;
  onAction: (url: string) => void;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ item, onAction }) => {
  const { testId, title, createdBy, createdAt, status, statusLabel, score, actionUrl } = item;
  const navigate = useNavigate();
  const isActive = status === 'Active';
  const isCompleted = status === 'Completed';
  const isFailed = statusLabel?.toLowerCase() === 'failed';

  // Format the date for better readability
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className={`bg-white rounded-2xl border ${isActive ? 'border-blue-100 shadow-blue-500/5' : 'border-gray-100'} p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group`}>
      {isActive && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />}
      
      <div className="flex justify-between items-start mb-5">
        <Tag className="m-0! border-0! bg-gray-50! text-gray-500! font-bold uppercase text-[10px] tracking-wider px-2 py-0.5">
          {isActive ? 'Technical' : 'Result'}
        </Tag>
        
        <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
          isActive ? 'bg-blue-50 text-blue-600' : 
          isFailed ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {isActive ? <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" /> : 
           isFailed ? <CloseCircleFilled /> : <CheckCircleFilled />}
          {statusLabel || status}
        </span>
      </div>

      <div className="mb-6 flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mb-4">By {createdBy}</p>
        
        {isCompleted && score !== undefined && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <Progress 
                percent={score} 
                showInfo={false} 
                strokeColor={isFailed ? "#ef4444" : "#10b981"} 
                size="small" 
              />
            </div>
            <span className={`text-xs font-black ${isFailed ? 'text-red-600' : 'text-emerald-600'}`}>
              {score}%
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 mb-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <CalendarOutlined /> {formattedDate}
          </div>
        </div>

        <button 
          onClick={() => onAction(actionUrl)}
          className={`w-full py-3 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isActive 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          {isActive ? (
            <p onClick={()=> navigate(`/test/${testId}`)}>Start Assessment <ArrowRightOutlined className="text-xs group-hover:translate-x-1 transition-transform" /></p>
          ) : (
            <p onClick={()=> navigate(`/result/${testId}`)}> <EyeOutlined /> View Report </p>
          )}
        </button>
      </div>
    </article>
  );
};

export default AssessmentCard;