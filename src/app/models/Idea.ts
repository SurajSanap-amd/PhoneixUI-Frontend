export interface Idea {
  id?: number;
  startTime?: string;
  completionTime?: string;
  email?: string;
  name?: string;
  toilItem?: string;
  description?: string;
  impactedComponents?: string;
  painPoints?: string;
  frequency?: string;
  manualEffort?: string;
  automatable?: boolean;
  impact?: 'LOW' | 'MEDIUM' | 'HIGH';
  solution?: string;
  status?: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  comments?: string;
  typeOfAsk?: string;
  category?: 'BUG' | 'FEATURE' | 'IMPROVEMENT';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  complexity?: 'SIMPLE' | 'MODERATE' | 'HIGH';
  suggestedPriority?: number;
  usDirection?: string;
  ownerToCreateUS?: string;
  jiraCreated?: boolean;
  jiraId?: string;
  createdDate?: string;
  updatedDate?: string;
  
  likes?: number;
  isLiked?: boolean;
}
