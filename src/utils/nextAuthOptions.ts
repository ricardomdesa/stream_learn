import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const keycloakConfig = {
  clientId: process.env.KEYCLOAK_CLIENT_ID!,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
  issuer: process.env.KEYCLOAK_ISSUER_URL!,
} as const;

const providers = [
  // Configure Keycloak as the authentication provider
  KeycloakProvider(keycloakConfig),
];
const callbacks: NextAuthOptions["callbacks"] = {
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async jwt({ token, account, profile }) {
    if (account && profile) {
      token.accessToken = account.access_token;
      token.refreshToken = account.refresh_token;
      token.idToken = account.id_token;
    }
    return token;
  },
  async session({ session, token }) {
    (session as any).accessToken = token.accessToken;
    (session as any).refreshToken = token.refreshToken;
    (session as any).idToken = token.idToken;
    return session;
  },
    
};

const session: NextAuthOptions["session"] = {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
};

const authOptions: NextAuthOptions = { providers, callbacks, session };
export default authOptions;