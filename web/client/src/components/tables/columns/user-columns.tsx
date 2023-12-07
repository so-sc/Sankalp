"use client"

import { ColumnDef } from "@tanstack/react-table"

import { EVENTS_DETAILS, genders } from "@/lib/constants"
import { HackathonAdminApiResponse, UserAdminAPIResult } from "@/lib/types"
import { capitalize } from "@/lib/utils"

export const userColumns: ColumnDef<UserAdminAPIResult>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>
    },
  },
  {
    accessorKey: "stName",
    header: "Name",
    cell: ({ row }) => {
      const student = row.original
      return <div className="text-left font-medium w-36">{student.stName}</div>
    },
  },
  {
    accessorKey: "mail",
    header: "Email",
    cell: ({ row }) => {
      const student = row.original
      return <div className="text-left font-medium">{student.mail}</div>
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      const student = row.original
      return <div className="text-left font-medium">{student.year}</div>
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="text-left font-medium">
          {capitalize(genders[student.gender - 1])}
        </div>
      )
    },
  },
  {
    accessorKey: "hack",
    header: "Hackathon",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="text-left font-medium">
          {student.hack.isHack ? "Yes" : "No"}
        </div>
      )
    },
  },
  {
    accessorKey: "eventOpt",
    header: "Registered Events",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="text-left font-medium w-36">
          {student.eventOpt.map((event, index) => (
            <p key={index}>{EVENTS_DETAILS[event - 1].name}</p>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const student = row.original
      return <div className="text-left font-medium">{student.branch}</div>
    },
  },
  {
    accessorKey: "college",
    header: "College",
    cell: ({ row }) => {
      const student = row.original
      return <div className="text-left font-medium w-48">{student.college}</div>
    },
  },
]
