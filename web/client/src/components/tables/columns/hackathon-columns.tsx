"use client"

import { ColumnDef } from "@tanstack/react-table"

import { THEMES } from "@/lib/constants"
import { HackathonAdminApiResult } from "@/lib/types"

export const hackathonColumns: ColumnDef<HackathonAdminApiResult>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "TmName",
    header: "Team name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-36">{hackathon.TmName}</div>
      )
    },
  },
  {
    accessorKey: "tlName",
    header: "Leader Name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-36">{hackathon.tlName}</div>
      )
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
    accessorKey: "member.name",
    header: "Members Name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-36">
          {hackathon.member.map((mem, index) => (
            <p key={index}>{mem.name}</p>
          ))}
        </div>
      )
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
      return (
        <div className="text-left font-medium w-48">{hackathon.themeName}</div>
      )
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
  {
    accessorKey: "college",
    header: "College",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-48">{hackathon.college}</div>
      )
    },
  },
]
