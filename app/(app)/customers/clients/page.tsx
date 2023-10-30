"use client"
import Button from "@/components/ui/button2";
import ClientTable from "./clientsTable";
import { useSession } from "next-auth/react";

export default function Settings() {

  const sesssion = useSession();

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-end mr-2">
        <Button label="Add Client" redirects="/customers/add-client" />
      </div>
      <div>
        <ClientTable />
      </div>
    </div>
  );
}