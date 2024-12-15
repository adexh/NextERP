import { auth } from "@/lib/auth";

import NextBreadcrumb from "@/components/nextbreadcrumbs";
import DetailsTable from '@/components/details-table';

import { getEmployeeById } from "@/lib/queries/getEmployeeById";


export default async function Employee({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);
  const session = await auth();

  if( !session || !session.user.id ) {
    return;
  }

  const employee = await getEmployeeById(session.user.id, id);

  //@ts-expect-error
  employee.projects = employee.projects.map((project: any) => project.value).join(", ");
  
  const rows: { key: keyof typeof employee; label: string }[] = [
    { key: "id", label: "Id" },
    { key: "fname", label: "First Name" },
    { key: "lname", label: "Last Name" },
    { key: "contact", label: "Contact" },
    { key: "designation", label: "Designation" },
    { key: "email", label: "Email" },
    { key: "org_email", label: "Org Email" },
    { key: "gender", label: "Gender" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
    { key: "pincode", label: "Pincode" },
    { key: "doj", label: "Date of Joining" },
    { key: "dob", label: "Date of Birth" },
    { key: "projects", label: "Projects" }
  ];

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
      </div>
      <div>
        <DetailsTable 
          title="Employee Details"
          rows={rows}
          dataObject={employee}/>
      </div>
    </div>
  );
}