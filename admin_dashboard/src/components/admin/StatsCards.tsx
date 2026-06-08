import { Newspaper, Eye, Users, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatsCardsProps {
  totalArticles: number;
  totalViews: number;
  totalSubscribers: number;
  publishedArticles?: number;
}

const stats = [
  { key: 'totalArticles', label: 'Total Articles', icon: Newspaper, color: 'text-blue-600' },
  { key: 'publishedArticles', label: 'Published', icon: CheckCircle, color: 'text-green-600' },
  { key: 'totalViews', label: 'Total Views', icon: Eye, color: 'text-purple-600' },
  { key: 'totalSubscribers', label: 'Subscribers', icon: Users, color: 'text-orange-600' },
] as const;

export function StatsCards(props: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 text-2xl font-bold">{props[key] ?? 0}</p>
            </div>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
}
