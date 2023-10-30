"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button2 from "@/components/ui/button2";
import "./client-onboard-form.css"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { ChevronsUpDown as CaretSortIcon, CheckIcon, X } from "lucide-react"

// For Radio Group
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  fname: z.string().min(2, "Atleast 2 characters"),
  lname: z.string(),
  contact: z.string(),
  email: z.string().email(),
  org_email: z.string().email(),
  gender: z.string(),
  projects: z.object({ name: z.string(), id: z.number() }).array().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  dob: z.string({
    required_error: "A date of birth is required.",
  }),
  doj: z.string({
    required_error: "Date of Joining is required."
  }),
  dor: z.string(),
  designation: z.string()
})

const OnBoardForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //Keep default values here and also add in FormItem
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    const createUser = async () => {
      const data = await fetch("/api/employees/addEmployee",
        {
          method: "POST",
          body: JSON.stringify(values)
        })
      if(data.status === 201) {
        toast.success("Employee Created!");
      } else if(data.status === 409) {
        toast.error("Employee already exists!");
      } else {
        toast.error("Internal Error!");
      }
    }
    createUser();
  }

  interface Iprojects {
    name: string,
    id: number
  }

  const [projects, setProjects] = useState<Iprojects[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetch("/api/projects/getProjectsList");
      const result = await data.json();
      console.log(result);
      setProjects(result)
    }
    fetchProjects();
  }, [])

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
                name="org_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Org. Email</FormLabel>
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
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
            <div className="frm-div">
              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Projects</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-[200px] justify-between text-gray-500 font-normal"
                          >
                            {"Add Project"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Project..."
                            className="h-9"
                          />
                          <CommandEmpty>No Project found.</CommandEmpty>
                          <CommandGroup>
                            {projects.map((project) => {
                              const projectExist = !!form.getValues("projects")?.find(el => el.id === project.id);
                              return <CommandItem
                                value={project.name}
                                key={project.id}
                                disabled={projectExist}
                                onSelect={() => {
                                  //@ts-expect-error
                                  form.setValue("projects", [...form.getValues("projects"), project])
                                }}
                                className={cn(projectExist ? " text-gray-500" : "")}
                              >
                                {project.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4", projectExist ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            })}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    <FormDescription>
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div>
              {form.watch("projects") && form.watch("projects")?.map(el => {
                return <>
                  <Badge key={el.id} className="mr-1">
                    <X onClick={() => form.setValue("projects", form.getValues("projects")?.filter(val => val.id !== el.id))}
                      className="h-5 w-5 mr-1"
                    />{el.name}
                  </Badge>
                </>
              })}
            </div>
          </div>

          {/* Form Column 2 */}
          <div className="w-1/2">
            <div className="frm-div">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
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
                name="doj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Joining</FormLabel>
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