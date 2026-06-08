'use client';

import { useCallback, useState } from 'react';
import type { Article } from '@/types';

export function useNews() {
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async (limit?: number) => {
    setLoading(true);
    try {
      const url = limit ? `/api/admin/news?limit=${limit}` : '/api/admin/news';
      const res = await fetch(url);
      return (await res.json()) as Article[];
    } finally {
      setLoading(false);
    }
  }, []);

  const createNews = useCallback(async (data: Record<string, unknown>) => {
    const res = await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }, []);

  const deleteNews = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    return res.ok;
  }, []);

  return { loading, fetchNews, createNews, deleteNews };
}
