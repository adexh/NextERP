"use client"
import Button from "@/components/ui/button2";
import DataTable from "@/components/data-table";
import NextBreadcrumb from "@/components/nextbreadcrumbs";

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Project Name" },
  { key: "description", label: "Description" },
  { key: "start_date", label: "Start Date" },
  { key: "completion_status", label: "Completion Status" },
  { key: "status", label: "Project Status" }
];

export default function Projects() {
  const fetchProjectsData = async () => {
    return await fetch("/api/projects/getProjects");
  };

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
      </div>
      <div>
      <DataTable
        columns={columns}
        fetchData={fetchProjectsData}
        redirects={{ url: '/projects/<id>', placeholder: '<id>', rowId: 'id', colId:"name" }}
        editOption={{ url: '/projects/<id>/edit', placeholder: '<id>', rowId: 'id' }}
        pageSize={4}
      />
      </div>
    </div>
  );
}