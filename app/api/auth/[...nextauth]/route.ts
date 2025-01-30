import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
// Extending the Session interface
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  // Extending the User interface
  interface User extends DefaultUser {
    id: string;
  }
}

// Extending the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.sub ?? ""
      }
      return token
    },
    // Modified session callback
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
});

export { handler as GET, handler as POST };
