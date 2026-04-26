// import React from 'react';
// import { BulbOutlined, ArrowRightOutlined } from '@ant-design/icons';

// const PipelineOverview: React.FC = () => {
//   return (
//     <div className="flex flex-col gap-6 h-full">
//       {/* Funnel Card */}
//       <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
//         <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-8">Pipeline Overview</h3>
//         <div className="space-y-6">
//           {[
//             { label: 'Applied', count: 1248, width: '100%', color: 'bg-black' },
//             { label: 'Test Started', count: 892, width: '71%', color: 'bg-gray-800' },
//             { label: 'Test Completed', count: 756, width: '60%', color: 'bg-gray-600' },
//             { label: 'High Fit (AI)', count: 142, width: '11%', color: 'bg-emerald-500' },
//           ].map((stage, i) => (
//             <div key={i} className="flex flex-col gap-2">
//               <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
//                 <span>{stage.label}</span>
//                 <span className="text-gray-900">{stage.count}</span>
//               </div>
//               <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
//                 <div className={`h-full rounded-full ${stage.color}`} style={{ width: stage.width }}></div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-8 pt-8 border-t border-gray-100">
//           <div className="flex gap-4 p-5 rounded-2xl bg-[#fafafa] border border-gray-100">
//             <BulbOutlined className="text-xl text-black mt-0.5" />
//             <p className="text-sm text-gray-500 leading-relaxed">
//               <strong className="text-black block mb-1">AI Recommendation</strong> 
//               Consider inviting more candidates to the "Product Mgmt" track to meet Q4 goals.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Top Skills Card */}
//       <div className="bg-black rounded-3xl shadow-xl shadow-black/10 p-8 flex flex-col flex-1">
//         <h3 className="text-lg font-bold text-white tracking-tight mb-6">Top Skills Tested</h3>
//         <div className="flex flex-wrap gap-2">
//           {['Python', 'React', 'SQL', 'Product Strategy', 'Data Visualization', 'Figma'].map(skill => (
//             <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-[11px] font-bold tracking-wide border border-gray-700">
//               {skill}
//             </span>
//           ))}
//         </div>
//         <div className="mt-auto pt-8 flex justify-end">
//           <button className="text-[11px] font-bold text-white uppercase tracking-widest hover:text-gray-400 flex items-center gap-2 transition-colors">
//             View Analytics <ArrowRightOutlined />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PipelineOverview;

import React, { useEffect, useState } from 'react';
import { BulbOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface PipelineData {
  total_jobs_applied: number;
  total_tests_completed: number;
  average_test_score: number;
}

const PipelineOverview: React.FC = () => {
  const [pipeline, setPipeline] = useState<PipelineData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://192.168.1.105:8000/dashboard/pipeline',
          {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if (!response.ok) throw new Error('Failed to fetch pipeline data');
        const data = await response.json();
        setPipeline(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPipeline();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 h-full min-h-100 justify-center items-center bg-white rounded-3xl border border-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  const applied = pipeline?.total_jobs_applied || 0;
  const completed = pipeline?.total_tests_completed || 0;
  const testEfficiency = pipeline?.average_test_score || 0;

  const stages = [
    { 
      label: 'Applied', 
      count: applied, 
      width: '100%', 
      color: 'bg-black' 
    },
    { 
      label: 'Test Completed', 
      count: completed, 
      width: applied > 0 ? `${(completed / applied) * 100}%` : '0%', 
      color: 'bg-gray-700' 
    },
    { 
      label: 'Avg. Efficiency', 
      count: `${testEfficiency}%`, 
      width: `${testEfficiency}%`, 
      color: 'bg-emerald-500' 
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in duration-700">
      {/* Funnel Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-8">Pipeline Overview</h3>
        <div className="space-y-6">
          {stages.map((stage, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <span>{stage.label}</span>
                <span className="text-gray-900">{stage.count}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${stage.color}`} 
                  style={{ width: stage.width }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex gap-4 p-5 rounded-2xl bg-[#fafafa] border border-gray-100">
            <BulbOutlined className="text-xl text-black mt-0.5" />
            <div className="text-sm text-gray-500 leading-relaxed">
              <strong className="text-black block mb-1">AI Recommendation</strong> 
              {testEfficiency < 50 
                ? "Candidate test scores are below average. Consider refining the 'Product Mgmt' assessment difficulty."
                : "Candidate quality is high. Proceed with technical interviews for top-tier applicants."
              }
            </div>
          </div>
        </div>
      </div>

      {/* Top Skills Card - Maintaining established brand aesthetic */}
      <div className="bg-black rounded-3xl shadow-xl shadow-black/10 p-8 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white tracking-tight mb-6">Top Skills Tested</h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'React', 'SQL', 'Product Strategy', 'Data Visualization', 'Figma'].map(skill => (
            <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-[11px] font-bold tracking-wide border border-gray-700 hover:text-white transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-8 flex justify-end">
          <button className="group text-[11px] font-bold text-white uppercase tracking-widest hover:text-gray-400 flex items-center gap-2 transition-colors cursor-pointer">
            View Analytics <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;