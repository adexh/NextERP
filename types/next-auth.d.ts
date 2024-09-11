import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: number,
    f_name: string,
    l_name: string | null,
    role_id: number | null,
    profileComplete: boolean,
    tenant_id: string,
    resticted_modules?: (string | null)[]
  }
  interface Session {
    user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number,
    f_name: string,
    l_name: string | null,
    role_id: number | null,
    profileComplete: boolean,
    tenant_id: string,
    resticted_modules?: (string | null)[]
  }
}