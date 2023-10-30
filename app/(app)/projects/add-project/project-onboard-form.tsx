"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button2 from "@/components/ui/button2";
import { Button } from "@/components/ui/button";
import "./client-onboard-form.css"
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils"

// For Radio Group
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

import { CheckIcon, ChevronsUpDown } from "lucide-react";

const formSchema = z.object({
  projectName: z.string().min(2, "Atleast 2 characters"),
  description: z.string(),
  expected_start_date: z.string(),
  expected_end_date: z.string(),
  team_lead: z.number(),
  budget: z.string(),
  actual_cost: z.string(),
  issues: z.string(),
  notes: z.string(),
  client: z.number(),
  // documents: z
  // .array(z.custom<FileList>())
  // .refine(
  //   (files) => {
  //     // Check if all items in the array are instances of the File object
  //     for(const file of files){
  //       if(!(file instanceof File)){
  //         return false;
  //       }
  //     }
  //   },
  //   {
  //     // If the refinement fails, throw an error with this message
  //     message: 'Expected a file',
  //   },
  // )
  // .refine(
  //   (files) =>{
  //     for(let i = 0; i < files.length; i++){
  //       if(files[i])
  //       files.every((file) => file.size <= 2048)
  //     }
  //   },
  //   `File size should be less than 2mb.`,
  // )
  // .refine(
  //   (files) => files.every((file) => [".pdf",".txt",".jpg",".jpeg",".png",".webp"].includes(file.type)),
  //   'Only these types are allowed .pdf .txt .jpg, .jpeg, .png and .webp',
  // ),
})

const OnBoardForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //Keep default values here and also add in FormItem
      projectName: ""
    },
  })

  //Add AWS S3 upload
  // function fileHandler(e: React.FormEvent<HTMLInputElement>) {
  //   const fileList = e.currentTarget.files;
  //   if(fileList){
  //     let files = [];
  //     for(let i = 0;  i< fileList.length; i++){
  //       files.push(fileList[i]);
  //     }
  //     form.setValue("documents",files);
  //   }
  // }

  interface Iclients {
    name: string,
    id: number
  }

  interface Iteamleads {
    name: string,
    id: number
  }

  const [ clients, setClients ] = useState<Iclients[]>();
  const [ teamLeads, setTeamLeads ] = useState<Iteamleads[]>();

  useEffect(()=>{
    const setFormData = async ()=>{
      let data = await fetch("/api/clients/getClientsList");
      let result = await data.json();
      setClients(result);
      // data = await fetch("");
      // result = await data.json();
      setTeamLeads([{name: "adesh",id:1},{name:"kuber",id:2}]);
    }
    setFormData();
  },[])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const createProject = async () => {
      const data = await fetch("/api/projects/addProject",
        {
          method: "POST",
          body: JSON.stringify(values)
        })
    }
    createProject();
  }
  return <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 ">
          <div className="frm-div">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Sample Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="frm-div">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desciption</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Details of the project"
                      className="resize-y w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="frm-div">
            <FormField
              control={form.control}
              name="issues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issues</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-y w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="frm-div">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-y w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* </div> */}

          {/* Form Column 2 */}
          {/* <div className="w-1/2"> */}
          <div className="frm-div">
            <FormField
              control={form.control}
              name="expected_start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Start Date</FormLabel>
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
              name="expected_end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected End Date</FormLabel>
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
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="frm-div">
            <FormField
              control={form.control}
              name="actual_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actual Cost</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="frm-div">
            <FormField
              control={form.control}
              name="team_lead"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Team Lead</FormLabel>
                  <div className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between font-normal",
                              !field.value && "text-gray-500"
                            )}
                          >
                            {field.value
                              ? teamLeads?.find(
                                (lead) => lead.id === field.value
                              )?.name
                              : "Select client"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search client..."
                            className="h-9"
                          />
                          <CommandEmpty>No Client found.</CommandEmpty>
                          <CommandGroup>
                            {teamLeads?.map((lead) => (
                              <CommandItem
                                value={lead.name}
                                key={lead.id}
                                onSelect={() => {
                                  form.setValue("team_lead", lead.id)
                                }}
                              >
                                {lead.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    lead.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="frm-div">
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Client</FormLabel>
                  <div className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between font-normal",
                              !field.value && "text-gray-500 font-normal"
                            )}
                          >
                            {field.value
                              ? clients?.find(
                                (client) => client.id === field.value
                              )?.name
                              : "Select client"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search client..."
                            className="h-9"
                          />
                          <CommandEmpty>No Client found.</CommandEmpty>
                          <CommandGroup>
                            {clients?.map((client) => (
                              <CommandItem
                                value={client.name}
                                key={client.id}
                                onSelect={() => {
                                  form.setValue("client", client.id)
                                }}
                              >
                                {client.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    client.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* 
            // File upload to be added with S3
            <div className="frm-div">
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documents</FormLabel>
                    <FormControl>
                      <Input type="file" multiple {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
        </div>
        {/* </div> */}
        <div className="flex justify-end mr-8 mt-8">
          <Button2 label="Onboard" />
        </div>
      </form>
    </Form>
  </>
}

export default OnBoardForm;