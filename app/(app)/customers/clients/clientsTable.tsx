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
  filterHandler
} from "@/components/ui/table"
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
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
    key: "first_name",
    label: "First Name"
  },
  {
    key: "last_name",
    label: "Last Name"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "contact",
    label: "Contact"
  },
  {
    key: "org_name",
    label: "Org. Name"
  }
];

const ClientTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState(data);


  useEffect(() => {
    const fetchTableData = async () => {
      const data = await fetch("/api/clients/getClients");
      let result = await data.json();

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
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
          <TableRow className="mb-2">
            {columns.map((col, index) => (
              <TableHead key={col.key} className="px-3"><input type="text" className="px-1 h-8 w-full border-2 rounded-lg text-black" onInput={e => filterHandler(e, index, columns, data, setfilteredData)} /></TableHead>
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

export default ClientTable;