import OnBoardForm from "./user-onboard-form";
import NextBreadcrumb from "@/components/nextbreadcrumbs";

export default function Settings() {

  return (
    <div className="flex-col m-4 p-6 rounded-[20px] mr-6 drop-shadow-md bg-white ">
      <div className="mb-5"><NextBreadcrumb/></div>
      <OnBoardForm />
    </div>
  );
}