import Image from "next/image"
import {Button} from "./ui/button"

export default function Header() {
  return <>
    <div className="md:h-[70px] h-[50px] shadow-md border-b-2 border-gray-200  w-screen flex justify-between items-center">
      <div className="flex items-center justify-center flex-grow md:flex-grow-0">
        {/* <Image alt="logo" src="/logo.png" width={60} height={0} priority className="md:ml-20" /> */}
        <h2 className=" text-3xl md:ml-10">NextERP</h2>
      </div>
      <div className="mx-5">
        <Button variant={"ghost"} >
          <Image alt="icon" src={"/icons/logout.svg"} width={20} height={20} priority className="mr-2"/>
          Logout</Button>
      </div>
    </div>
  </>
}