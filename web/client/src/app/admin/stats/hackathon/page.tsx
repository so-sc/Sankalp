import { hackathonColumns } from "@/components/tables/columns/hackathon-columns"
import DataTable from "@/components/tables/data-table"
import { H1, H2 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { hackathonAdminResponse } from "@/lib/placeholder"
import { HackathonAPIResponse, HackathonAdminApiResponse } from "@/lib/types"
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-hackathons`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const hackathonData = await hackathonRes.json()

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
  await isAdminLoggedIn()
  const rawData: HackathonAdminApiResponse = await getHackathonData()

  // const data: HackathonData = {
  //   TmName: rawData.result.data.map,
  // }

  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-10 md:py-24 flex flex-col justify-center">
      <div>
        <H1>Hackathon Teams for {MAIN_EVENT_NAME}</H1>
        <H2 className="mt-2 font-normal">
          Total teams: {hackathonAdminResponse.length}{" "}
        </H2>
      </div>
      <DataTable
        columns={hackathonColumns}
        data={rawData.result.data}
        purpose="hackathon"
      />
    </main>
  )
}
