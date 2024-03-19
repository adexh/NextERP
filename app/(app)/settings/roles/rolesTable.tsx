"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  paginate,
  renderPageNumbers,
  filterHandler,
  sortHandler
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { useRouter } from 'next/navigation'

const columns: Icolumns[] = [
  {
    key: "id",
    label: "Id"
  },
  {
    key: "role_name",
    label: "Role"
  },
  {
    key: "active_status",
    label: "Active Status"
  }
];

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState(data);

  const router = useRouter();

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await fetch("/api/roles/getRoles");
      let result = await data.json();
      console.log(result);
      setData(result);
      setfilteredData(result);
    }
    fetchTableData();
  }, [])

  const pageSize = 4;
  const pages = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return <>
    <div className="p-6">
      <Table className="border-separate border-spacing-y-2">
        <TableHeader >
          <TableRow>
            {columns.map((col, index) => (
              <TableHead className={col.key == "id" ? "w-20" : ""} key={col.key}>
                <div className="flex align-middle">
                  <span className="mr-2">{col.label}</span>
                  <Button variant={"icon"} size={"icon"} onClick={e => sortHandler(col, data, setfilteredData,"desc")}><Image src="/sort.svg" alt="sort" width={20} height={20}></Image></Button>
                </div>
              </TableHead>
            ))}
          </TableRow>
          <TableRow className="mb-2">
            {columns.map((col, index) => (
              <TableHead key={col.key} className="px-3"><input type="text" className={"px-1 h-8 w-full border-2 rounded-lg text-black"} onInput={e => filterHandler(e, index, columns, data, setfilteredData, "desc")} /></TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-[20px] shadow">
          {paginate(filteredData, pageSize, currentPage).map((row: any) => (
            <TableRow key={row.id} className="odd:bg-gray-100" onClick={() => router.push("users/" + row.id.toString())}>
              {columns.map(col => {
                const value = row[col.key];
                return <>
                  <TableCell key={value}>{value ? value.toString() : "-"}</TableCell>
                </>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <button onClick={handlePrevPage} disabled={currentPage == 1} className="group">
          <ChevronsLeft className="mx-2 group-disabled:text-gray-500" />
        </button>
        {renderPageNumbers(pages, setCurrentPage, currentPage)}
        <button onClick={handleNextPage} disabled={currentPage == pages} className="group">
          <ChevronsRight className="mx-2 group-disabled:text-gray-500" />
        </button>
      </div>
    </div>
  </>
}

export default UserTable;