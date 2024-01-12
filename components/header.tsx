import Image from "next/image"

export default function Header() {
  return <>
    <div className="md:h-[70px] h-[50px] shadow-md border-b-2 border-gray-200  w-screen flex justify-between items-center">
      <div className="flex items-center justify-center flex-grow md:flex-grow-0">
        <Image alt="logo" src="/logo.png" width={60} height={0} priority className="md:ml-20" />
        <h2 className="font-thin text-3xl md:ml-5">NEXTHRM</h2>
      </div>
    </div>
  </>
}