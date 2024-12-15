import EmployeeForm from "@/components/modules/employeeForm";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div className="flex-col m-4 p-6 rounded-[20px] mr-6 drop-shadow-md bg-white ">
      <EmployeeForm
        editable
        employeeId={id}
        />
    </div>
  );
}