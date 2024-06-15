import Image from "next/image";
import Form from "@/app/(login)/login/form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={60}
            />
          <h3 className="text-xl font-semibold">Log In / Register</h3>
          <p className="text-sm text-gray-500">
            Use your email or github to sign in or Register
          </p>
        </div>
        <Form />
      </div>
    </div>
  );
}
