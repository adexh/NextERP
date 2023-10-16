"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Icolumns {
  key: string,
  label: string
}

interface Props {
  columns: Icolumns[],
  data: any[];
  pageSize: number;
}

const ReusableTable: React.FC<Props> = ({ columns, data, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = pageSize

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
    for (let i = 1; i <= totalPages; i++) {
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

  return (
    <div className=" rounded-[20px] p-6">
      <table className="h-100 w-full">
        <thead className="border-b-2 mb-2">
          <tr>
            {columns.map((col, index) => (
              <th key={col.key} className="font-normal text-start text-gray-400 px-4">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="shadow rounded-[20px]">
          {data.map((row, index1) => (
            <tr key={index1} className={(index1 % 2 == 0 ? ' bg-gray-100' : '')}>
              {columns.map((col, index) => {
                const value = row[col.key];
                return <>
                  {(typeof value === 'boolean') ?
                    < td key={index} className={"h-10 px-4 " + (value ? ' text-green-600' : 'text-red-400')} > <div className={"w-14 pl-3 rounded-[30px] "+(value?"bg-green-100 ":"bg-red-100 ")}>{value ? 'True' : 'False'}</div></td> :
                    < td key={index} className={"h-10 px-4 "} > {value} </td>
                  }
                </>
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};

export default ReusableTable;
