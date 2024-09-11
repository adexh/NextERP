"use client"
import Button from "@/components/ui/button2";
import ClientTable from "./projectsTable";
import { useSession } from "next-auth/react";
import NextBreadcrumb from "@/components/nextbreadcrumbs";

export default function Projects() {

  const sesssion = useSession();

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
        <Button label="Add Project" redirects="/projects/add-project" />
      </div>
      <div>
        <ClientTable />
      </div>
    </div>
  );
}