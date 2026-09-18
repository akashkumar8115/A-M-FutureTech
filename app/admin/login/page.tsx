'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to sign in.');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="form-shell w-full max-w-md p-8">
        <div className="mb-6">
          <Logo size="md" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="badge">Admin</p>
            <h1 className="mt-4 text-3xl font-black">Dashboard login</h1>
          </div>
          <ThemeToggle />
        </div>
        <p className="mt-3 text-sm text-[var(--text-soft)]">Sign in to review enquiries, quotes, applications and notifications.</p>
        <div className="field-wrap mt-6 text-sm">
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="primary-btn mt-6 !w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </form>
    </main>
  );
}
