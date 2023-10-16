import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      f_name: string,
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    f_name: string,
    role_id: string
  }
}