/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export default async function Home() {
  const categories = await prisma.category.findMany({ take: 4 });
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    include: { images: true }
  });

  return (
    <div className="flex flex-col gap-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        {/* Placeholder hero image */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 flex flex-col items-start gap-6 px-4 md:px-6 mx-auto">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            New Summer Collection
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl max-w-2xl text-foreground">
            Elevate Your <br/> Everyday Style
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
            Discover our carefully curated selection of premium products. Quality meets modern design for a lifestyle upgrade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="h-12 px-8 text-base">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-md">
              View Lookbook
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Free Shipping</h3>
              <p className="text-xs text-muted-foreground mt-1">On orders over $100</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">30-Day Returns</h3>
              <p className="text-xs text-muted-foreground mt-1">Hassle-free return policy</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Secure Payment</h3>
              <p className="text-xs text-muted-foreground mt-1">100% secure checkout</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">24/7 Support</h3>
              <p className="text-xs text-muted-foreground mt-1">Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-muted"
            >
              <img
                src={category.imageUrl || ''}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">Explore collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:underline">
            Shop All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col gap-4">
              <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                {product.images[0] && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                  New
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-lg hover:underline">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <Button variant="secondary" size="sm" className="rounded-full">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center flex flex-col items-center justify-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold max-w-xl">Join Our Newsletter & Get 15% Off</h2>
          <p className="text-primary-foreground/80 max-w-md">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="flex w-full max-w-md gap-2 mt-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <Button size="lg" variant="secondary" className="px-8 font-bold">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
