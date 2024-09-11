"use client"
import Button from "@/components/ui/button2";
import EmpTable from "./empTable";
import { useSession } from "next-auth/react";
import NextBreadcrumb from "@/components/nextbreadcrumbs";

export default function Settings() {

  const sesssion = useSession();

  return (
    <div className=" m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
        <Button label="Add Employee" redirects="/employees/add-employee" />
      </div>
      <div>
        <EmpTable />
      </div>
    </div>
  );
}