"use client"
import { atom } from "recoil";

export interface ISubMenu {
  module_name: string,
  path: string,
  icon: string,
  display_order: number
}
interface Imenu {
  module: {
    module_name: string,
    child_modules?: ISubMenu[],
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

export const moduleLoadingState = atom({
  key: "modulesLoading",
  default: true
})