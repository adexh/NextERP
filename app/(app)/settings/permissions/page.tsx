import NextBreadcrumb from "@/components/nextbreadcrumbs";
import { RolesDropdown } from "./roles-selection";

export default function Settings() {

  return (
    <div className="flex-col m-4 p-6 mr-6 rounded-[20px] drop-shadow-md bg-white">
      <div className="flex justify-between mr-2">
        <NextBreadcrumb/>
      </div>
      <div className="mt-10">
       <RolesDropdown />
      </div>
    </div>
  );
}