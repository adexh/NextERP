import * as React from "react"

import { cn } from "@/lib/utils"

const paginate = (array: any[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const renderPageNumbers = (pages: number,setCurrentPage: any, currentPage: number) => {
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

const filterHandler = (e: React.FormEvent<HTMLInputElement>, ind: number, columns: Icolumns[], data: any[], setfilteredData: any) => {
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


const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("h-100 w-full border-separate border-spacing-y-2 border-spacing-x-1", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-b-2 mb-2", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-slate-900 font-medium text-slate-50 dark:bg-slate-50 dark:text-slate-900", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "font-normal text-start text-gray-600 px-4",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("h-10 px-4 ", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  paginate,
  renderPageNumbers,
  filterHandler
}
