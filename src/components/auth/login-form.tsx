'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would involve a redirect to the Keycloak server.
    // Here, we'll just simulate a successful login and redirect to the courses page.
    router.push('/courses');
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
