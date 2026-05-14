/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Star, Truck, RefreshCw } from 'lucide-react';

export default async function ProductDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true, variants: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted border">
            {product.images[0] && (
              <img 
                src={product.images[0].url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img) => (
              <button key={img.id} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary">
                <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400 text-sm">
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4 opacity-50" />
            </div>
            <span className="text-sm text-muted-foreground">(24 reviews)</span>
          </div>

          <div className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</div>

          <p className="text-base text-muted-foreground mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-8">
            {/* Variants / Size / Color placeholder */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button key={size} className="w-12 h-12 rounded-md border flex items-center justify-center hover:border-primary hover:bg-muted font-medium transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Quantity</h3>
              <div className="flex items-center border w-32 rounded-md overflow-hidden">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">-</button>
                <input type="number" defaultValue="1" className="w-12 h-10 text-center bg-transparent focus:outline-none" />
                <button className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">+</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <Button size="lg" className="w-full h-14 text-base font-bold">Add to Cart</Button>
            <Button size="lg" variant="secondary" className="w-full h-14 text-base font-bold bg-muted/80">Buy it Now</Button>
          </div>

          <div className="space-y-4 py-6 border-t text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Check className="text-green-500 w-5 h-5 shrink-0" />
              <span>In stock and ready to ship ({product.stock} available)</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="w-5 h-5 shrink-0" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <RefreshCw className="w-5 h-5 shrink-0" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
