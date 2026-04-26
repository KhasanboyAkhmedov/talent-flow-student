import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface ApplicationItem {
  candidate_id: string;
  vacancy_id: string;
  company_name: string;
  position_title: string;
  status: string;
  ai_fit_score: number;
  applied_at: string;
}

const ActivityTable: React.FC = () => {
  const [data, setData] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/recent_applications?page=1&size=5`,
          {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result.items || []);
      } catch (error) {
        console.error(error);
        setData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-20 flex justify-center items-center h-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-100">
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Applications</h3>
        {data.length > 0 && (
          <button className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer">
            View All
          </button>
        )}
      </div>

      {data.length === 0 ? (
        /* Empty State Placeholder */
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="bg-gray-50 rounded-full p-6 mb-4">
            <InboxOutlined className="text-4xl text-gray-300" />
          </div>
          <h4 className="text-gray-900 font-semibold mb-1">No applications found</h4>
          <p className="text-gray-400 text-sm max-w-60">
            There are no recent applications to display at this time.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Position</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Fit Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.candidate_id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <span className="text-xs font-bold text-gray-400">{row.company_name?.charAt(0) || '?'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{row.company_name}</span>
                        <span className="text-[10px] text-gray-400">
                          Applied {row.applied_at ? new Date(row.applied_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer">
                      {row.position_title}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold bg-blue-50 text-blue-600 capitalize">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                          <path 
                            className={getScoreColor(row.ai_fit_score)} 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeDasharray={`${row.ai_fit_score}, 100`} 
                            strokeWidth="4"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${getScoreColor(row.ai_fit_score)}`}>{row.ai_fit_score}%</span>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                          {row.ai_fit_score >= 80 ? 'High Fit' : row.ai_fit_score >= 50 ? 'Med Fit' : 'Low Fit'}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;