import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

 
export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma) as Adapter, //--This is used when Other providers are used with db strategy
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          }
        });
        console.log("User from provider : ",user);
        
        // if user doesn't exist or password doesn't match
        if (!user || !(password === user.password) ) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt ({token, user}) {
      if (user) {
        return {
          ...token,
          f_name:user.f_name,
          role:user.role_id
        }
      }
      return token
    },
    async session ({ session, token, user }) {
      session.user.f_name = token.f_name as string;
      session.user.role = token.role as string;
      return session
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
