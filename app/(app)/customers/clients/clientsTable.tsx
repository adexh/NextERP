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
    key: "org_name",
    label: "Org. Name"
  }
];

export default function ClientTable() {
  const fetchProjectsData = async () => {
    return await fetch("/api/clients/getClients");
  };

  return (
    <DataTable
      columns={columns}
      fetchData={fetchProjectsData}
      pageSize={4}
    />
  );
};