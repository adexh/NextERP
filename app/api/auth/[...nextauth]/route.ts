import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export interface GithubEmail extends Record<string, any> {
  email: string
  primary: boolean
  verified: boolean
  visibility: "public" | "private"
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
