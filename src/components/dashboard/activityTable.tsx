import React from 'react';
import { EyeOutlined } from '@ant-design/icons';

const ActivityTable: React.FC = () => {
  const data = [
    { name: 'Sarah Jenkins', email: 'sarah.j@email.com', test: 'Python Advanced', status: 'Evaluated', score: 98, fit: 'High Fit', color: 'text-emerald-500' },
    { name: 'Michael Chen', email: 'm.chen@tech.io', test: 'Product Mgmt', status: 'In Progress', score: null, fit: '--', color: 'text-gray-400' },
    { name: 'David Ross', email: 'david.r@data.org', test: 'Data Science', status: 'Evaluated', score: 45, fit: 'Low Fit', color: 'text-red-500' },
    { name: 'Emma Wilson', email: 'emma.ux@design.co', test: 'UX Design Snr', status: 'Evaluated', score: 72, fit: 'Med Fit', color: 'text-yellow-500' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Activity</h3>
        <button className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Candidate</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Test Name</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Fit Score</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, i) => (
              <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name}`} alt={row.name} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{row.name}</span>
                      <span className="text-xs text-gray-400">{row.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer">{row.test}</span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${
                    row.status === 'Evaluated' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {row.score ? (
                      <>
                        <div className="relative size-10 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                            <path className={row.color} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${row.score}, 100`} strokeWidth="4"></path>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${row.color}`}>{row.score}%</span>
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{row.fit}</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-gray-300">--</span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-right">
                  <button className="text-gray-300 hover:text-black transition-colors">
                    <EyeOutlined className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;