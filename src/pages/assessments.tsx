// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AssessmentCard from '../components/assessments/assessmentCard';
// import type { AssessmentsResponse } from '../types/assessments';

// const PAGE_SIZE = 6;

// const AssessmentsPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState<AssessmentsResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchAssessments = useCallback(async (signal: AbortSignal) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/testing/sessions/${activeTab}?page=${currentPage}&size=${PAGE_SIZE}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           signal
//         }
//       );
      
//       if (!response.ok) throw new Error(`Status: ${response.status}`);

//       const result: AssessmentsResponse = await response.json();
//       setData(result);
//     } catch (err) {
//       if (err instanceof Error && err.name !== 'AbortError') {
//         console.error("Failed to fetch assessments:", err);
//       }
//     } finally {
//       if (!signal.aborted) setLoading(false);
//     }
//   }, [activeTab, currentPage]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const execute = async () => {
//       await fetchAssessments(controller.signal);
//     };
//     execute();
//     return () => controller.abort();
//   }, [fetchAssessments]);

//   return (
//     <div className="space-y-10">
//       <div className="flex justify-between items-center">
//         <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl">
//           {(['all', 'active', 'completed'] as const).map((tab) => (
//             <button 
//               key={tab} 
//               onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//               className={`px-6 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
//                 activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 min-h-87.5">
//         {loading ? (
//           <div className="col-span-full flex items-center justify-center text-gray-400 font-medium">
//             <span className="animate-pulse">Loading assessments...</span>
//           </div>
//         ) : (
//           data?.items.map((item) => (
//             <AssessmentCard 
//               key={item.testId}
//               item={item}
//               onAction={(url) => navigate(url)}
//             />
//           ))
//         )}
        
//         {!loading && data?.items.length === 0 && (
//           <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
//             No assessments found in this category.
//           </div>
//         )}
//       </div>

//       {data && data.totalPages > 1 && (
//         <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-12">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//             Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, data.total)} of {data.total}
//           </p>
//           <div className="flex gap-2">
//             <button 
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(p => p - 1)}
//               className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors"
//             >
//               Previous
//             </button>
//             <button 
//               disabled={currentPage >= data.totalPages}
//               onClick={() => setCurrentPage(p => p + 1)}
//               className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssessmentsPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentCard from '../components/assessments/assessmentCard';
import { useAssessments } from '../hooks/useAssessments'; // Import our new hook

const PAGE_SIZE = 6;

const AssessmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Look how clean this is now!
  const { data, isLoading, isPlaceholderData, isError } = useAssessments(activeTab, currentPage);

  return (
    <div className="space-y-10">
      {/* Tabs */}
      <div className="flex justify-between items-center">
        <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button 
              key={tab} 
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 min-h-87.5 transition-opacity duration-200 ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center text-gray-400 font-medium py-20">
            <span className="animate-pulse">Loading assessments...</span>
          </div>
        ) : isError ? (
          <div className="col-span-full text-center text-red-500 py-20">
            Failed to load assessments. Please try again.
          </div>
        ) : (
          data?.items.map((item) => (
            <AssessmentCard 
              key={item.testId}
              item={item}
              onAction={(url) => navigate(url)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-12">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-black">{((currentPage - 1) * PAGE_SIZE) + 1}</span> to <span className="text-black">{Math.min(currentPage * PAGE_SIZE, data.total)}</span> of {data.total}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              Previous
            </button>
            <button 
              disabled={currentPage >= data.totalPages || isPlaceholderData}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentsPage;