import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@newsflow.et' },
    update: {},
    create: {
      email: 'admin@newsflow.et',
      name: 'Admin User',
      password,
      role: 'ADMIN',
    },
  });

  const categories = await Promise.all(
    ['Technology', 'Sports', 'Business', 'World', 'Health'].map((name) =>
      prisma.category.upsert({
        where: { slug: name.toLowerCase() },
        update: {},
        create: { name, slug: name.toLowerCase() },
      }),
    ),
  );

  const existingArticles = await prisma.article.count();
  if (existingArticles === 0) {
    await prisma.article.createMany({
      data: [
        {
          title: 'Apple unveils revolutionary AI features in iOS 19',
          excerpt: 'The new update brings deep generative model integration across native apps.',
          content: 'Full article content here...',
          slug: 'apple-ai-ios-19',
          imageUrl: 'https://picsum.photos/seed/tech/800/600',
          status: 'PUBLISHED',
          views: 1240,
          authorId: admin.id,
          categoryId: categories[0].id,
        },
        {
          title: 'Ethiopian athletes set new marathon records',
          excerpt: 'National team members achieved historic results at the world championship.',
          content: 'Full article content here...',
          slug: 'ethiopian-athletes-marathon',
          imageUrl: 'https://picsum.photos/seed/sports/800/600',
          status: 'PUBLISHED',
          views: 890,
          authorId: admin.id,
          categoryId: categories[1].id,
        },
      ],
    });
  }

  for (const email of ['reader1@example.com', 'reader2@example.com', 'subscriber@newsflow.et']) {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  }

  console.log('Seed completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
