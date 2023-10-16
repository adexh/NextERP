import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  // const session = {
  //   user: {
  //     email: 'adesh.t@gmail.com'
  //   }
  // };
  
  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {session && (
        <p className="text-stone-500 text-sm">
          Signed in as {session.user?.email}
        </p>
      )}
    </div>
  );
}
