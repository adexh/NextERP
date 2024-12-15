"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button2 from "@/components/ui/button2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { ChevronsUpDown as CaretSortIcon, CheckIcon, X } from "lucide-react"

import { TextAreaField } from "@/components/form/textArea";
import { RadioButton } from "@/components/form/radioButton";
import { InputField } from "@/components/form/inputField";
import { DropDownSearch } from "@/components/form/dropdownSearch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FieldContainer
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MultiSelect } from "../form/multiSelect";

const formSchema = z.object({
  fname: z.string().min(2, "Atleast 2 characters"),
  lname: z.string(),
  contact: z.string(),
  email: z.string().email(),
  org_email: z.string().email().optional(),
  gender: z.string(),
  projects: z.object({ value: z.string(), id: z.number() }).array().optional(),
  address: z.string(),
  city: z.string().optional(),
  state: z.string(),
  country: z.string(),
  pincode: z.string().optional(),
  dob: z.string({
    required_error: "A date of birth is required.",
  }).optional(),
  doj: z.string({
    required_error: "Date of Joining is required."
  }),
  dor: z.string().optional(),
  designation: z.string()
})

interface EmployeeFormProps {
  editable?: boolean;
  employeeId?: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ editable = false, employeeId }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = editable ? `/api/employees/${employeeId}` : '/api/employees/add-employee';
    const method = editable ? 'PATCH' : 'POST'
    axios(url,
      {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(values)
      }).then((resp) => {
        if (resp.status === 201) {
          toast.success(resp.data.message);
        } else if (resp.status === 409) {
          toast.error("Employee already exists!");
        } else {
          toast.error("Internal Error !");
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Internal Error !");
      })
  }

  interface Iprojects {
    value: string,
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
    const setFormData = async () => {
      if (editable && employeeId) {
        const response = await axios.get(`/api/employees/${employeeId}`);
        const projectData = response.data;

        Object.keys(projectData).forEach((key) => {
          if (key in formSchema.shape) {
            const value = (projectData[key] !== null && projectData[key] !== undefined) ? projectData[key].toString() : ''
            form.setValue(key as keyof z.infer<typeof formSchema>, value);
          }
        });
      }
    }
    setFormData();
    fetchProjects();
  }, [editable, employeeId, form])

  return <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          {/* Form Column 1 */}
          <div className="w-1/2">
            <FieldContainer>
              <InputField
                control={form.control}
                name="fname"
                label="First Name"
                placeholder="John"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="lname"
                label="Last Name"
                placeholder="Doe"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="big.b@xyz.com"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="org_email"
                label="Org. Email"
                placeholder=""
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="contact"
                label="Contact"
                placeholder="+91 987654321"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="dob"
                type="date"
                label="Date of Birth"
              />
            </FieldContainer>
            <FieldContainer>
              <RadioButton
                control={form.control}
                name="gender"
                label="Gender"
                radioButtons={[
                  { label: "Male", value: "M" },
                  { label: "Female", value: "F" }
                ]}
              />
            </FieldContainer>
            {/* <FieldContainer>
              <MultiSelect
                control={form.control}
                name="projects"
                label="Client"
                noValueMsg="No Client Found."
                placeholder="Select client"
                dropdownArray={projects}
                setValue={form.setValue}
                isSelected={form.getValues}
              />
            </FieldContainer> */}
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
                                value={project.value}
                                key={project.id}
                                disabled={projectExist}
                                onSelect={() => {
                                  const arr = form.getValues("projects");
                                  form.setValue("projects", [...(arr ? arr : []), project])
                                }}
                                className={cn(projectExist ? " text-gray-500" : "")}
                              >
                                {project.value}
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
                    />{el.value}
                  </Badge>
                </>
              })}
            </div>
          </div>

          {/* Form Column 2 */}
          <div className="w-1/2">
            <FieldContainer>
              <InputField
                control={form.control}
                name="designation"
                label="Designation"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="address"
                label="Address"
                placeholder="Pratiksha, 10th Road, Juhu Scheme"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="city"
                label="City"
                placeholder="Mumbai"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="state"
                label="State"
                placeholder="Maharashtra"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="country"
                label="Country"
                placeholder="India"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="pincode"
                label="Pincode"
                type="number"
                placeholder="540010"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="doj"
                label="Date of Joining"
                type="date"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="dor"
                label="Date of Resignation"
                type="date"
              />
            </FieldContainer>
          </div>
        </div>
        <div className="flex justify-end mr-8 mt-8 mb-8">
          <Button2 label="Onboard" />
        </div>
      </form>
    </Form>
  </>
}

export default EmployeeForm;