import { hackathonColumns } from "@/components/tables/columns/hackathon-columns"
import DataTable from "@/components/tables/data-table"
import { H1 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { HackathonAdminApiResponse } from "@/lib/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function isAdminLoggedIn() {
  const nextCookie = cookies()
  const token = nextCookie.get("admin-token")?.value

  if (!token) {
    redirect("/admin/login")
  }

  const isTokenValidRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token-checker`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const isTokenValid = await isTokenValidRes.json()
  if (!isTokenValid.success) {
    redirect("/admin/login")
  }
}

export async function getHackathonData() {
  const nextCookie = cookies()
  const token = nextCookie.get("admin-token")?.value

  if (!token) {
    redirect("/admin/login")
  }

  const hackathonRes = await fetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-hackathons`,
    `https://sankalp-api.sosc.org.in/api/admin/get-hackathons`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUyRnNkR1ZrWDErYzR2aWVzY1JuR0hPTGRaM3c2SEtkRWN1eEVabWkwK1U3QXdGcng4YUsrcnhwRFlnT3BKM0siLCJpYXQiOjE3MDE5MDk5MjcsImV4cCI6MTcwMTk5NjMyN30.vjMRqmVcaGtGDz-WJv7HMpbt60i-ioJt0hAFoo7QGgQ`,
      },
    }
  )

  const hackathonData = await hackathonRes.json()

  console.log(hackathonData)

  if (!hackathonData.success) {
    redirect("/admin/login")
  }

  return hackathonData
}

interface HackathonData {
  TmName: string
  college: string
  theme: string
  themeName: string
  tlName: string
  tlEmail: string
  tlYear: number
  tlPhNo: number
  memNo: number
  member: {
    name: string
    email: string
    year: string
    _id: string
  }[]
  verify: boolean
  createdAt: Date | string
  updatedAt: Date | string
  __v: number
}

export default async function HackathonTeamsPage() {
  // await isAdminLoggedIn()
  const rawData: HackathonAdminApiResponse = await getHackathonData()
  console.log(rawData.result.data)

  // const data: HackathonData = {
  //   TmName: rawData.result.data.map,
  // }

  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-10 md:py-24 flex flex-col justify-center">
      <div>
        <H1>Hackathon Teams for {MAIN_EVENT_NAME}</H1>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight">
        Company Specific
      </p>
      <DataTable
        columns={hackathonColumns}
        data={rawData.result.data[0].data}
        purpose="hackathon"
      />
      <p className="mt-4 text-2xl font-semibold tracking-tight">Open Theme</p>
      <DataTable
        columns={hackathonColumns}
        data={rawData.result.data[1].data}
        purpose="hackathon"
      />
    </main>
  )
}
