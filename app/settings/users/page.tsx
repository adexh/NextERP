import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import ReusableTable from "@/components/table";
import Button from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Settings() {
  const columns = [
    {
      key: "id",
      label: "Id"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "username",
      label: "Username"
    },
    {
      key: "contact",
      label: "Contact"
    },
    {
      key: "activeStatus",
      label: "Active Status"
    },
    {
      key: "role",
      label: "Role"
    }
  ];

  const pageSize = 2;

  const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', username: 'johndoe123', contact: '555-555-5555', activeStatus: true, role: 'User' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', username: 'janedoe456', contact: '555-555-5555', activeStatus: false, role: 'Admin' },
    { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com', username: 'bobsmith789', contact: '555-555-5555', activeStatus: true, role: 'User' },
    { id: 4, name: 'Mary Johnson', email: 'mary.johnson@example.com', username: 'maryj567', contact: '555-555-5555', activeStatus: false, role: 'User' },
    { id: 5, name: 'James Brown', email: 'james.brown@example.com', username: 'jamesb890', contact: '555-555-5555', activeStatus: true, role: 'Admin' },
    { id: 6, name: 'Sarah Davis', email: 'sarah.davis@example.com', username: 'sarahd123', contact: '555-555-5555', activeStatus: true, role: 'User' }
  ];

  const onclick = (e: React.MouseEvent<HTMLElement, MouseEvent>)=>{
    redirect('/settings/users/add-users');
  }

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-100 flex-grow">
          <div className="flex-col m-4 p-6 rounded-[20px] drop-shadow-md bg-white">
            <div className="flex justify-end mr-2">
              <Button label="Add" onclick={onclick}/>
            </div>
            <div>
              <ReusableTable
                columns={columns}
                data={data}
                pageSize={pageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}