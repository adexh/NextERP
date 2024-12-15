import CustomerForm from "@/components/modules/customerForm";

export default async function Projects({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div className="flex-col m-4 p-6 rounded-[20px] mr-6 drop-shadow-md bg-white ">
      <CustomerForm 
        editable
        clientId={id}
        />
    </div>
  );
}