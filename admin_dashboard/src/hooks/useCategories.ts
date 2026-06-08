'use client';

import { useCallback, useState } from 'react';
import type { Category } from '@/types';

export function useCategories() {
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      return (await res.json()) as Category[];
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (name: string) => {
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return res.json();
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    return res.ok;
  }, []);

  return { loading, fetchCategories, createCategory, deleteCategory };
}
