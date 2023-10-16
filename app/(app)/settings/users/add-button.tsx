"use client"

import Button from "@/components/ui/button";
import { redirect } from "next/navigation";

const handler = ()=>{
    redirect('/settings/users');
}

const Addbutton = () => {
  return <>
    <Button label="Add" onClick={handler} />
  </>
}

export default Addbutton;