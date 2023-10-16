"use client"

import { redirect} from "next/navigation"
import toast from "react-hot-toast"

interface Iprops {
  label: string
  redirects?:string
  onClick?: () => void
}

const Button = ({label,redirects, onClick}:Iprops) => {
  if(redirects){
    onClick = () => {
      toast("Im here " + redirects)
      redirect(redirects,);
    }
  }

  return <>
    <button className="text-white bg-primary-600 px-10 h-10 shadow-md shadow-primary-400 hover:bg-primary-700 active:translate-y-0.5 active:shadow-none rounded-xl" onClick={onClick}>
      {label}
    </button>
  </>
}

export default Button;