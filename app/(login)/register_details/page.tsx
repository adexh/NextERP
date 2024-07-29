import {ProfileForm} from "./form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full max-w-xl overflow-hidden rounded-2xl border-2 border-gray-200 shadow-xl px-10 pb-10">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Please fill the details to proceed</h3>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}