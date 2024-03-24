import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import { Suspense } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      Dashboard
      <Image
      src={'/dashboard.jpg'}
      height={100}
      width={100}
      alt="dashboard img">
      </Image>
    </div>
  );
}