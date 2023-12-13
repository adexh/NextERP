import React, { useState, ReactNode, Fragment, useEffect, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { HiLogout } from "react-icons/hi";
import Image from 'next/image';


interface Option {
  label: string
  onClickHandle: () => void
  iconPath: string
}

interface DropdownProps {
  children: ReactNode
  options: Option[]
}

const Dropdown: React.FC<DropdownProps> = ({ children, options }) => {
  return (
    <div className="text-right self-start mt-2 px-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            {React.Children.map(children, child =>
              React.cloneElement(child as React.ReactElement<any>)
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              {options.map((element: Option, index: number) => {
                return <div key={element.label}>
                  <Menu.Item >
                    <button
                      className={'hover:bg-primary-200  text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm'}
                      onClick={element.onClickHandle}
                    >
                      <Image alt="icon" src={element.iconPath} width={20} height={20} priority className="mr-4"/>
                      {element.label}
                    </button>
                  </Menu.Item>
                </div>
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown;