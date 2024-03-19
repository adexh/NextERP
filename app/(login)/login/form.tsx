"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        signIn("email", {
          redirect: false,
          email: e.currentTarget.email.value,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
            toast.error(error);
          } else {
            toast.success("Check your email for the Login/Sign-up link",{duration:36000});
          }
        });
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="hiphen@nexthrm.co"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <button
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Sign In with Email</p>
        )}
      </button>
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <button onClick={(e) => {
        e.preventDefault();
        signIn("github")
          // @ts-ignore
          .then(() => {
              router.refresh();
              router.push('/');
          });
      }}
        className="border-black bg-black text-white hover:bg-white hover:text-black flex h-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
      > <span className="flex justify-center items-center"><Github className="mr-2" /> Github</span></button>
    </form>
  );
}
