"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@/components/ui/button2";
import "./user-onboard-form.css"

// For Radio Group
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";

const formSchema = z.object({
  fname: z.string().min(2, "Atleast 2 characters"),
  lname: z.string(),
  contact: z.string(),
  email: z.string().email(),
  password: z.string(),
  cnfmPassword: z.string(),
  role: z.number()
}).refine(data=>data.password === data.cnfmPassword,{message:"Passwords Do not match !",path:["cnfmPassword"]})

const OnBoardForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //Keep default values here and also add in FormItem
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    const createUser = async () => {
      const data = await fetch("/api/users/addUser",
      {
        method:"POST",
        body: JSON.stringify(values)
      })
    }
    createUser();
  }

  interface Role {
    id: string,
    role_name: string
  }

  const [ roles, setRoles ] = useState<Role[]>([]);

  useEffect(()=>{
    const getRoles = async () => {
      const data = await fetch("/api/roles/getRoles");
      const result = await data.json();
      console.log(result);
      setRoles(result)
    }
    getRoles();
  },[])

  return <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          {/* Form Column 1 */}
          <div className="w-1/2">
            <div className="frm-div">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="555-555-5555" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex my-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Select Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex space-x-6"
                      >
                        {roles.map((el) => {
                          return <>
                            <FormItem className="space-x-1">
                              <FormControl>
                                <RadioGroupItem value={el.id}/>
                              </FormControl>
                              <FormLabel className="font-normal">
                                {el.role_name}
                              </FormLabel>
                            </FormItem>
                          </>
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Column 2 */}
          <div className="w-1/2">
            <div className="frm-div">
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="John@xyz.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="cnfmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="h-[64px]"></div>
            <div className="flex justify-end mr-8 mt-8">
              <Button label="Onboard" />
            </div>
          </div>
        </div>
      </form>
    </Form>
  </>
}

export default OnBoardForm;