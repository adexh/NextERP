"use client"
import { useRecoilState } from "recoil";
import { modulesState, moduleLoadingState } from "atoms/modules-atom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const [menus, ] = useRecoilState(modulesState);
  const router = useRouter();
  
  useEffect( ()=> {
    if( menus && menus[0].path ) {
      console.log("Pushing");
      router.push(menus[0].path)
    }
  }, [menus])

  return (<></>);
}