"use client"

import toast from "react-hot-toast";
import Button from "./button";

const handler = ()=>{
  toast.success("Yay!")
}

const ButtonWrapper = () => {
  return <>
    <Button label="Add" onClick={handler} />
  </>
}

export default ButtonWrapper;