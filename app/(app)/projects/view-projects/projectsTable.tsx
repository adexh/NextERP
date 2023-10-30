"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { useEffect, useState } from "react";

interface Icolumns {
  key: string
  label: string
}

const columns: Icolumns[] = [
  {
    key: "id",
    label: "Id"
  },
  {
    key: "name",
    label: "Project Name"
  },
  {
    key: "description",
    label: "Description"
  },
  {
    key: "start_date",
    label: "Start Date"
  },
  {
    key: "completion_status",
    label: "Completion Status"
  },
  {
    key: "status",
    label: "Project Status"
  }
];

const ClientTable = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ data, setData ] = useState([]);

  useEffect(()=>{
    const fetchTableData = async () => {
      const data = await fetch("/api/projects/getProjects");
      let result = await data.json();
      console.log(result);
      
      setData(result);
    }
    fetchTableData();
  },[])

  const pageSize = 3;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageSize; i++) {
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

  return <>
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-[20px] shadow">
          {data.map((row: any) => (
            <TableRow key={row.id} className="odd:bg-gray-100">
              {columns.map(col => {
                const value = row[col.key];
                if(value === null){
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
        <button onClick={handlePrevPage}>
          <Image src="/icons/chev-l.svg" alt="chev-left" width={20} height={10} className="mx-2" />
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage}>
          <Image src="/icons/chev-r.svg" alt="chev-left" width={20} height={10} className="mx-2" />
        </button>
      </div>
    </div>
  </>
}

export default ClientTable;