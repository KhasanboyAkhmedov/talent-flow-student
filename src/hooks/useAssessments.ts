import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { AssessmentsResponse } from '../types/assessments';

const PAGE_SIZE = 6;

const fetchAssessments = async (tab: string, page: number): Promise<AssessmentsResponse> => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/testing/sessions/${tab}?page=${page}&size=${PAGE_SIZE}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const useAssessments = (tab: string, page: number) => {
  return useQuery({
    queryKey: ['assessments', tab, page],
    queryFn: () => fetchAssessments(tab, page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};