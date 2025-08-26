'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function LoginForm() {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/courses');
    }
  }, [session.status, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('keycloak', { callbackUrl: '/courses' });
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to access your courses and continue your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
            <p>Our application uses Keycloak for secure authentication.</p>
            <p>Click the button below to sign in or create an account.</p>
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold" size="lg">
            Sign In with Keycloak
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
