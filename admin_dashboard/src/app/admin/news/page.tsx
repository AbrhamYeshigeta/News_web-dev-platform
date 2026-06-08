'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { formatDate } from '@/lib/utils';
import type { Article } from '@/types';

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return;
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success('Article deleted');
    }
  }

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">News Articles</h1>
          <p className="text-gray-500">{articles.length} articles total</p>
        </div>
        <Link href="/admin/news/create"><Button>+ New Article</Button></Link>
      </div>

      <Card>
        <Table
          data={articles}
          columns={[
            { key: 'title', header: 'Title' },
            { key: 'category', header: 'Category', render: (row) => row.category?.name ?? '—' },
            { key: 'status', header: 'Status' },
            { key: 'views', header: 'Views' },
            { key: 'createdAt', header: 'Created', render: (row) => formatDate(row.createdAt) },
            {
              key: 'actions',
              header: 'Actions',
              render: (row) => (
                <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
