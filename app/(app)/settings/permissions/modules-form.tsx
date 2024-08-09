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
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"

type PropTypes = {
  role: any
}

type ModulePermissionType = {
  id: number
  module_name: string
  display_order: number
  has_permission: boolean
  child_modules: ModulePermissionType[]
}

const FormSchema = z.object({
  modules: z.object({
    allowed: z.array(z.number()),
    notAllowed: z.array(z.number())
  })
})

export function ModulesCheckboxForm({ role }: PropTypes) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [modulePermissions, setModulePerm] = useState<ModulePermissionType[]>([])

  useEffect(() => {
    if (role) {
      setLoading(true)
      axios.post("/api/permissions/modules/get", { id: role })
        .then(resp => {
          if (resp.status === 200) {
            const modules = transformModulePermissions(resp.data)
            form.reset({ modules })
            setModulePerm(resp.data)
            setLoading(false)
          }
        })
        .catch(() => {
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
    axios.post("/api/permissions/modules/update", { ...data, roleId: role })
      .then(resp => {
        if (resp.status === 201) {
          toast.success("Changes Saved")
          router.refresh()
        }
      })
      .catch(() => {
        toast.error("Error in updating the permissions")
      })
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ModuleFormFields form={form} modulePermissions={modulePermissions} />
        <FormMessage />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

function LoadingSkeleton() {
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

function ModuleFormFields({ form, modulePermissions }: { form: any, modulePermissions: ModulePermissionType[] }) {
  return (
    <div className="gap-20">
      <FormField
        control={form.control}
        name="modules"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Modules</FormLabel>
              <FormDescription>
                Select the modules the role has access to.
              </FormDescription>
              <div className="flex gap-x-20 text-sm font-bold text-gray-400 mt-4 underline underline-offset-2">
                <div>Main Module</div>
                <div>Module</div>
                <div>Sub Module</div>
              </div>
            </div>
            {modulePermissions.map(item => (
              <ModulePermissionItem key={item.id} form={form} disabled={false} item={item} level={1} />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

function ModulePermissionItem({ form, item, disabled, level }: { form: any, item: ModulePermissionType, disabled: boolean, level: number }) {
  return (
    <FormField
      control={form.control}
      name="modules"
      render={({ field }) => (
        <div className="">
          <FormItem className="flex flex-row space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value.allowed.includes(item.id)}
                disabled={disabled}
                onCheckedChange={checked => handleCheckboxChange(field, item.id, checked)}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal w-28">
              {item.module_name}
            </FormLabel>
            <div className="flex flex-col last:mb-0">
              {item.child_modules && item.child_modules.map(el => (
                <div key={el.id} className={level === 1 ? "mb-6" : ""}>
                  <ModulePermissionItem 
                    form={form}
                    item={el}
                    disabled={disabled || field.value.notAllowed.includes(item.id)}
                    level={level + 1}
                  />
                </div>
              ))}
            </div>
          </FormItem>
        </div>
      )}
    />
  )
}

function handleCheckboxChange(field: any, itemId: number, checked: boolean | string) {
  if (checked) {
    field.onChange({
      notAllowed: field.value.notAllowed.filter((el: number) => el !== itemId),
      allowed: [...field.value.allowed, itemId]
    })
  } else {
    field.onChange({
      allowed: field.value.allowed.filter((el: number) => el !== itemId),
      notAllowed: [...field.value.notAllowed, itemId]
    })
  }
}

function transformModulePermissions(data: ModulePermissionType[]): any {
  const modules = { allowed: [], notAllowed: [] }
  const setAllowedIds = (data: ModulePermissionType[], modules: any) => {
    data.forEach(el => {
      if (el.id) {
        if (el.has_permission) {
          modules.allowed.push(el.id)
        } else {
          modules.notAllowed.push(el.id)
        }
      }
      if (el.child_modules) {
        setAllowedIds(el.child_modules, modules)
      }
    })
  }
  setAllowedIds(data, modules)
  return modules
}
