"use client";
import DataTable from "@/components/data-table";

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Project Name" },
  { key: "description", label: "Description" },
  { key: "start_date", label: "Start Date" },
  { key: "completion_status", label: "Completion Status" },
  { key: "status", label: "Project Status" },
];

export default function ClientTable() {
  const fetchProjectsData = async () => {
    return await fetch("/api/projects/getProjects");
  };

  return (
    <DataTable
      columns={columns}
      fetchData={fetchProjectsData}
      pageSize={4}
    />
  );
};