import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  searchItem: string
  placeholder: string
}

export default function Filter<TData>({
  table,
  searchItem,
  placeholder,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={placeholder}
        value={
          (table.getColumn(`${searchItem}`)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn(`${searchItem}`)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  )
}
