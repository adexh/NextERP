import { auth } from "@/lib/auth";

import NextBreadcrumb from "@/components/nextbreadcrumbs";
import DetailsTable from '@/components/details-table';

import { getProjectById } from "@/lib/queries/getProjectById";


export default async function Projects({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);
  const session = await auth();

  if( !session || !session.user.id || isNaN(id) ) {
    return;
  }

  const project = await getProjectById(session.user.id, id);
  
  const rows: { key: keyof typeof project; label: string }[] = [
    { key: "id", label: "Id" },
    { key: "projectName", label: "Project Name" },
    { key: "description", label: "Description" },
    { key: "expected_start_date", label: "Start Date" },
    { key: "expected_end_date", label: "End Date" },
    { key: "completion_status", label: "Completion Status" },
    { key: "status", label: "Project Status" }
  ];

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
      </div>
      <div>
        <DetailsTable 
          title="Poject Details"
          rows={rows}
          dataObject={project}/>
      </div>
    </div>
  );
}