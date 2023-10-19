"use client"

import { useRouter } from "next/navigation"

interface Iprops {
  label: string
  redirects?:string
}

const Button = ({label,redirects}:Iprops) => {
  const router = useRouter()

  const clickHandler = () => {
    if(redirects){
      router.push(redirects);
      return;
    }
  }

  return <>
    <button className="text-white bg-primary-600 px-10 h-10 shadow-md shadow-primary-400 hover:bg-primary-700 active:translate-y-0.5 active:shadow-none rounded-xl" onClick={clickHandler}>
      {label}
    </button>
  </>
}

export default Button;