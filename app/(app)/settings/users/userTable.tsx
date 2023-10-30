"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  paginate
} from "@/components/ui/table"
import Image from 'next/image';
import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface Icolumns {
  key: string
  label: string,
  filterValue?: string
}

const columns: Icolumns[] = [
  {
    key: "id",
    label: "Id"
  },
  {
    key: "f_name",
    label: "Name"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "username",
    label: "Username"
  },
  {
    key: "contact",
    label: "Contact"
  },
  {
    key: "active_status",
    label: "Active Status"
  },
  {
    key: "role",
    label: "Role"
  }
];

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState(data);

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await fetch("/api/users/getUsers");
      let result = await data.json();

      result.forEach((el: any) => {
        el.role = el.role.role_name;
      })
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

  const prevDisabled = () => {
    return currentPage == 1;
  }

  const nextDisabled = () => {
    return currentPage == pages;
  }

  const renderPageNumbers = () => {
    let pageNumbers: any[] = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{ cursor: 'pointer', margin: '0 5px', textDecoration: i === currentPage ? 'underline' : 'none' }}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  const filterHandler = (e: React.FormEvent<HTMLInputElement>, ind: number) => {
    let currVal = e.currentTarget.value.toString().toLowerCase();
    columns[ind].filterValue = currVal;

    setfilteredData(data.filter(el => {
      let cellData = el[columns[ind].key] as string
      cellData = cellData?.toString().toLowerCase();

      return columns.every((col,index)=>{
        let filterVal = col.filterValue;

        if(filterVal && filterVal !== ""){
          let currCellData = el[col.key] as string;
          currCellData = currCellData?.toString().toLowerCase();
          return index == ind ? cellData?.startsWith(currVal) : currCellData.startsWith(filterVal);

        } else {
          return true;
        }
      })
    }))
  }

  return <>
    <div className="p-6">
      <Table className="border-separate border-spacing-y-2">
        <TableHeader >
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
          <TableRow className="mb-2">
            {columns.map((col, index) => (
              <TableHead key={col.key} className="px-3"><input type="text" className="px-1 h-8 w-full border-2 rounded-lg text-black" onInput={e => filterHandler(e, index)} /></TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-[20px] shadow">
          {paginate(filteredData, pageSize, currentPage).map((row: any) => (
            <TableRow key={row.id} className="odd:bg-gray-100">
              {columns.map(col => {
                const value = row[col.key];
                if (value === null) {
                  return <>
                    <TableCell key={value}>-</TableCell>
                  </>
                }
                return <>
                  <TableCell key={value}>{value?.toString()}</TableCell>
                </>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <button onClick={handlePrevPage} disabled={prevDisabled()} className="group">
          <ChevronsLeft className="mx-2 group-disabled:text-gray-500" />
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage} disabled={nextDisabled()} className="group">
          <ChevronsRight className="mx-2 group-disabled:text-gray-500" />
        </button>
      </div>
    </div>
  </>
}

export default UserTable;