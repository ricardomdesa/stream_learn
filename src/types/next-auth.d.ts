import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {

    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
  }
}

declare module "next-auth/jwt" {

    interface JWT extends DefaultJWT{
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
    }
}