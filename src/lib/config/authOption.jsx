import { NextAuthOptions, AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export const authOption = {
  // adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/login",
  // },
  providers: [],

  callbacks: {
    // async redirect({url, baseUrl}) {},

    async jwt({ token }) {
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
      };
    },
  },
};
