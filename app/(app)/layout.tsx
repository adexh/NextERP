// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/auth-provider";
import RecoilProvider from "@/components/recoil-provider";
import { auth } from "@/lib/auth";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import { Suspense } from "react";
import { headers } from 'next/headers'
import Loading from "../../components/loading";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "NextHRM Dashboard";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

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
  const session = await auth()

  const headersList = headers()
  const pathname = "/" + headersList.get('x-pathname')?.split('/')[1];

  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <RecoilProvider>
          <AuthProvider session={session}>
            <div className="h-screen w-screen overflow-hidden">
              <Header />
              <div className="flex">
                <Suspense fallback={<Loading />}>
                  <Sidebar />
                  <div className="bg-gray-200 flex-grow overflow-y-auto overscroll-contain h-[calc(100vh-70px)]">
                    {children}
                    <SpeedInsights />
                    <Analytics />
                  </div>
                </Suspense>
              </div>
            </div>
          </AuthProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
