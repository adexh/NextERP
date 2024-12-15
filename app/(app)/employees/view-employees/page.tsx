"use client"
import Button from "@/components/ui/button2";
import DataTable from "@/components/data-table";
import NextBreadcrumb from "@/components/nextbreadcrumbs";

export default function Settings() {

  const fetchEmployees = async () => {
    return await fetch("/api/employees/getEmployees");
  };

  const columns = [
    { key: "id", label: "Id" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "designation", label: "Designation" }
  ];

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
      </div>
      <div>
        <DataTable
          columns={columns}
          fetchData={fetchEmployees}
          redirects={{ url: '/employees/<id>', placeholder: '<id>', rowId: 'id', colId: "first_name" }}
          editOption={{ url: '/employees/<id>/edit', placeholder: '<id>', rowId: 'id' }}
          pageSize={4}
        />
      </div>
    </div>
  );
}