import NextAuth, { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db";
import { Adapter } from "next-auth/adapters";
import { userInHrm, AccountInHrm, SessionInHrm, VerificationTokenInHrm } from "../../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export interface GithubEmail extends Record<string, any> {
  email: string
  primary: boolean
  verified: boolean
  visibility: "public" | "private"
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db,  {
    //@ts-expect-error As our users table structure different
    usersTable: userInHrm,accountsTable: AccountInHrm,sessionsTable: SessionInHrm, verificationTokensTable: VerificationTokenInHrm,
  }) as Adapter,
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
          l_name: profile.name.split(" ")[1] ?? profile.login.split(" ")[1],
          role_id: null,
          profileComplete: false
        };
      }
    }),
    CredentialsProvider({
      id: "guest",
      credentials: {},
      async authorize(credentials, req) {
        const result = await db.select({
          id: userInHrm.id,
          email: userInHrm.email,
          f_name: userInHrm.f_name,
          l_name: userInHrm.l_name,
          role_id: userInHrm.role_id,
          profileComplete: userInHrm.profileComplete,
          tenant_id: userInHrm.tenant_id
        }).from(userInHrm).where(and(eq(userInHrm.id, -1), eq(userInHrm.f_name, 'Guest')));

        const user : User = result[0];

        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("JWT Callback");

      if( trigger === 'update' && session?.profileComplete ) {
        console.log("Update triggerd");
        token.profileComplete = session.profileComplete
        return token;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          f_name: user.f_name,
          l_name: user.l_name,
          role_id: user.role_id,
          tenant_id: user.tenant_id,
          profileComplete: user.profileComplete
        }
      }
      return token
    },
    async session({ session, token, user }) {
      console.log("Session callback");

      session.user.id = token.id as number;
      session.user.f_name = token.f_name as string;
      session.user.l_name = token.l_name as string;
      session.user.role_id = token.role_id as number
      session.user.profileComplete = token.profileComplete as boolean
      session.user.tenant_id = token.tenant_id as string
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
