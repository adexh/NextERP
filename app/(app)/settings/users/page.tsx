"use client"
import Button from "@/components/ui/button";
import UserTable from "./userTable";
import { useSession } from "next-auth/react";

export default function Settings() {

  const sesssion = useSession();

  return (
    <div className="bg-gray-100 flex-grow">
      <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
        <div className="flex justify-end mr-2">
          <Button label="Add User" redirects="/settings/users/add-users" />
        </div>
        <div>
          <UserTable />
        </div>
      </div>
    </div>
  );
}