import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LayoutProvider } from '@/providers/LayoutProvider';

import { getServerSession } from "next-auth/next";
import authOptions from '@/utils/nextAuthOptions';
import PrivateRoute from '@/providers/PrivateRoute';
import { CoursesProvider } from '@/providers/CoursesProvider';

export const metadata: Metadata = {
  title: 'StreamLearn',
  description: 'A modern platform for streaming video courses.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LayoutProvider session={session}>
          <PrivateRoute>
            <CoursesProvider>
              {children}
            </CoursesProvider>
          </PrivateRoute>
        </LayoutProvider>
        <Toaster />
      </body>
    </html>
  );
}
