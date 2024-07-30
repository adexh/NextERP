import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: number,
    f_name: string,
    l_name: string | null,
    role_id: number,
    profileComplete: boolean,
    tenant_id: string
  }
  interface Session {
    user: User & DefaultSession["user"]
  }
}