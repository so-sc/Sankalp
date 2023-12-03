"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { THEMES } from "@/lib/constants"
import { HackathonAdminApiResult } from "@/lib/types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

interface HackathonTableColumn extends HackathonAdminApiResult {
  id: number
}

export const columns: ColumnDef<HackathonAdminApiResult>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: ({ row }) => {
  //     return <div className="text-left font-medium">{row.index}</div>
  //   },
  // },
  {
    accessorKey: "TmName",
    header: "Team name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-24">{hackathon.TmName}</div>
      )
    },
  },
  {
    accessorKey: "college",
    header: "College",
    cell: ({ row }) => {
      const hackathon = row.original
      return <div className="text-left font-medium">{hackathon.college}</div>
    },
  },
  {
    accessorKey: "theme",
    header: "Theme",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium">
          {THEMES[Number(hackathon.theme)]}
        </div>
      )
    },
  },
  {
    accessorKey: "themeName",
    header: "Statement",
    cell: ({ row }) => {
      const hackathon = row.original
      return <div className="text-left font-medium">{hackathon.themeName}</div>
    },
  },
  {
    accessorKey: "tlName",
    header: "Leader Name",
    cell: ({ row }) => {
      const hackathon = row.original
      return <div className="text-left font-medium">{hackathon.tlName}</div>
    },
  },
  {
    accessorKey: "tlEmail",
    header: "Leader Email",
    cell: ({ row }) => {
      const hackathon = row.original
      return <div className="text-left font-medium">{hackathon.tlEmail}</div>
    },
  },
  {
    accessorKey: "tlPhNo",
    header: "Leader Phone",
    cell: ({ row }) => {
      const hackathon = row.original
      return <div className="text-left font-medium">{hackathon.tlPhNo}</div>
    },
  },
  {
    accessorKey: "member.name",
    header: "Members Name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium">
          {hackathon.member.map((mem, index) => (
            <p key={index}>{mem.name}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "member.email",
    header: "Members Email",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium">
          {hackathon.member.map((mem, index) => (
            <p key={index}>{mem.email}</p>
          ))}
        </div>
      )
    },
  },
]
