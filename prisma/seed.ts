import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets, phones, laptops, and more.',
      imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500',
    },
  })

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
      description: 'Fashionable apparel for everyone.',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500',
    },
  })

  // Create Products
  await prisma.product.upsert({
    where: { slug: 'premium-wireless-headphones' },
    update: {},
    create: {
      name: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 299.99,
      stock: 50,
      categoryId: electronics.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500' }
        ]
      }
    },
  })

  await prisma.product.upsert({
    where: { slug: 'classic-cotton-tshirt' },
    update: {},
    create: {
      name: 'Classic Cotton T-Shirt',
      slug: 'classic-cotton-tshirt',
      description: 'Comfortable and breathable 100% cotton t-shirt.',
      price: 24.99,
      stock: 200,
      categoryId: clothing.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500' }
        ]
      }
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
