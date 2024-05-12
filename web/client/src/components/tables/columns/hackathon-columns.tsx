"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DatumDatumHackathonAdminApi } from "@/lib/types"

export const hackathonColumns: ColumnDef<DatumDatumHackathonAdminApi>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "name",
    header: "Team name",
    cell: ({ row }) => {
      const hackathon = row.original
      return <div className="text-left font-medium">{hackathon.name}</div>
    },
  },
  {
    accessorKey: "member.info.name",
    header: "Leader Name",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.member.filter((mem) => mem.lead === true)[0]
      return (
        <div className="text-left font-medium w-36">{leader.info.name}</div>
      )
    },
  },
  {
    accessorKey: "member.info.name",
    header: "Members Name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-36">
          {hackathon.member.map((mem, index) => (
            <p key={index}>{mem.info.name}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "member.info.email",
    header: "Leader Email",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.member.filter((mem) => mem.lead === true)[0]
      return <div className="text-left font-medium">{leader.info.email}</div>
    },
  },
  {
    accessorKey: "member.info.email",
    header: "Members Email",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium">
          {hackathon.member.map((mem, index) => (
            <p key={index}>{mem.info.email}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "themeDesc",
    header: "Theme",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-48">{hackathon.themeDesc}</div>
      )
    },
  },
  // {
  //   accessorKey: "theme",
  //   header: "Statement",
  //   cell: ({ row }) => {
  //     const hackathon = row.original
  //     return (
  //       <div className="text-left font-medium">
  //         {THEMES[Number(hackathon.theme)]}
  //       </div>
  //     )
  //   },
  // },

  {
    accessorKey: "member.info.PhNo",
    header: "Leader Phone",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.member.filter((mem) => mem.lead === true)[0]
      return (
        <div className="text-left font-medium w-36">{leader.info.PhNo}</div>
      )
    },
  },
  {
    accessorKey: "member.info.name",
    header: "College",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.member.filter((mem) => mem.lead === true)[0]
      return (
        <div className="text-left font-medium w-48">{leader.info.college}</div>
      )
    },
  },
]
