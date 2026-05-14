/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '@/actions/auth';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [state, formAction] = useFormState(login as any, { error: undefined } as any);

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center">
      <div className="w-full max-w-md bg-card border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        {state?.error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4 text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value="/" />
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full border rounded-md px-3 py-2 bg-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full border rounded-md px-3 py-2 bg-transparent"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full h-12 mt-4 font-bold">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
