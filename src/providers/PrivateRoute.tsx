"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow unauthenticated users to access only /login
    if (status === "loading") {
      setLoading(true);
      return;
    }
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login");
    }
    setLoading(false);
  }, [status, pathname, router]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
