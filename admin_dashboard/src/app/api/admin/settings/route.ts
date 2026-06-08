import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const KEYS = [
  'siteName',
  'siteTagline',
  'siteDescription',
  'siteURL',
  'defaultLanguage',
  'timezone',
  'dateFormat',
  'contactEmail',
  'supportEmail',
  'newsletterEmail',
  'emailSenderName',
  'siteLogo',
  'favicon',
  'primaryColor',
  'secondaryColor',
  'accentColor',
  'darkMode',
  'facebookUrl',
  'twitterUrl',
  'telegramUrl',
  'linkedinUrl',
  'instagramUrl',
  'youtubeUrl',
  'tiktokUrl',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'googleAnalyticsId',
  'googleTagManager',
  'googleVerification',
  'maintenanceMode',
  'allowRegistration',
  'defaultUserRole',
  'captchaOnLogin',
  'sessionTimeout',
  'maxLoginAttempts',
  'articlesPerPage',
  'commentsPerPage',
  'autoApproveComments',
  'enableBreakingNewsBar',
  'showAuthorInfo',
  'showReadTime',
  'enableRelatedPosts',
  'adSensePublisherId',
  'enableAutoAds',
  'adRefreshInterval',
  'adsDefaultCurrency',
  'adsDefaultLanguage',
  'pushNotificationKey',
  'emailDigestTime',
  'newArticleAlert',
  'commentNotification',
  'dailySummaryEmail',
  'autoBackup',
  'backupLocation',
  'retentionDays',
  'lastBackup',
] as const;

const BOOLEAN_KEYS = [
  'darkMode',
  'maintenanceMode',
  'allowRegistration',
  'captchaOnLogin',
  'autoApproveComments',
  'enableBreakingNewsBar',
  'showAuthorInfo',
  'showReadTime',
  'enableRelatedPosts',
  'enableAutoAds',
  'newArticleAlert',
  'commentNotification',
  'dailySummaryEmail',
  'autoBackup',
] as const;

function parseBoolean(value: string | undefined) {
  return value === 'true';
}

async function getSettings() {
  const rows = await prisma.setting.findMany({
    where: { key: { in: [...KEYS] } },
  });

  const map = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;

  return {
    siteName: map.siteName ?? 'NewsFlow',
    siteTagline: map.siteTagline ?? 'Ethiopian news platform',
    siteDescription: map.siteDescription ?? 'Delivering trusted news from Ethiopia and around the world',
    siteURL: map.siteURL ?? 'https://newsflow.et',
    defaultLanguage: map.defaultLanguage ?? 'English',
    timezone: map.timezone ?? 'Africa/Addis_Ababa',
    dateFormat: map.dateFormat ?? 'DD/MM/YYYY',
    contactEmail: map.contactEmail ?? 'admin@newsflow.et',
    supportEmail: map.supportEmail ?? 'support@newsflow.et',
    newsletterEmail: map.newsletterEmail ?? 'newsletter@newsflow.et',
    emailSenderName: map.emailSenderName ?? 'NewsFlow Team',
    siteLogo: map.siteLogo ?? 'newsflow-logo.png',
    favicon: map.favicon ?? 'favicon.ico',
    primaryColor: map.primaryColor ?? '#1A73E8',
    secondaryColor: map.secondaryColor ?? '#E41C38',
    accentColor: map.accentColor ?? '#F5A623',
    darkMode: parseBoolean(map.darkMode) || false,
    facebookUrl: map.facebookUrl ?? 'https://facebook.com/newsflow',
    twitterUrl: map.twitterUrl ?? 'https://twitter.com/newsflow',
    telegramUrl: map.telegramUrl ?? 'https://t.me/newsflow',
    linkedinUrl: map.linkedinUrl ?? 'https://linkedin.com/company/newsflow',
    instagramUrl: map.instagramUrl ?? 'https://instagram.com/newsflow',
    youtubeUrl: map.youtubeUrl ?? 'https://youtube.com/@newsflow',
    tiktokUrl: map.tiktokUrl ?? 'https://tiktok.com/@newsflow',
    metaTitle: map.metaTitle ?? 'NewsFlow - Ethiopian News Platform',
    metaDescription: map.metaDescription ?? 'Latest news from Ethiopia and around the world. Breaking news, politics, business, sports & more',
    metaKeywords: map.metaKeywords ?? 'ethiopia news, addis ababa, breaking news, politics, sports',
    googleAnalyticsId: map.googleAnalyticsId ?? 'UA-12345678-1',
    googleTagManager: map.googleTagManager ?? 'GTM-ABCDEF',
    googleVerification: map.googleVerification ?? 'google-site-verification=xxxxx',
    maintenanceMode: parseBoolean(map.maintenanceMode),
    allowRegistration: map.allowRegistration !== 'false',
    defaultUserRole: map.defaultUserRole ?? 'Subscriber',
    captchaOnLogin: parseBoolean(map.captchaOnLogin),
    sessionTimeout: map.sessionTimeout ?? '60',
    maxLoginAttempts: map.maxLoginAttempts ?? '5',
    articlesPerPage: map.articlesPerPage ?? '10',
    commentsPerPage: map.commentsPerPage ?? '20',
    autoApproveComments: parseBoolean(map.autoApproveComments),
    enableBreakingNewsBar: parseBoolean(map.enableBreakingNewsBar) ?? true,
    showAuthorInfo: parseBoolean(map.showAuthorInfo) ?? true,
    showReadTime: parseBoolean(map.showReadTime) ?? true,
    enableRelatedPosts: parseBoolean(map.enableRelatedPosts) ?? true,
    adSensePublisherId: map.adSensePublisherId ?? 'pub-1234567890123456',
    enableAutoAds: parseBoolean(map.enableAutoAds) ?? true,
    adRefreshInterval: map.adRefreshInterval ?? '30',
    adsDefaultCurrency: map.adsDefaultCurrency ?? 'ETB',
    adsDefaultLanguage: map.adsDefaultLanguage ?? 'English',
    pushNotificationKey: map.pushNotificationKey ?? 'Your_API_Key_Here',
    emailDigestTime: map.emailDigestTime ?? '08:00',
    newArticleAlert: parseBoolean(map.newArticleAlert) ?? true,
    commentNotification: parseBoolean(map.commentNotification) ?? true,
    dailySummaryEmail: parseBoolean(map.dailySummaryEmail) ?? true,
    autoBackup: parseBoolean(map.autoBackup) ?? true,
    backupLocation: map.backupLocation ?? 'Cloud Storage',
    retentionDays: map.retentionDays ?? '30',
    lastBackup: map.lastBackup ?? 'June 8, 2024 02:03 AM ✅ Success',
  };
}

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  await Promise.all(
    KEYS.map((key) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(body[key] ?? '') },
        create: { key, value: String(body[key] ?? '') },
      }),
    ),
  );

  return NextResponse.json(await getSettings());
}
