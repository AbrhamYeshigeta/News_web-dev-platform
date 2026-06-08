import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit');
  const subscribers = await prisma.subscriber.findMany({
    take: limit ? Number(limit) : undefined,
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(subscribers);
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const subscriber = await prisma.subscriber.create({ data: { email } });
  return NextResponse.json(subscriber, { status: 201 });
}
