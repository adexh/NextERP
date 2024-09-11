"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IColumn {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: IColumn[];
  fetchData: () => Promise<any>;
  pageSize?: number;
}

const DataTable = ({ columns, fetchData, pageSize = 4 }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data = await fetchData();
        if (data.status !== 200) {
          if (data.status === 401) {
            setAuth(false);
            toast.error("Unauthorized Access!");
          } else {
            toast.error("Internal Error!");
          }
        } else {
          let result = await data.json();
          setData(result);
          setFilteredData(result);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
      setLoading(false);
    };
    fetchTableData();
  }, [fetchData]);

  const pages = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filterHandler = (e: any, index: number) => {
    const filterValue = e.target.value.toLowerCase();
    const filtered = data.filter((row) => 
      row[columns[index].key].toString().toLowerCase().includes(filterValue)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
          <TableRow className="mb-2">
            {columns.map((col, index) => (
              <TableHead key={col.key} className="px-3">
                <input
                  type="text"
                  className="px-1 h-8 w-full border-2 rounded-lg text-black"
                  onInput={(e) => filterHandler(e, index)}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-[20px] shadow">
          {paginate(filteredData, pageSize, currentPage).map((row: any) => (
            <TableRow key={row.id} className="odd:bg-gray-100">
              {columns.map((col) => {
                const value = row[col.key];
                return (
                  <TableCell key={col.key}>
                    {value !== null ? value.toString() : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!auth && (
        <div className="flex justify-center text-xl mt-5 text-red-500">
          Unauthorized Access!
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="flex justify-center text-xl mt-5 text-slate-400 italic">
          No Data
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <Image src="/icons/chev-l.svg" alt="chev-left" width={20} height={10} className="mx-2" />
        </button>
        {renderPageNumbers(pages, setCurrentPage, currentPage)}
        <button onClick={handleNextPage} disabled={currentPage === pages}>
          <Image src="/icons/chev-r.svg" alt="chev-left" width={20} height={10} className="mx-2" />
        </button>
      </div>
    </div>
  );
};

// Helper function to paginate data
const paginate = (array: any[], pageSize: number, pageNumber: number) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

// Helper function to render page numbers
const renderPageNumbers = (pages: number, setCurrentPage: (page: number) => void, currentPage: number) => {
  return (
    <>
      {Array.from({ length: pages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`mx-1 ${index + 1 === currentPage ? "text-blue-500" : ""}`}
        >
          {index + 1}
        </button>
      ))}
    </>
  );
};

export default DataTable;