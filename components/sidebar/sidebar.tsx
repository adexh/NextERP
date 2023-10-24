import UserSection from "./user-section-sidebar";
import SidebarMenus from "./sidebar-menus";

export default function Sidebar() {
  return <>
    <div className="h-[calc(100vh_-_40px)] md:h-[calc(100vh_-_70px)] min-w-fit overflow-visible  border-r-2 border-gray-200 shadow">
      <div className="my-5">
        <div className="">
          <UserSection />
          <SidebarMenus />
        </div>
      </div>
    </div>
  </>
}