import NextAuth, { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "@/lib/prisma";
import toast from "react-hot-toast";
import { AdapterUser } from "next-auth/adapters";

export interface GithubEmail extends Record<string, any> {
  email: string
  primary: boolean
  verified: boolean
  visibility: "public" | "private"
}

const getModuleUrls = async (user: AdapterUser|User) => {
  const data = await prisma.role_modules_map.findMany({
    select: {
      module: {
        select: {
          path: true
        }
      }
    },
    where: {
      role_id: user.role,
      active_status: true
    }
  })
  return data.map(d => d.module.path)
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
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
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
      if (user) {
        const urls = await getModuleUrls(user);
        return {
          ...token,
          id: user.id,
          f_name: user.f_name,
          l_name: user.l_name,
          role: user.role_id,
          profileComplete: user.profileComplete,
          urls: urls
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.user.id = token.id as number;
      session.user.f_name = token.f_name as string;
      session.user.l_name = token.l_name as string;
      session.user.role = token.role as number
      session.user.profileComplete = token.profileComplete as boolean
      session.user.urls = token.urls as string[]
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
