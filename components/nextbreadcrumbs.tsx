'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NextBreadcrumb = () => {
    const separator = '>';
    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    const containerClasses = 'flex';
    const listClasses = "text-gray-500 hover:text-black";
    const activeClasses = "text-blue-800 hover:text-blue-800";

    return (
        <div>
            <ul className={containerClasses}>
            {
                pathNames.map( (link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                    let itemLink = link[0].toUpperCase() + link.slice(1, link.length)
                    return (
                        <React.Fragment key={index}>
                            {/* <li className={itemClasses}> */}
                            <li className={itemClasses}>
                              {paths === href ? <>{itemLink}</> : <Link href={href}>{itemLink}</Link>}
                            </li>
                            <span className='mx-2'>{pathNames.length !== index + 1 && separator}</span>
                        </React.Fragment>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default NextBreadcrumb;