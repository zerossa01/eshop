import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl">LuxeCart</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your one-stop destination for premium products. Experience modern shopping with fast delivery and exceptional customer service.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/categories/electronics" className="hover:text-primary">Electronics</Link></li>
              <li><Link href="/categories/clothing" className="hover:text-primary">Clothing</Link></li>
              <li><Link href="/deals" className="hover:text-primary">Special Deals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LuxeCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
