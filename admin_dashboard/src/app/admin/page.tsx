'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StatsCards } from '@/components/admin/StatsCards';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { Article, Subscriber } from '@/types';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalSubscribers: 0,
    publishedArticles: 0,
  });
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [recentSubscribers, setRecentSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch('/api/admin/stats').then((r) => r.json()).then(setStats);
    fetch('/api/admin/news?limit=5').then((r) => r.json()).then(setRecentArticles);
    fetch('/api/admin/subscribers?limit=5').then((r) => r.json()).then(setRecentSubscribers);
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {session?.user?.name}</p>
      </div>

      <StatsCards {...stats} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Recent Articles">
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <div key={article.id} className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
                <div>
                  <p className="font-medium">{article.title}</p>
                  <p className="text-sm text-gray-500">{article.category?.name}</p>
                </div>
                <span className="text-xs text-gray-400">{article.status}</span>
              </div>
            ))}
            {recentArticles.length === 0 && <p className="text-gray-500">No articles yet.</p>}
          </div>
          <div className="mt-4">
            <Link href="/admin/news"><Button variant="outline" className="w-full">View All Articles</Button></Link>
          </div>
        </Card>

        <Card title="Recent Subscribers">
          <div className="space-y-3">
            {recentSubscribers.map((sub) => (
              <div key={sub.id} className="border-b pb-3 dark:border-gray-700">
                <p className="font-medium">{sub.email}</p>
                <p className="text-sm text-gray-500">Subscribed: {formatDate(sub.createdAt)}</p>
              </div>
            ))}
            {recentSubscribers.length === 0 && <p className="text-gray-500">No subscribers yet.</p>}
          </div>
          <div className="mt-4">
            <Link href="/admin/subscribers"><Button variant="outline" className="w-full">View All Subscribers</Button></Link>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href="/admin/news/create"><Button className="w-full">+ Create New Article</Button></Link>
        <Link href="/admin/categories"><Button variant="outline" className="w-full">Manage Categories</Button></Link>
      </div>
    </div>
  );
}
