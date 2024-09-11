"use client";
import DataTable from "@/components/data-table";

const columns = [
  {
    key: "id",
    label: "Id"
  },
  {
    key: "first_name",
    label: "First Name"
  },
  {
    key: "last_name",
    label: "Last Name"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "contact",
    label: "Contact"
  },
  {
    key: "designation",
    label: "Designation"
  }
];

export default function EmpTable() {
  const fetchProjectsData = async () => {
    return await fetch("/api/employees/getEmployees");
  };

  return (
    <DataTable
      columns={columns}
      fetchData={fetchProjectsData}
      pageSize={4}
    />
  );
};