import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export default function HackathonTeamFilter<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search Team..."
        value={(table.getColumn("TmName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("TmName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  )
}
