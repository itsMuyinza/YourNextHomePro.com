

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export type VerificationStatus = 'unverified' | 'pending' | 'verified';
export type UserRole = 'GUEST' | 'PRO' | 'HOMEOWNER';
export type LeadStatus = 'LOCKED' | 'UNLOCKED';

export interface LicenseDetails {
  number: string;
  state: string;
  type: string;
  expiry: string;
}

export interface Pro {
  id: string;
  name: string;
  businessName: string;
  service: string;
  rating: number;
  reviewCount: number;
  location: string;
  verified: boolean;
  licenseStatus: VerificationStatus;
  licenseDetails?: LicenseDetails;
  claimed: boolean;
  yearsInBusiness: number;
  description: string;
  imageUrl: string;
  coverUrl: string;
  priceRange: string;
  phone: string;
  email: string;
  tags: string[];
  reviews: Review[];
  team?: { id: string; name: string; role: string; imageUrl: string; bio?: string }[];
  attributes?: { label: string; value: string; subtext?: string; icon: string }[];
  distance: number;
  availability: 'today' | 'tomorrow' | 'week';
  matchReason?: string;
}

export interface Lead {
  id: string;
  proId: string;
  proName: string;
  homeownerName: string;
  homeownerEmail: string;
  homeownerPhone: string;
  serviceType: string;
  urgency: string;
  message: string;
  status: LeadStatus;
  timestamp: string;
  value: number;
  location?: string;
  timing?: string;
}

export interface Thread {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  lastActive: string;
  unread: boolean;
  serviceRequest: string;
  messages: { id: string; sender: 'user' | 'pro'; text: string; timestamp: string }[];
}

export interface FilterState {
  category: string;
  availability: 'any' | 'today' | 'within_3_days';
  distance: number;
  isLicensed: boolean;
  minRating: number;
  instantBook: boolean;
}

export type ViewState = 'home' | 'search' | 'profile' | 'dashboard' | 'hub' | 'blog' | 'homeowner_landing' | 'pro_landing' | 'affiliate_program';
export type DashboardViewState = 'overview' | 'inbox' | 'profile' | 'credentials' | 'settings';
