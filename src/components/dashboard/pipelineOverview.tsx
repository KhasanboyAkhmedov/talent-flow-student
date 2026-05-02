import React, { useEffect, useState } from 'react';
import { BulbOutlined } from '@ant-design/icons';
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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/candidate/dashboard/pipeline`,
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
    </div>
  );
};

export default PipelineOverview;