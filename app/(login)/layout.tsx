// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "NextHRM Dashboard";
const description =
  "This is an HRM made from NEXTJs";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
            {children}
      </body>
    </html>
  );
}
