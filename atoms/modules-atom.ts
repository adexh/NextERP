"use client"
import { atom } from "recoil";

export interface ISubMenu {
  id: number,
  module_name: string,
  path: string,
  icon: string,
  child_modules?: ISubMenu[],
}
interface Imenu {
  id: number,
  module_name: string,
  path: string,
  icon: string,
  child_modules?: ISubMenu[],
}




export const modulesState = atom<Imenu[]>({
  key: "modules",
  default: [{
    id: 0,
    module_name: '',
    child_modules: [],
    path: '',
    icon: ''
  }
  ],
});

export const moduleLoadingState = atom({
  key: "modulesLoading",
  default: true
})