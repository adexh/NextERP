import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "@/lib/prisma";
import toast from "react-hot-toast";

export interface GithubEmail extends Record<string, any> {
  email: string
  primary: boolean
  verified: boolean
  visibility: "public" | "private"
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    GitHubProvider({
      clientId: "465c135bc9170aa2b6fe",
      clientSecret: "cacccc487d71584a88e9e8f2f61e70c4b8616aaf" as string,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          f_name: profile.name.split(" ")[0] ?? profile.login.split(" ")[0],
          l_name: profile.name.split(" ")[1] ?? profile.login.split(" ")[1]
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("USER");
      console.log(user);
      
      if (user) {
        return {
          ...token,
          f_name: user.f_name,
          l_name: user.l_name,
          role: user.role_id,
          profileComplete: user.profileComplete,
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.user.f_name = token.f_name as string;
      session.user.l_name = token.l_name as string;
      session.user.role = token.role as number
      session.user.profileComplete = token.profileComplete as boolean
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
