'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store';

export function Header() {
  const { data: session } = useSession();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-900">
      <button
        className="rounded-lg p-2 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{session?.user?.name ?? 'Admin'}</p>
          <p className="text-xs text-gray-500">{session?.user?.email}</p>
        </div>
      </div>
    </header>
  );
}
