/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/auth';

export function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Link href="/login">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Login</span>
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setOpen(!open)}
        className="rounded-full bg-primary/10"
      >
        <User className="h-5 w-5 text-primary" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-card p-2 shadow-lg z-50 flex flex-col gap-1">
          <div className="px-2 py-1.5 text-sm font-medium border-b mb-1 truncate">
            {user.name || user.email}
          </div>
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start h-9 px-2 text-sm">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          {user.role === 'ADMIN' && (
            <Link href="/admin" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start h-9 px-2 text-sm text-primary">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Admin Panel
              </Button>
            </Link>
          )}>
          <form action={logout} className="w-full">
            <Button variant="ghost" type="submit" className="w-full justify-start h-9 px-2 text-sm text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
