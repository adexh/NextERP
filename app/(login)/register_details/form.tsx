"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

import axios from "axios";

const formSchema = z.object({
  f_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  l_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  role: z.string()
})

type role = {
  id: number,
  role_name: string,
  active_status:boolean
}


export function ProfileForm() {
  const router = useRouter();
  const [ roles, setRoles ] = useState<role[]>();

  useEffect(()=>{
    axios.get("/api/roles/getRoles").then((resp)=>{
      if( resp.data ){
        setRoles(resp.data.filter((el:role) => el.active_status))
      }
    })
  },[])

  const { data: session, update } = useSession();
  let namePresent = false;

  let defaultValues;
  if(session?.user.f_name && session?.user.l_name) {
    defaultValues = {
      f_name: session?.user?.f_name,
      l_name: session?.user?.l_name
    }
    namePresent = true;
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const body = {...values, email: session?.user.email}
    const updateUser = async () => {
      const data = await fetch("/api/auth/register_details",
      {
        method:"POST",
        body: JSON.stringify(body)
      })
    }
    await updateUser();

    await update({...session, profileComplete:true });

    router.push('/');
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="f_name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel >First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ram" {...field} disabled={namePresent}/>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>

            )}
          />
          <FormField
            control={form.control}
            name="l_name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kumar" {...field} disabled={namePresent}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>

            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles?.map((role)=>{
                      return <SelectItem key={role.id} value={role.role_name}>{role.role_name}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  Select Admin to access all modules
                </FormDescription>
              </FormItem>
            )}
          />
          { (form.getFieldState("role").isDirty && form.watch("role") != "Admin" ) && <FormField
            control={form.control}
            name="l_name"
            render={({ field }) => (
              <>
                <FormItem className="flex items-center">
                  <FormLabel className="mr-2">AuthCode</FormLabel>
                  <FormControl>
                    <Input className="w-20" type="number" placeholder="1234" {...field} disabled={namePresent}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />}
          <div className="flex justify-between">
            <Button type="button" variant={'outline'} onClick={() => signOut()}>Logout</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
