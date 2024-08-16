"use client"
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { moduleLoadingState, modulesState, ISubMenu } from "atoms/modules-atom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RefreshCw } from 'lucide-react';
import axios from "axios";

let interval:NodeJS.Timeout;

export default function Settings() {

  const [cards, setCards] = useState<ISubMenu[]>();
  const menus = useRecoilValue(modulesState);
  const menusLoading = useRecoilValue(moduleLoadingState);

  useEffect(() => {
    if (!menusLoading) {
      const cards = menus.findIndex(el => el.module_name == "Settings");
      if (cards != -1) {
        setCards(menus[cards].child_modules)
        console.log(menus[cards].child_modules);
      }
    }
  }, [menus, menusLoading])

  return (
    <div className="grid grid-cols-4 gap-8 m-6 h-56">
      {cards?.map((card) => {
        return <>
          <div className="bg-white shadow rounded-[20px] p-4">
            <div className="font-bold text-2xl text-gray-600">
              {menusLoading ? <div className=" animate-pulse h-8 bg-gray-200 rounded-lg"></div> : card.module_name}
              <div className="w-full bg-gray-200 h-[3px] rounded"></div>
            </div>
            <div>
              {menusLoading ? <>
                {["a", "b"].map(el => {
                  return <div key={el} className=" hover:text-primary-800 flex-grow">
                    <div className=" animate-pulse my-2 h-[40px] bg-gray-200 rounded-[10px] px-2 py-2 flex items-center">
                    </div>
                  </div>
                })}
              </> : <>
                {card.child_modules?.map(el => {
                  return <Link key={el.module_name} href={el.path} className=" hover:text-primary-800">
                    <div className="my-2 bg-gray-100 rounded-[10px] px-2 py-2 flex items-center">
                      <div className="bg-gray-500 h-2 w-2 rounded-[20px] mr-2 border-2 border-gray-800 box-content "></div>
                      {el.module_name}
                    </div>
                  </Link>
                })}
              </>}
              { card.module_name == "Users" && <AuthCode/>}
            </div>
          </div>
        </>
      })}
    </div>
  );
}

const AuthCode = () => {
  const [ authObj, setauthObj ] = useState<{authCode:string, expiresAt:number}>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ expired, setExpired ] = useState<boolean>(false);
  const [ time, setTime ] = useState<number>(0);

  const getAuthCode = () => {
    setLoading(true);
    if( interval ) clearInterval(interval);

    axios.get("/api/auth/authCode").then(res => {
      const { authCode, expiresAt } = res.data;
      const secs = expiresAt - Number(Math.floor(Date.now()/1000))
      setTime(secs);
      setauthObj({ authCode, expiresAt });
      setLoading(false);
      setExpired(false);

      interval = setInterval(()=>{
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setExpired(true);
            return 0;
          }
          return prevTime - 1;
        });
      },1000);
    })
  }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="mt-5 w-fit bg-white h-fit border-gray-400 border-2">
          AuthCode
        </Button>
      </DialogTrigger>
      <DialogContent className="w-1/6">
        <DialogHeader>
          <DialogTitle>Auth Code</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <div className={`text-2xl border-2 border-gray-300 rounded-lg w-fit px-5 ${loading &&'animate-pulse text-gray-500'} ${expired && 'text-red-400'}`}>
            {authObj? authObj.authCode : "..."}
          </div>
          <div className="ml-2">{time}s</div>
          <Button variant={"icon"} disabled={loading} onClick={getAuthCode}><RefreshCw className={`mx-2  ${loading && 'animate-spin '}`}/></Button>
        </div>
      </DialogContent>
    </Dialog>)
}