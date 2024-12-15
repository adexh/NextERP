import { auth } from "@/lib/auth";

import NextBreadcrumb from "@/components/nextbreadcrumbs";
import DetailsTable from '@/components/details-table';

import { getClientById } from "@/lib/queries/getClientById";


export default async function Projects({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);
  const session = await auth();

  if( !session || !session.user.id ) {
    return;
  }

  const client = await getClientById(session.user.id, id);
  
  const rows: { key: keyof typeof client; label: string }[] = [
    { key: "id", label: "Id" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "org_name", label: "Org. Name" },
    { key: "gender", label: "Gender" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
    { key: "pincode", label: "Pincode" },
    { key: "dob", label: "DOB" }
  ];

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb />
      </div>
      <div>
        <DetailsTable 
          title="Customer Details"
          rows={rows}
          dataObject={client}/>
      </div>
    </div>
  );
}