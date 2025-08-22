import { LoginForm } from '@/components/auth/login-form';
import { BookOpen } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-primary">
          <BookOpen className="h-16 w-16" />
          <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground">
            StreamLearn
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
