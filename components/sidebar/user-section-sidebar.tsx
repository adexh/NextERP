"use client"
import { useSession, signOut} from "next-auth/react";
import Dropdown from "../ui/dropdown";

import { HiOutlineChevronDown } from "react-icons/hi2";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Option {
  label: string
  onClickHandle: () => void
  iconPath: string
}

type roleName = {
  id: number,
  role_name: string
}

const UserSection = () => {
  const session = useSession();

  const id = session.data?.user.role_id;

  const [ roleName, setRoleName ] = useState<string>();

  const options: Option[] = [
    {
      label: "View Profile",
      onClickHandle: () => {},
      iconPath: "/icons/profile-circle-svgrepo-com.svg"
    },
    {
      label: "Logout",
      onClickHandle: () => {
        signOut();
      },
      iconPath: "/icons/logout.svg"
    }
  ]

  useEffect(() => {
    let roleNamesStr = localStorage.getItem("roleNames");

    if( roleNamesStr ) {
      const roleNames:roleName[] = JSON.parse(roleNamesStr);
      if( roleNames && roleNames.length > 0) {
        const roleName = roleNames.find(el => el.id == id);
        if( roleName ) setRoleName(roleName.role_name);
      }
    } else {
      axios.get("/api/roles/getRoles").then(resp=>{
        const data:roleName[] = resp.data;
        localStorage.setItem("roleNames",JSON.stringify(data));
        const roleName = data.find(el => el.id == id);
        if( roleName?.role_name ) setRoleName(roleName.role_name)
      })
    }
  },[roleName])
	
  return <div className="flex items-center ml-10 mb-3 min-w-48">
    <Image src="/profile.svg" alt="profileIcon" width={54} height={54} className="text-slate-900 grayscale hover:grayscale-0" />
    <div>
      <h3 className="font-bold ml-2">{session.data?.user.f_name}</h3>
      <div className="text-xs text-gray-500 ml-2 mt-0">{roleName}</div>
    </div>
    <Dropdown options={options}>
      <HiOutlineChevronDown key={1} className="self-start text-gray-700" />
    </Dropdown>
  </div>
}

export default UserSection;