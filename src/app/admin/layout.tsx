import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Tag, Users } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r bg-muted/30 p-6 hidden md:block">
        <div className="mb-8">
          <h2 className="text-lg font-bold tracking-tight">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">Manage your store</p>
        </div>
        <nav className="space-y-2">
          <Link href="/admin">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard Overview</span>
            </div>
          </Link>
          <Link href="/admin/products">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </div>
          </Link>
          <Link href="/admin/categories">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">
              <Tag className="h-4 w-4" />
              <span>Categories</span>
            </div>
          </Link>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-sm font-medium opacity-50 cursor-not-allowed">
            <Users className="h-4 w-4" />
            <span>Orders (Coming Soon)</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
