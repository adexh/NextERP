"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const SidebarMenu = (props: { menu: string, path: string, icon: string, selected: boolean }) => {

  // const [selected , setSelected ] = useState(false);

  // const handleSelection = () => {
  //   setSelected(true);
  // }
  
  return <Link href={props.path} >
    <div className={`flex items-center mt-2 h-10 ml-8 pl-4 mr-4 rounded-3xl ${props.selected == true ? 'bg-black text-white shadow-md' : 'hover:bg-gray-200'} `}>
      <Image src={props.icon} alt={props.icon + "-icon"} width={20} height={20} className={`mr-2 h-5 ${props.selected && 'invert'}`} />
      <div className="">{props.menu}</div>
    </div>
  </Link>
}

export default SidebarMenu;