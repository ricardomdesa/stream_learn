"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import { createContext, useContext } from "react";
import { SessionProvider } from "next-auth/react";

type LayoutContextType = {
  content: ReactNode;
  setContent: Dispatch<SetStateAction<ReactNode>>;
};
const LayoutContext = createContext({} as LayoutContextType);

export function LayoutProvider({ children, session }: { children: React.ReactNode, session: any }) {

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

export const useLayout = () => useContext(LayoutContext);
