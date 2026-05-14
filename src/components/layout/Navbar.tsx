import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/layout/CartIcon';
import { UserMenu } from '@/components/layout/UserMenu';
import { auth } from '@/auth';

export async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">LuxeCart</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/products" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
              All Products
            </Link>
            <Link href="/categories" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
              Categories
            </Link>
            <Link href="/deals" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
              Deals
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-9 w-64 rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </form>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <UserMenu user={session?.user} />
          <CartIcon />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
