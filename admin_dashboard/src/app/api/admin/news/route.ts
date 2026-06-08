import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit');
  const articles = await prisma.article.findMany({
    take: limit ? Number(limit) : undefined,
    orderBy: { createdAt: 'desc' },
    include: { category: true, author: { select: { id: true, name: true, email: true, role: true } } },
  });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const admin = await prisma.user.findFirst();

  if (!admin) {
    return NextResponse.json({ error: 'No admin user found' }, { status: 400 });
  }

  const slug = slugify(body.title) + '-' + Date.now().toString(36);

  const article = await prisma.article.create({
    data: {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content ?? '',
      slug,
      imageUrl: body.imageUrl || null,
      status: body.status ?? 'DRAFT',
      authorId: admin.id,
      categoryId: body.categoryId,
    },
    include: { category: true, author: { select: { id: true, name: true, email: true, role: true } } },
  });

  return NextResponse.json(article, { status: 201 });
}
