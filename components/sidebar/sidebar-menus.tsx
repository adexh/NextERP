"use client"
import SidebarMenu from "./menu";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { modulesState, moduleLoadingState } from "atoms/modules-atom";
import LoadingDots from "../loading-dots";
import { useEffect } from "react";

const SidebarMenus = () => {
  let pathname = usePathname()

  const [ loading, setLoading ] = useRecoilState(moduleLoadingState);

  pathname = "/" + pathname.split('/')[1];

  const [menus, setMenus] = useRecoilState(modulesState);

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      // let data: Imenu[];
      try {
        response = await fetch("/api/modules/get-modules");
        const data = await response?.json();
        setLoading(false);
        setMenus(data);
      } catch (error) {
        console.log("Error from fetch  : ",error);
        setLoading(false)
        toast.error("Internal Server Error !");
      }
    }
    fetchData();
  }, [setMenus,setLoading])
  

  let selected = menus.findIndex(el => el.path == pathname);
  

  return <>
    {loading ?
      <div className="w-full flex justify-center my-4">
        <LoadingDots color="#808080" />
      </div> :
      <>
        {menus?.map((val, index: number) => {
          return <SidebarMenu key={val.module_name} menu={val.module_name} path={val.path} icon={val.icon} selected={selected === index ? true : false} />
        })}
      </>}
  </>
}


export default SidebarMenus;