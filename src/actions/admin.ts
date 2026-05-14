/* eslint-disable */
'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

export async function createCategory(formData: FormData) {
  await checkAdmin();
  
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;

  if (!name || !slug) return { error: 'Name and slug are required' };

  try {
    await prisma.category.create({
      data: { name, slug, description, imageUrl },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create category' };
  }
}

export async function createProduct(formData: FormData) {
  await checkAdmin();
  
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const categoryId = formData.get('categoryId') as string;
  const imageUrls = formData.getAll('imageUrls') as string[];

  if (!name || !slug || !price || !categoryId) return { error: 'Missing required fields' };

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      },
    });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create product' };
  }
}

export async function deleteProduct(id: string) {
  await checkAdmin();
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete product' };
  }
}
