import NextAuth, { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db";
import { Adapter } from "next-auth/adapters";
import { userInHrm, AccountInHrm, SessionInHrm, VerificationTokenInHrm, role_modules_mapInHrm, modulesInHrm } from "../../../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { createId } from "../../../../drizzle/schema";

export interface GithubEmail extends Record<string, any> {
  email: string
  primary: boolean
  verified: boolean
  visibility: "public" | "private"
}

const getRestrictedModules = async (role_id: number, tenant_id: string)=> {
  const result = await db.select({module: modulesInHrm.module_name})
  .from(role_modules_mapInHrm)
  .fullJoin(modulesInHrm, eq(modulesInHrm.id, role_modules_mapInHrm.module_id))
  .where(and(eq(role_modules_mapInHrm.role_id, role_id), eq(role_modules_mapInHrm.tenant_id, tenant_id)));

  return result.map((item)=> item.module);
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
          id: profile.id.toString(),
          email: profile.email,
          f_name: profile.name.split(" ")[0] ?? profile.login.split(" ")[0],
          l_name: profile.name.split(" ")[1] ?? profile.login.split(" ")[1],
          role_id: null,
          profileComplete: false,
          tenant_id: createId()
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

      if( trigger === 'update' && session.user.profileComplete ) {
        console.log("Update triggerd");
        const [{roleId, f_name, l_name, complete}] = await db.select({f_name:userInHrm.f_name, l_name:userInHrm.l_name ,roleId:userInHrm.role_id, complete: userInHrm.profileComplete}).from(userInHrm).where(eq(userInHrm.email, session.user.email));

        token.profileComplete = complete
        token.role_id = roleId
        token.f_name = f_name
        token.l_name = l_name
        return token;
      }

      if (user) {
        let resticted_modules = user.resticted_modules;

        if ( !resticted_modules && user.role_id ) {
          resticted_modules = await getRestrictedModules(user.role_id, user.tenant_id);
        }

        token.id = user.id as number;
        token.f_name = user.f_name;
        token.l_name = user.l_name;
        token.role_id = user.role_id;
        token.tenant_id = user.tenant_id;
        token.profileComplete = user.profileComplete;
        token.resticted_modules = resticted_modules;
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
