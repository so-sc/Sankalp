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
    accessorKey: "data.name",
    header: "Team name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium">{hackathon.data[0].name}</div>
      )
    },
  },
  {
    accessorKey: "data.member.info.name",
    header: "Leader Name",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.data[0].member.filter(
        (mem) => mem.lead === true
      )[0]
      return (
        <div className="text-left font-medium w-36">{leader.info.name}</div>
      )
    },
  },
  {
    accessorKey: "data.member.info.name",
    header: "Members Name",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-36">
          {hackathon.data[0].member.map((mem, index) => (
            <p key={index}>{mem.info.name}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "data.member.info.email",
    header: "Leader Email",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.data[0].member.filter(
        (mem) => mem.lead === true
      )[0]
      return <div className="text-left font-medium">{leader.info.email}</div>
    },
  },
  {
    accessorKey: "data.member.info.email",
    header: "Members Email",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium">
          {hackathon.data[0].member.map((mem, index) => (
            <p key={index}>{mem.info.email}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "data.themeDesc",
    header: "Theme",
    cell: ({ row }) => {
      const hackathon = row.original
      return (
        <div className="text-left font-medium w-48">
          {hackathon.data[0].themeDesc}
        </div>
      )
    },
  },
  {
    accessorKey: "data.theme",
    header: "Statement",
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
    accessorKey: "data.member.info.PhNo",
    header: "Leader Phone",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.data[0].member.filter(
        (mem) => mem.lead === true
      )[0]
      return (
        <div className="text-left font-medium w-36">{leader.info.PhNo}</div>
      )
    },
  },
  {
    accessorKey: "data.member.info.name",
    header: "College",
    cell: ({ row }) => {
      const hackathon = row.original
      const leader = hackathon.data[0].member.filter(
        (mem) => mem.lead === true
      )[0]
      return (
        <div className="text-left font-medium w-48">{leader.info.college}</div>
      )
    },
  },
]
