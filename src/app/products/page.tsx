/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string }
}) {
  const { sort, category } = searchParams;
  
  let orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  if (sort === 'price-desc') orderBy = { price: 'desc' };

  const where = category ? { category: { slug: category } } : {};

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { images: true, category: true },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Products</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg mb-4 border-b pb-2">
            <Filter className="h-5 w-5" /> Filters
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products" className={!category ? "text-primary font-medium" : "hover:text-primary"}>
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link href={`/products?category=${cat.slug}`} className={category === cat.slug ? "text-primary font-medium" : "hover:text-primary"}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full rounded border px-2 py-1 text-sm bg-transparent" />
                <span>-</span>
                <input type="number" placeholder="Max" className="w-full rounded border px-2 py-1 text-sm bg-transparent" />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded-md p-1.5 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col gap-4 border rounded-xl p-4 transition-shadow hover:shadow-lg">
                <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  {product.images[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </Link>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="text-xs text-muted-foreground">{product.category.name}</div>
                  <h3 className="font-semibold hover:underline">
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 mt-1 text-xs">
                    ★ ★ ★ ★ ★ <span className="text-muted-foreground">(12)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <Button size="sm" className="rounded-full">Quick Add</Button>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
