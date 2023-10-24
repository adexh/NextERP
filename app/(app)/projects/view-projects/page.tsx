"use client"
import Button from "@/components/ui/button";
import ClientTable from "./projectsTable";
import { useSession } from "next-auth/react";

export default function Projects() {

  const sesssion = useSession();

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-end mr-2">
        <Button label="Add Client" redirects="/customers/clients/add-client" />
      </div>
      <div>
        <ClientTable />
      </div>
    </div>
  );
}