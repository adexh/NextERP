import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import ButtonWrapper from "@/components/ui/wrap-button";

export default function Settings() {

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-100 flex-grow">
          <div className="flex-col m-4 p-6 rounded-[20px] drop-shadow-md bg-white">
            <div className="flex justify-end mr-2">
              <ButtonWrapper />
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}