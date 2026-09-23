export type UserRole = 'user' | 'admin' | 'developer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  passwordSalt?: string;
  passwordHashPreview?: string; // Stored hash prefix to demonstrate real PBKDF2/SHA-512 hashing in UI
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface BackofficeStats {
  totalSearches: number;
  geneticOptimizationsRun: number;
  averageSavingsUSD: number;
  averageSavingsPercent: number;
  averageQpiScore: number;
  lstmHistoricalDipsCount: number;
  totalUsersCount: number;
  totalCatalogProducts: number;
  categoryDistribution: {
    category: string;
    label: string;
    count: number;
    percentage: number;
  }[];
  merchantShare: {
    merchant: string;
    bestOfferCount: number;
    percentage: number;
    avgTrust: number;
  }[];
  weeklyActivity: {
    day: string;
    searches: number;
    gaRuns: number;
  }[];
  recentAuditLogs: {
    id: string;
    timestamp: string;
    userEmail: string;
    action: string;
    category: string;
    detail: string;
  }[];
}
