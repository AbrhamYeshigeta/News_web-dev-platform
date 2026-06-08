import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [totalArticles, publishedArticles, views, totalSubscribers] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.aggregate({ _sum: { views: true } }),
    prisma.subscriber.count(),
  ]);

  return NextResponse.json({
    totalArticles,
    publishedArticles,
    totalViews: views._sum.views ?? 0,
    totalSubscribers,
  });
}
