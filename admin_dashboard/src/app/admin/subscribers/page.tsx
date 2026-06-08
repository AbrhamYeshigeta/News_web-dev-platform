'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { formatDate } from '@/lib/utils';
import type { Subscriber } from '@/types';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((r) => r.json())
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, []);

  async function deleteSubscriber(id: string) {
    if (!confirm('Remove this subscriber?')) return;
    const res = await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast.success('Subscriber removed');
    }
  }

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Subscribers</h1>
          <p className="text-gray-500">{subscribers.length} total subscribers</p>
        </div>
        <input
          type="text"
          placeholder="Search email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        />
      </div>

      <Card>
        <Table
          data={filtered}
          columns={[
            { key: 'email', header: 'Email' },
            { key: 'createdAt', header: 'Subscribed', render: (row) => formatDate(row.createdAt) },
            {
              key: 'actions',
              header: 'Actions',
              render: (row) => (
                <Button variant="danger" size="sm" onClick={() => deleteSubscriber(row.id)}>Remove</Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
