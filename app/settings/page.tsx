import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import ReusableTable from "@/components/table";

export default function Settings() {

  const columns = ['ID', 'Name', 'Email'];

  const pageSize = 2;

  const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com' },
    // Add more sample data as needed
  ];

  return (
    <div className="flex-col m-20">
      <button className="text-white bg-primary-600 px-10 h-10 shadow-md shadow-primary-400 hover:bg-primary-700 active:translate-y-0.5 active:shadow-none rounded-xl mb-4">
        Add
      </button>
    </div>
  );
}