export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count?: { articles: number };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  imageUrl: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  views: number;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  author?: User;
  category?: Category;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface DashboardStats {
  totalArticles: number;
  totalViews: number;
  totalSubscribers: number;
  publishedArticles: number;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  siteURL: string;
  defaultLanguage: string;
  timezone: string;
  dateFormat: string;

  contactEmail: string;
  supportEmail: string;
  newsletterEmail: string;
  emailSenderName: string;

  siteLogo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkMode: boolean;

  facebookUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  googleTagManager: string;
  googleVerification: string;

  maintenanceMode: boolean;
  allowRegistration: boolean;
  defaultUserRole: string;
  captchaOnLogin: boolean;
  sessionTimeout: string;
  maxLoginAttempts: string;

  articlesPerPage: string;
  commentsPerPage: string;
  autoApproveComments: boolean;
  enableBreakingNewsBar: boolean;
  showAuthorInfo: boolean;
  showReadTime: boolean;
  enableRelatedPosts: boolean;

  adSensePublisherId: string;
  enableAutoAds: boolean;
  adRefreshInterval: string;
  adsDefaultCurrency: string;
  adsDefaultLanguage: string;

  pushNotificationKey: string;
  emailDigestTime: string;
  newArticleAlert: boolean;
  commentNotification: boolean;
  dailySummaryEmail: boolean;

  autoBackup: boolean;
  backupLocation: string;
  retentionDays: string;
  lastBackup: string;
}
