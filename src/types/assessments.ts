export interface AssessmentItem {
  testId: string;
  title: string;
  createdBy: string;
  createdAt: string; // ISO String
  deadline: string;  // ISO String
  score: number;
  status: 'Active' | 'Completed' | 'Draft' | 'In Review'; 
  statusLabel: string;
  actionUrl: string;
}

export interface AssessmentsResponse {
  items: AssessmentItem[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}