import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <p className="text-muted-foreground"><strong>Name:</strong> {session.user.name || 'Not provided'}</p>
          <p className="text-muted-foreground"><strong>Email:</strong> {session.user.email}</p>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <p className="text-muted-foreground text-sm">You haven&apos;t placed any orders yet.</p>
        </div>
      </div>
    </div>
  );
}
