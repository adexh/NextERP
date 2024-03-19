import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      f_name: string,
      role: number,
      profileComplete: boolean
    } & DefaultSession["user"]
  }
  interface User {
    f_name: string,
    role_id: number,
    profileComplete: boolean
  }
}