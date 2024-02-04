"use client"
import { useSession, signOut} from "next-auth/react";
import Dropdown from "../ui/dropdown";

import { HiOutlineChevronDown } from "react-icons/hi2";
import Image from "next/image";

const UserSection = () => {
  const session = useSession();

  interface Option {
    label: string
    onClickHandle: () => void
    iconPath: string
  }

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

  return <div className="flex items-center ml-10 mb-3">
    <Image src="/profile.svg" alt="profileIcon" width={54} height={54} className="text-slate-900" />
    <div>
      <h3 className="font-bold ml-2">{session.data?.user.f_name}</h3>
      <div className="text-xs text-gray-500 ml-2 mt-0">Full Stack Developer</div>
    </div>
    <Dropdown options={options}>
      <HiOutlineChevronDown key={1} className="self-start text-gray-700" />
    </Dropdown>
  </div>
}

export default UserSection;