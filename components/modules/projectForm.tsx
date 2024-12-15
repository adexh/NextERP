"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button2 from "@/components/ui/button2";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FieldContainer
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ReactNode, useEffect, useState } from "react";

import { TextAreaField } from "@/components/form/textArea";
import { InputField } from "@/components/form/inputField";
import { DropDownSearch } from "@/components/form/dropdownSearch";

const formSchema = z.object({
  projectName: z.string().min(2, "Atleast 2 characters"),
  description: z.string(),
  expected_start_date: z.string(),
  expected_end_date: z.string(),
  team_lead: z.number().optional(),
  budget: z.string(),
  actual_cost: z.string(),
  issues: z.string().optional(),
  notes: z.string(),
  client: z.number().optional(),
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

interface ProjectFormProps {
  editable?: boolean;
  projectId?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ editable = false, projectId }) => {

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
    value: string,
    id: number
  }

  interface Iteamleads {
    value: string,
    id: number
  }

  const [ clients, setClients ] = useState<Iclients[]>();
  const [ teamLeads, setTeamLeads ] = useState<Iteamleads[]>();

  useEffect(()=>{
    const setFormData = async ()=>{
      let data = await fetch("/api/clients/getClientsList");
      let result = await data.json();
      setClients(result);
      
      setTeamLeads([{value: "adesh",id:1},{value:"kuber",id:2}]);

      if (editable && projectId) {
        const response = await axios.get(`/api/projects/${projectId}`);
        const projectData = response.data;

        Object.keys(projectData).forEach((key) => {
          if (key in formSchema.shape) {
              const value = ( projectData[key] !== null && projectData[key] !== undefined ) ? projectData[key].toString() : ''
              form.setValue(key as keyof z.infer<typeof formSchema>, value);
          }
        });
      }
    }
    setFormData();
  },[editable, projectId,form])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
      const url = editable? `/api/projects/${projectId}`: '/api/projects/addProject';
      const method = editable? 'PATCH':'POST'

      axios(url,
      {
        method: method,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(values)
      }).then((res)=>
        {
          alert(res.data.message);
        })
      .catch((err)=>{
        if (err.response) {
          alert(err.response.data.message)
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      })
  }

  return <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 ">
          <FieldContainer>
            <InputField
              control={form.control}
              name="projectName"
              label="Project Name"
              placeholder="Sample Project"
              />
          </FieldContainer>
          <FieldContainer>
            <TextAreaField 
              control={form.control}
              name="description"
              label="Desciption"
              placeholder="Details of the project"
            />
          </FieldContainer>
          <FieldContainer>
            <TextAreaField 
              control={form.control}
              name="issues"
              label="Issues"
            />
          </FieldContainer>
          <FieldContainer>
            <TextAreaField
              control={form.control}
              name="notes"
              label="Notes"
            />
          </FieldContainer>

          {/* </div> */}

          {/* Form Column 2 */}
          {/* <div className="w-1/2"> */}
          <FieldContainer>
            <InputField
              control={form.control}
              name="expected_start_date"
              label="Expected Start Date"
              type="date"
              />
          </FieldContainer>
          <FieldContainer>
            <InputField
              control={form.control}
              name="expected_end_date"
              label="Expected End Date"
              type="date"
              />
          </FieldContainer>
          <FieldContainer>
            <InputField
              control={form.control}
              name="budget"
              label="Budget"
              type="number"
              />
          </FieldContainer>
          <FieldContainer>
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
          </FieldContainer>
          <FieldContainer>
            <DropDownSearch 
              control={form.control}
              name="team_lead" 
              label="Team Lead"
              noValueMsg="No Value Found"
              placeholder="Select Team Lead"
              dropdownArray={teamLeads}
              setValue={form.setValue}
            />
          </FieldContainer>
          <FieldContainer>
            <DropDownSearch 
              control={form.control}
              name="client" 
              label="Client"
              noValueMsg="No Client Found."
              placeholder="Select client"
              dropdownArray={clients}
              setValue={form.setValue}
            />
          </FieldContainer>
          {/* 
            // File upload to be added with S3
            <FieldContainer>
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
          <Button2 label={editable?"Update":"Add"} />
        </div>
      </form>
    </Form>
  </>
}
  

export default ProjectForm;