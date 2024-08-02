"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Loading from "@/components/loading"
import { ModulesCheckboxForm } from "./modules-form"

import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import axios from "axios"
import { ActionsCheckboxForm } from "./actions-form"

type roleType = {
  id: string,
  role_name: string,
  active_status: boolean
}

export function RolesDropdown() {

  const [roles, setRoles] = useState<roleType[]>([]);
  const [role, setRole] = useState('');


  useEffect(() => {
    axios.get("/api/roles/getRoles")
      .then((resp) => {
        if (resp.status === 200) {
          setRoles(resp.data);
        }
      })
      .catch(err => {
        toast.error("Error in loading roles");
      })
  }, [])

  if (!roles) {
    return <Loading />
  }

  return (
    <div className="ml-10">
      <div className="my-10">
        <DropdownMenu>
          <label htmlFor="role-btn" className="mr-4 text-lg" >Select Role:</label>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" id="role-btn" className={!role ? "text-gray-600" : ""}>{role ? roles.find(e => e?.id == role)?.role_name : "Select role"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Roles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
              {roles.map(r =>
                r && r.active_status && <DropdownMenuRadioItem value={r.id} key={r.id}>{r.role_name}</DropdownMenuRadioItem>
              )}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      { role && <div className="flex justify-between">
          <ModulesCheckboxForm role={role} />
          <ActionsCheckboxForm role={role} />
          <div/>
        </div>}
    </div>
  )
}