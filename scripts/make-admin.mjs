import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error('Please provide an email address. Example: node scripts/make-admin.mjs you@example.com');
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    console.log(`✅ Successfully upgraded ${user.email} to ADMIN!`);
  } catch (error) {
    console.error(`❌ Failed to upgrade user. Make sure the email exists.`);
    console.error(error.message || error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
