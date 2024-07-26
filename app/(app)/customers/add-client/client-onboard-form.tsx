"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button2 from "@/components/ui/button2";
import "./client-onboard-form.css"
import axios from "axios";

// For Radio Group
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";

const formSchema = z.object({
  fname: z.string().min(2, "Atleast 2 characters"),
  lname: z.string(),
  contact: z.string(),
  email: z.string().email().optional(),
  org_name: z.string().optional(),
  gender: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  dob: z.string({
    required_error: "A date of birth is required.",
  }).optional()
})

const OnBoardForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //Keep default values here and also add in FormItem
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios("/api/clients/addClient",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(values)
      }).then((resp) => {
        if (resp.status === 201) {
          toast.success("Client Added");
        } else {
          toast.error("Internal Error !");
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Internal Error !");
      })
  }

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
                      <Input placeholder="Amitabh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bacchan" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="big.b@xyz.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="org_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Org. Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Ltd. Co." {...field} />
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
                      <Input placeholder="+91 987654321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex space-x-6"
                      >
                        <FormItem className="space-x-1">
                          <FormControl>
                            <RadioGroupItem value="m" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="space-x-1">
                          <FormControl>
                            <RadioGroupItem value="f" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Female
                          </FormLabel>
                        </FormItem>
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Pratiksha, 10th Road, Juhu Scheme" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="540010" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="frm-div">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type={"date"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-8 mt-8 mb-8">
          <Button2 label="Onboard" />
        </div>
      </form>
    </Form>
  </>
}

export default OnBoardForm;