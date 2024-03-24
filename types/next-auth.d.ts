import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: number,
    f_name: string,
    l_name: string,
    urls: string[],
    role: number,
    profileComplete: boolean
  }
  interface Session {
    user: User & DefaultSession["user"]
  }
}