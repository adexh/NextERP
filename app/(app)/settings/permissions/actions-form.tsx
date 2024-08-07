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

import { Skeleton } from "@/components/ui/skeleton"

import toast from "react-hot-toast"

import { useRouter } from "next/navigation";

import axios from "axios";
import { useEffect, useState } from "react";

type PropTypes = {
  role: any
}

type actionsType = {
  "id": number,
  "action_name": string,
  "value": false
}

type actionsGroupType = {
  "group_name": string,
  "actions": actionsType[]
}

const FormSchema = z.object({
  modules: z.object({
    allowed: z.array(z.number()),
    notAllowed: z.array(z.number())
  })
})

export function ActionsCheckboxForm({ role }: PropTypes) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState<actionsGroupType[]>([]);

  useEffect(() => {
    
    if ( role ) {
      setLoading(true);
      axios.post("/api/permissions/actions/get",
        {
          id: role
        }
      )
        .then(resp => {
          if (resp.status === 200) {
            setActions(resp.data);

            const setAllowedIds = (data: actionsGroupType[], modules: any) => {
              data.forEach(el => {
                el.actions.forEach( action  => {
                  if( action.value ) {
                    modules.allowed.push(action.id);
                  } else {
                    modules.notAllowed.push(action.id);
                  }
                })
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
    axios.post("/api/permissions/actions/update", {
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

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
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
                    <FormLabel className="text-base">Actions</FormLabel>
                    <FormDescription>
                      Select the actions the role have access to.
                    </FormDescription>
                  </div>
                  {actions.map((item) => (
                    item && <div key={item.group_name} className="py-1  border-b-2 border-solid"><span className="underline underline-offset-2">{item.group_name}</span>
                      <FormFieldForForm disabled={false} form={form} actions={item.actions} /></div>
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

function FormFieldForForm({ form, actions, disabled }: { form: any, actions: actionsType[], disabled: boolean }) {
  return (
    <div className="py-4 ml-4 grid grid-cols-3">
      {actions.map(item => (
      <FormField
        key={item?.id}
        control={form.control}
        name="modules"
        render={({ field }) => {
          return (
            <div className="">
              <FormItem
                key={item?.id}
                className="flex items-start space-x-3 space-y-0"
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
                  {item?.action_name}
                </FormLabel>
              </FormItem>
            </div>
          )
        }}
      />
    ))}
    </div>
  )
}


