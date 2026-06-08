'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SiteSettings } from '@/types';

const initialSettings: SiteSettings = {
  siteName: 'NewsFlow',
  siteTagline: 'Ethiopian news platform',
  siteDescription: 'Delivering trusted news from Ethiopia and around the world',
  siteURL: 'https://newsflow.et',
  defaultLanguage: 'English',
  timezone: 'Africa/Addis_Ababa',
  dateFormat: 'DD/MM/YYYY',
  contactEmail: 'admin@newsflow.et',
  supportEmail: 'support@newsflow.et',
  newsletterEmail: 'newsletter@newsflow.et',
  emailSenderName: 'NewsFlow Team',
  siteLogo: 'newsflow-logo.png',
  favicon: 'favicon.ico',
  primaryColor: '#1A73E8',
  secondaryColor: '#E41C38',
  accentColor: '#F5A623',
  darkMode: false,
  facebookUrl: 'https://facebook.com/newsflow',
  twitterUrl: 'https://twitter.com/newsflow',
  telegramUrl: 'https://t.me/newsflow',
  linkedinUrl: 'https://linkedin.com/company/newsflow',
  instagramUrl: 'https://instagram.com/newsflow',
  youtubeUrl: 'https://youtube.com/@newsflow',
  tiktokUrl: 'https://tiktok.com/@newsflow',
  metaTitle: 'NewsFlow - Ethiopian News Platform',
  metaDescription: 'Latest news from Ethiopia and around the world. Breaking news, politics, business, sports & more',
  metaKeywords: 'ethiopia news, addis ababa, breaking news, politics, sports',
  googleAnalyticsId: 'UA-12345678-1',
  googleTagManager: 'GTM-ABCDEF',
  googleVerification: 'google-site-verification=xxxxx',
  maintenanceMode: false,
  allowRegistration: true,
  defaultUserRole: 'Subscriber',
  captchaOnLogin: true,
  sessionTimeout: '60',
  maxLoginAttempts: '5',
  articlesPerPage: '10',
  commentsPerPage: '20',
  autoApproveComments: false,
  enableBreakingNewsBar: true,
  showAuthorInfo: true,
  showReadTime: true,
  enableRelatedPosts: true,
  adSensePublisherId: 'pub-1234567890123456',
  enableAutoAds: true,
  adRefreshInterval: '30',
  adsDefaultCurrency: 'ETB',
  adsDefaultLanguage: 'English',
  pushNotificationKey: 'Your_API_Key_Here',
  emailDigestTime: '08:00',
  newArticleAlert: true,
  commentNotification: true,
  dailySummaryEmail: true,
  autoBackup: true,
  backupLocation: 'Cloud Storage',
  retentionDays: '30',
  lastBackup: 'June 8, 2024 02:03 AM ✅ Success',
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SiteSettings>(initialSettings);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => setForm((prev) => ({ ...prev, ...data })))
      .catch(() => {
        toast.error('Unable to load settings');
      });
  }, []);

  function updateField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) toast.success('Settings saved');
    else toast.error('Failed to save settings');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Site Settings</p>
          <h1 className="text-3xl font-bold">Configure your NewsFlow platform</h1>
        </div>
        <Button type="submit" form="settings-form" disabled={loading}>
          {loading ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
        <Card title="📌 General Information">
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-2">
              <Input label="Site Name" value={form.siteName} onChange={(e) => updateField('siteName', e.target.value)} />
              <Input label="Site Tagline" value={form.siteTagline} onChange={(e) => updateField('siteTagline', e.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Site Description</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900"
                rows={4}
                value={form.siteDescription}
                onChange={(e) => updateField('siteDescription', e.target.value)}
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Input label="Site URL" value={form.siteURL} onChange={(e) => updateField('siteURL', e.target.value)} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Language</label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  value={form.defaultLanguage}
                  onChange={(e) => updateField('defaultLanguage', e.target.value)}
                >
                  <option>English</option>
                  <option>Amharic</option>
                  <option>Oromo</option>
                  <option>Tigrinya</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  value={form.timezone}
                  onChange={(e) => updateField('timezone', e.target.value)}
                >
                  <option>Africa/Addis_Ababa</option>
                  <option>Europe/London</option>
                  <option>America/New_York</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Format</label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  value={form.dateFormat}
                  onChange={(e) => updateField('dateFormat', e.target.value)}
                >
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
                <input
                  id="darkMode"
                  type="checkbox"
                  checked={form.darkMode}
                  onChange={(e) => updateField('darkMode', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
                />
                <label htmlFor="darkMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Dark Mode Toggle
                </label>
              </div>
            </div>
          </div>
        </Card>

        <Card title="📧 Contact & Email">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Contact Email" type="email" value={form.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} />
            <Input label="Support Email" type="email" value={form.supportEmail} onChange={(e) => updateField('supportEmail', e.target.value)} />
            <Input label="Newsletter Email" type="email" value={form.newsletterEmail} onChange={(e) => updateField('newsletterEmail', e.target.value)} />
            <Input label="Email Sender Name" value={form.emailSenderName} onChange={(e) => updateField('emailSenderName', e.target.value)} />
          </div>
        </Card>

        <Card title="🎨 Branding & Appearance">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Site Logo" value={form.siteLogo} onChange={(e) => updateField('siteLogo', e.target.value)} />
            <Input label="Favicon" value={form.favicon} onChange={(e) => updateField('favicon', e.target.value)} />
            <Input label="Primary Color" value={form.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} />
            <Input label="Secondary Color" value={form.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} />
            <Input label="Accent Color" value={form.accentColor} onChange={(e) => updateField('accentColor', e.target.value)} />
          </div>
        </Card>

        <Card title="🌐 Social Media Links">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Facebook URL" value={form.facebookUrl} onChange={(e) => updateField('facebookUrl', e.target.value)} />
            <Input label="Twitter/X URL" value={form.twitterUrl} onChange={(e) => updateField('twitterUrl', e.target.value)} />
            <Input label="Telegram URL" value={form.telegramUrl} onChange={(e) => updateField('telegramUrl', e.target.value)} />
            <Input label="LinkedIn URL" value={form.linkedinUrl} onChange={(e) => updateField('linkedinUrl', e.target.value)} />
            <Input label="Instagram URL" value={form.instagramUrl} onChange={(e) => updateField('instagramUrl', e.target.value)} />
            <Input label="YouTube URL" value={form.youtubeUrl} onChange={(e) => updateField('youtubeUrl', e.target.value)} />
            <Input label="TikTok URL" value={form.tiktokUrl} onChange={(e) => updateField('tiktokUrl', e.target.value)} />
          </div>
        </Card>

        <Card title="📊 SEO & Metadata">
          <div className="space-y-4">
            <Input label="Meta Title" value={form.metaTitle} onChange={(e) => updateField('metaTitle', e.target.value)} />
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900"
                rows={3}
                value={form.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
              />
            </div>
            <Input label="Meta Keywords" value={form.metaKeywords} onChange={(e) => updateField('metaKeywords', e.target.value)} />
            <div className="grid gap-4 lg:grid-cols-3">
              <Input label="Google Analytics ID" value={form.googleAnalyticsId} onChange={(e) => updateField('googleAnalyticsId', e.target.value)} />
              <Input label="Google Tag Manager" value={form.googleTagManager} onChange={(e) => updateField('googleTagManager', e.target.value)} />
              <Input label="Google Verification" value={form.googleVerification} onChange={(e) => updateField('googleVerification', e.target.value)} />
            </div>
          </div>
        </Card>

        <Card title="🔒 Security & Access">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="maintenanceMode"
                type="checkbox"
                checked={form.maintenanceMode}
                onChange={(e) => updateField('maintenanceMode', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Maintenance Mode
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="allowRegistration"
                type="checkbox"
                checked={form.allowRegistration}
                onChange={(e) => updateField('allowRegistration', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="allowRegistration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Allow New User Registrations
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="captchaOnLogin"
                type="checkbox"
                checked={form.captchaOnLogin}
                onChange={(e) => updateField('captchaOnLogin', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="captchaOnLogin" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Captcha on Login
              </label>
            </div>
            <Input label="Default User Role" value={form.defaultUserRole} onChange={(e) => updateField('defaultUserRole', e.target.value)} />
            <Input label="Session Timeout (minutes)" type="number" value={form.sessionTimeout} onChange={(e) => updateField('sessionTimeout', e.target.value)} />
            <Input label="Max Login Attempts" type="number" value={form.maxLoginAttempts} onChange={(e) => updateField('maxLoginAttempts', e.target.value)} />
          </div>
        </Card>

        <Card title="📄 Content Settings">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Articles Per Page" type="number" value={form.articlesPerPage} onChange={(e) => updateField('articlesPerPage', e.target.value)} />
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="autoApproveComments"
                type="checkbox"
                checked={form.autoApproveComments}
                onChange={(e) => updateField('autoApproveComments', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="autoApproveComments" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto Approve Comments
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="enableBreakingNewsBar"
                type="checkbox"
                checked={form.enableBreakingNewsBar}
                onChange={(e) => updateField('enableBreakingNewsBar', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="enableBreakingNewsBar" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Breaking News Bar
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="showAuthorInfo"
                type="checkbox"
                checked={form.showAuthorInfo}
                onChange={(e) => updateField('showAuthorInfo', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="showAuthorInfo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Author Info
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="showReadTime"
                type="checkbox"
                checked={form.showReadTime}
                onChange={(e) => updateField('showReadTime', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="showReadTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Read Time
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="enableRelatedPosts"
                type="checkbox"
                checked={form.enableRelatedPosts}
                onChange={(e) => updateField('enableRelatedPosts', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="enableRelatedPosts" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Related Posts
              </label>
            </div>
          </div>
        </Card>

        <Card title="📱 Notifications">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Push Notification Key" value={form.pushNotificationKey} onChange={(e) => updateField('pushNotificationKey', e.target.value)} />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Digest Time
              <input
                type="time"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={form.emailDigestTime}
                onChange={(e) => updateField('emailDigestTime', e.target.value)}
              />
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="newArticleAlert"
                type="checkbox"
                checked={form.newArticleAlert}
                onChange={(e) => updateField('newArticleAlert', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="newArticleAlert" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Notify subscribers for new articles
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="commentNotification"
                type="checkbox"
                checked={form.commentNotification}
                onChange={(e) => updateField('commentNotification', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="commentNotification" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Notify admin on new comments
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="dailySummaryEmail"
                type="checkbox"
                checked={form.dailySummaryEmail}
                onChange={(e) => updateField('dailySummaryEmail', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="dailySummaryEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Send daily summary emails
              </label>
            </div>
          </div>
        </Card>

        <Card title="🗂️ Data & Backup">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-900">
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Backup Status</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{form.lastBackup}</p>
            </div>
            <Input label="Backup Location" value={form.backupLocation} onChange={(e) => updateField('backupLocation', e.target.value)} />
            <Input label="Retention Days" type="number" value={form.retentionDays} onChange={(e) => updateField('retentionDays', e.target.value)} />
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
              <input
                id="autoBackup"
                type="checkbox"
                checked={form.autoBackup}
                onChange={(e) => updateField('autoBackup', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              />
              <label htmlFor="autoBackup" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Daily Auto Backup
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" className="w-full" onClick={() => toast.success('Backup started')}>
                Run Backup Now
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => toast.success('Restore action triggered')}>
                Restore from Backup
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
