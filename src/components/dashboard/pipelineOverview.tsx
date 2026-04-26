import React from 'react';
import { BulbOutlined, ArrowRightOutlined } from '@ant-design/icons';

const PipelineOverview: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Funnel Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-8">Pipeline Overview</h3>
        <div className="space-y-6">
          {[
            { label: 'Applied', count: 1248, width: '100%', color: 'bg-black' },
            { label: 'Test Started', count: 892, width: '71%', color: 'bg-gray-800' },
            { label: 'Test Completed', count: 756, width: '60%', color: 'bg-gray-600' },
            { label: 'High Fit (AI)', count: 142, width: '11%', color: 'bg-emerald-500' },
          ].map((stage, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <span>{stage.label}</span>
                <span className="text-gray-900">{stage.count}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${stage.color}`} style={{ width: stage.width }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex gap-4 p-5 rounded-2xl bg-[#fafafa] border border-gray-100">
            <BulbOutlined className="text-xl text-black mt-0.5" />
            <p className="text-sm text-gray-500 leading-relaxed">
              <strong className="text-black block mb-1">AI Recommendation</strong> 
              Consider inviting more candidates to the "Product Mgmt" track to meet Q4 goals.
            </p>
          </div>
        </div>
      </div>

      {/* Top Skills Card */}
      <div className="bg-black rounded-3xl shadow-xl shadow-black/10 p-8 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white tracking-tight mb-6">Top Skills Tested</h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'React', 'SQL', 'Product Strategy', 'Data Visualization', 'Figma'].map(skill => (
            <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-[11px] font-bold tracking-wide border border-gray-700">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-8 flex justify-end">
          <button className="text-[11px] font-bold text-white uppercase tracking-widest hover:text-gray-400 flex items-center gap-2 transition-colors">
            View Analytics <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;