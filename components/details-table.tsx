import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DetailsTableProps<T extends object> {
  title: string
  rows: { key: keyof T; label: string }[];
  dataObject: T;
}

export default function DetailsTable<T extends object>({ title, rows, dataObject }: DetailsTableProps<T>): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody className="rounded-[20px] shadow">
            {rows.map(({ key, label }) => (
              <TableRow key={String(key)} className="odd:bg-gray-100">
                <TableCell className="w-1/4 font-semibold" >
                  {label}
                </TableCell>
                <TableCell >
                  { String(dataObject[key]) }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}