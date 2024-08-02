"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import Loading from "@/components/loading"

import toast from "react-hot-toast"

import { useRouter } from "next/navigation";

import axios from "axios";
import { useEffect, useState } from "react";

type PropTypes = {
  role: any
}

type modulePermissionType = {
  "id": number,
  "module_name": string,
  "display_order": number,
  "has_permission": false,
  "child_modules": modulePermissionType[]
}

const FormSchema = z.object({
  modules:  z.object({
    allowed: z.array(z.number()),
    notAllowed: z.array(z.number()) 
  })
})

export function ModulesCheckboxForm({ role }: PropTypes) {
  const router = useRouter();
  const [ loading, setLoading ] = useState(true);
  const [modulePermissions, setModulePerm] = useState<modulePermissionType[]>([]);

  useEffect(() => {
    if( !!role ) {
      setLoading(true);
      axios.post("/api/permissions/modules/get",
        {
          id: role
        }
      )
        .then(resp => {
          if (resp.status === 200) {
            setModulePerm(resp.data);
  
            const setAllowedIds = (data: modulePermissionType[], modules: any) => {
              data.forEach(el => {
                if (!!el?.id) {
                  if (el.has_permission)
                    modules.allowed.push(el.id)
                  else
                    modules.notAllowed.push(el.id);
                }
                if (!!el?.child_modules) {
                  setAllowedIds(el.child_modules, modules);
                }
              })
            }
  
            let modules: any = { allowed: [], notAllowed: [] };
  
            setAllowedIds(resp.data, modules);
  
            form.reset({ modules: modules })
            setLoading(false);
          }
        })
        .catch(err => {
          toast.error("Error in loading permissions")
        })
    }
  }, [role])


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      modules: {
        allowed: [],
        notAllowed: []
      }
    }
  })


  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios.post("/api/permissions/modules/update", {
      ...data,
      roleId: role
    }).then(resp => {
      if (resp.status === 201) {
        toast.success("Changes Saved with data");
        router.refresh();
      }
    }).catch(err => {
      toast.error("Error in updating the permissions");
    })
  }

  if( loading ) {
    return <Loading />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-20" >
          <div>
            <FormField
              control={form.control}
              name="modules"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Modules</FormLabel>
                    <FormDescription>
                      Select the modules the role have access to.
                    </FormDescription>
                    <div className="grid grid-cols-3 text-sm font-bold text-gray-400 mt-4 underline underline-offset-2">
                      <div>Main Module</div>
                      <div>Module</div>
                      <div>Sub Module</div>
                    </div>
                  </div>
                  {modulePermissions.map((item) => (
                    item && <div key={item.id} className="py-2 border-b-2 border-solid"><FormFieldForForm disabled={false} form={form} item={item} level={1} /></div>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormMessage />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

function FormFieldForForm({ form, item, disabled, level }: { form: any, item: modulePermissionType, disabled: boolean, level: number }) {
  return (
    <FormField
      key={item?.id}
      control={form.control}
      name="modules"
      render={({ field }) => {
        return (
          <div className="">
            <FormItem
              key={item?.id}
              className="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  checked={field.value.allowed.includes(item.id)}
                  disabled={disabled}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      return field.onChange({
                        notAllowed: field.value.notAllowed.filter((el: number) => el != item.id),
                        allowed: [...field.value.allowed, item.id]
                      })
                    } else {
                      return field.onChange({
                        allowed: field.value.allowed.filter((el: number) => el != item.id),
                        notAllowed: [...field.value.notAllowed, item.id]
                      })
                    }
                  }}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal w-28">
                {item?.module_name}
              </FormLabel>
              <div className="flex flex-col last:mb-0">
                {!!item.child_modules && item.child_modules.map(el => <div key={el.id} className={level == 1 ? "mb-6" : ""}><FormFieldForForm disabled={disabled || field.value.notAllowed.includes(item.id)} form={form} item={el} level={level + 1} /></div>)}
              </div>
            </FormItem>
          </div>
        )
      }}
    />
  )
}