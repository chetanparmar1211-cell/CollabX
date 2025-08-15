export interface User {
  id: string;
  email: string;
  name: string;
  role: 'brand' | 'creator' | 'admin';
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  // Brand specific
  companyName?: string;
  // Creator specific
  creatorProfile?: string;
  categories?: string[];
  rating?: number;
  completedCollaborations?: number;
}

export interface Collaboration {
  id: string;
  brandId: string;
  brandName: string;
  productName: string;
  productUrl: string;
  productImages: string[];
  creatorsRequired: number;
  creatorsCompleted: number;
  compensation: number;
  collaborationType: 'product_sample' | 'barter' | 'co_creation';
  deadline: string;
  status: 'active' | 'completed' | 'pending' | 'paused';
  description: string;
  requirements: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  collaborationId: string;
  creatorId: string;
  creatorName: string;
  contentUrl: string;
  screenshot: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  submittedAt: string;
  verifiedAt?: string;
  notes?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalSpent: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit' | 'commission' | 'withdrawal';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  relatedCollaborationId?: string;
}

export interface Application {
  id: string;
  collaborationId: string;
  creatorId: string;
  creatorName: string;
  creatorRating: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  message?: string;
}