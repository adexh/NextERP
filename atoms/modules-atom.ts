"use client"
import { atom } from "recoil";

interface Imenu {
  module: {
    module_name: string,
    child_modules?: Imenu[],
    path: string,
    icon: string,
    display_order: number
  }
}


export const modulesState = atom<Imenu[]>({
  key: "modules",
  default: [
    {
      module: {
        module_name: '',
        child_modules: [],
        path: '',
        icon: '',
        display_order: 0
      }
    }
  ],
});