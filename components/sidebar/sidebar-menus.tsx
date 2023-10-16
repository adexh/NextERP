"use client"
import LoadingDots from "@/components/loading-dots";
// import { getModules } from "./get-modules";
// import { headers } from 'next/headers';
import SidebarMenu from "./menu";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SidebarMenus = () => {
  const pathname = usePathname()
  console.log(pathname);
  
  const [loading, setLoading] = useState<boolean>(true);

  // const headersList = headers()
  // const pathname = headersList.get('x-pathname')?.split('/')[1];

  interface Imenu {
    module: {
      module_name: string,
      child_modules?: Imenu[],
      path: string,
      icon: string,
      display_order: number
    }
  }
  const [menus,setMenus] = useState<Imenu[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/modules/get-modules")
      const data: Imenu[] = await response.json();
      console.log("Got data from API: ", data);
      setLoading(false);
      setMenus(data);
    }
    fetchData();
  }, [setMenus])

  //const menus = await getModules();
  // const loading = false;
  
  let selected = menus?.findIndex(el => el.module.path == pathname);

  return <>
    {loading ?
      <div className="w-full ">
        <LoadingDots color="#808080" />
      </div> :
      <>
        {menus?.map((val, index: number) => {
          return <SidebarMenu key={val.module.module_name} menu={val.module.module_name} path={val.module.path} icon={val.module.icon} selected={selected === index ? true : false} />
        })}
      </>}
  </>
}


export default SidebarMenus;