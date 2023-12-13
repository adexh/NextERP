"use client"
import Button from "@/components/ui/button2";
import UserTable from "./userTable";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function Settings() {

  const sesssion = useSession();

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-end mr-2">
        <Button label="Add User" redirects="/settings/add-users" />
      </div>
      <div>
        {/* <Suspense fallback={<Loading />}> */}
          <UserTable />
        {/* </Suspense> */}
      </div>
    </div>
  );
}