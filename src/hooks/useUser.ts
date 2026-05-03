import { useQuery } from '@tanstack/react-query';

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  status: 'achieved' | 'in-progress' | 'missing' | 'goal';
  progress?: number;
}

export interface AIReview {
  category: string;
  title: string;
  insight: string;
  impactColor: 'green' | 'orange' | 'blue';
  icon: string;
  recommendation?: {
    title: string;
    meta: string;
  };
}

export interface UserProfileResponse {
  name: string;
  surname: string;
  username: string;
  age: number;
  email: string;
  // Mocked fields below
  aiReviews: AIReview[];
  roadmap: CareerGoal[];
}

const fetchUserProfile = async (): Promise<UserProfileResponse> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch user profile');
  const baseData = await response.json();

  // Senior Move: Merging live data with mocks for the UI demo
  return {
    ...baseData,
    aiReviews: [
      {
        category: "Frontend Architecture",
        title: "High Potential in React Ecosystem",
        insight: "Your performance in the 'React & Redux' assessments places you in the top 5%. Component composition is highly optimized.",
        impactColor: "green",
        icon: "trending_up"
      },
      {
        category: "Backend Optimization",
        title: "Query Inefficiencies Detected",
        insight: "SQL execution analysis suggests bottlenecks in complex joins. Reviewing indexing strategies is recommended.",
        impactColor: "orange",
        icon: "model_training",
        recommendation: { title: "SQL Performance Masterclass", meta: "45 mins • Intermediate" }
      }
    ],
    roadmap: [
      { id: '1', title: 'Frontend Basics', description: 'HTML, CSS, JS Mastery', status: 'achieved' },
      { id: '2', title: 'React Certification', description: 'Advanced Hooks & Context', status: 'achieved' },
      { id: '3', title: 'Full Stack Integration', description: 'API Design & Security', status: 'in-progress', progress: 60 },
      { id: '4', title: 'Containerization', description: 'Docker & Kubernetes', status: 'missing' },
      { id: '5', title: 'Senior Architect', description: 'System Design Mastery', status: 'goal' }
    ]
  };
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 15, // 15 mins stale time
  });
};